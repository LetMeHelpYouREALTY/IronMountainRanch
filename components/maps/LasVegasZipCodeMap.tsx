"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import {
  ZIP_COORDS,
  ZIP_REGION_LABELS,
  buildBuyUrlForZip,
  buildContactUrlForZip,
  lasVegasZipData,
  type LasVegasZipEntry,
  type ZipRegion,
} from "@/lib/las-vegas-zip-data";

type GoogleMapsNamespace = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: {
        center: { lat: number; lng: number };
        zoom: number;
        mapTypeControl?: boolean;
        streetViewControl?: boolean;
        fullscreenControl?: boolean;
      },
    ) => GoogleMap;
    Circle: new (options: {
      map: GoogleMap;
      center: { lat: number; lng: number };
      radius: number;
      strokeColor: string;
      strokeOpacity: number;
      strokeWeight: number;
      fillColor: string;
      fillOpacity: number;
    }) => { setMap: (map: GoogleMap | null) => void };
    Marker: new (options: {
      map: GoogleMap;
      position: { lat: number; lng: number };
      label?: { text: string; color: string; fontWeight: string };
      title?: string;
    }) => GoogleMarker;
    InfoWindow: new (options: { content: string }) => {
      open: (options: { map: GoogleMap; anchor: GoogleMarker }) => void;
    };
    event: {
      trigger: (instance: GoogleMarker, eventName: string) => void;
      addListener: (instance: GoogleMarker, eventName: string, handler: () => void) => void;
    };
    LatLngBounds: new () => {
      extend: (position: { lat: number; lng: number }) => void;
    };
  };
};

type GoogleMap = {
  fitBounds: (bounds: unknown) => void;
  panTo: (position: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
};

type GoogleMarker = object;

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
    __imrZipMapInit?: () => void;
  }
}

const MAPS_SCRIPT_ID = "google-maps-zip-directory";
const DEFAULT_CENTER = ZIP_COORDS["89131"] ?? { lat: 36.2812, lng: -115.2847 };

const REGION_ORDER: ZipRegion[] = [
  "northwest",
  "summerlin",
  "las-vegas",
  "north-las-vegas",
  "henderson",
  "southwest",
];

function buildInfoContent(entry: LasVegasZipEntry): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:220px">
      <strong>${entry.zip} — ${entry.area}</strong>
      <p style="margin:8px 0;font-size:13px;color:#334155">${entry.neighborhoods.slice(0, 3).join(" · ")}</p>
      <a href="${buildBuyUrlForZip(entry.zip)}" style="color:#2563eb;font-weight:600">Search homes</a>
    </div>
  `;
}

export default function LasVegasZipCodeMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<GoogleMap | null>(null);
  const markersRef = useRef<Map<string, GoogleMarker>>(new Map());

  const [activeRegion, setActiveRegion] = useState<ZipRegion | "all">("northwest");
  const [query, setQuery] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [selectedZip, setSelectedZip] = useState<string | null>("89131");

  const filteredZips = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return lasVegasZipData.filter((entry) => {
      const regionMatch = activeRegion === "all" || entry.region === activeRegion;
      if (!regionMatch) return false;
      if (!normalized) return true;
      return (
        entry.zip.includes(normalized) ||
        entry.area.toLowerCase().includes(normalized) ||
        entry.neighborhoods.some((n) => n.toLowerCase().includes(normalized))
      );
    });
  }, [activeRegion, query]);

  const initMap = useCallback(() => {
    if (!mapContainerRef.current || !window.google?.maps) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: DEFAULT_CENTER,
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    mapRef.current = map;
    markersRef.current.clear();

    for (const entry of lasVegasZipData) {
      const coords = ZIP_COORDS[entry.zip];
      if (!coords) continue;

      new window.google.maps.Circle({
        map,
        center: coords,
        radius: entry.highlight ? 2200 : 1600,
        strokeColor: entry.highlight ? "#2563eb" : "#64748b",
        strokeOpacity: 0.85,
        strokeWeight: entry.highlight ? 2 : 1,
        fillColor: entry.highlight ? "#3b82f6" : "#94a3b8",
        fillOpacity: entry.highlight ? 0.18 : 0.08,
      });

      const marker = new window.google.maps.Marker({
        map,
        position: coords,
        title: `${entry.zip} ${entry.area}`,
        label: {
          text: entry.zip,
          color: entry.highlight ? "#1e3a8a" : "#0f172a",
          fontWeight: entry.highlight ? "700" : "600",
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: buildInfoContent(entry),
      });

      window.google.maps.event.addListener(marker, "click", () => {
        infoWindow.open({ map, anchor: marker });
        setSelectedZip(entry.zip);
      });

      markersRef.current.set(entry.zip, marker);
    }

    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!apiKey) return;

    if (window.google?.maps) {
      initMap();
      return;
    }

    const existing = document.getElementById(MAPS_SCRIPT_ID);
    if (existing) {
      window.__imrZipMapInit = initMap;
      return;
    }

    window.__imrZipMapInit = initMap;
    const script = document.createElement("script");
    script.id = MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=__imrZipMapInit`;
    script.onerror = () => setMapError("Google Maps could not load. Check API key and referrer restrictions.");
    document.head.appendChild(script);

    return () => {
      if (window.__imrZipMapInit === initMap) {
        delete window.__imrZipMapInit;
      }
    };
  }, [apiKey, initMap]);

  const focusZip = useCallback((zip: string) => {
    setSelectedZip(zip);
    const coords = ZIP_COORDS[zip];
    const marker = markersRef.current.get(zip);
    if (!coords || !mapRef.current || !window.google?.maps) return;

    mapRef.current.panTo(coords);
    mapRef.current.setZoom(12);
    if (marker) {
      window.google.maps.event.trigger(marker, "click");
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveRegion("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeRegion === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All regions
          </button>
          {REGION_ORDER.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setActiveRegion(region)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeRegion === region
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {ZIP_REGION_LABELS[region]}
            </button>
          ))}
        </div>

        <label className="relative block w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search zip or neighborhood"
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
        {apiKey ? (
          <div
            ref={mapContainerRef}
            className="h-[420px] w-full bg-slate-200"
            role="region"
            aria-label="Interactive Las Vegas zip code map"
          />
        ) : (
          <div className="flex h-[420px] flex-col items-center justify-center gap-3 px-6 text-center">
            <MapPin className="h-10 w-10 text-blue-600" />
            <p className="max-w-md text-slate-700">
              Set <code className="text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in Vercel Production
              to enable the interactive map. Zip cards below still link to search and contact.
            </p>
            <a
              href="https://www.google.com/maps/search/Iron+Mountain+Ranch+89131+Las+Vegas+NV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Open Iron Mountain Ranch on Google Maps
            </a>
          </div>
        )}
        {mapError ? <p className="bg-amber-50 px-4 py-3 text-sm text-amber-900">{mapError}</p> : null}
        {mapReady ? (
          <p className="border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
            Circles show approximate zip centers — not legal boundaries. Iron Mountain Ranch is highlighted in blue (89131 &amp; 89143).
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredZips.map((entry) => (
          <article
            key={entry.zip}
            className={`rounded-xl border p-5 transition-shadow hover:shadow-md ${
              entry.highlight || selectedZip === entry.zip
                ? "border-blue-300 bg-blue-50/40"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{entry.zip}</h2>
                <p className="text-sm font-medium text-slate-700">{entry.area}</p>
                <p className="text-xs text-slate-500">{ZIP_REGION_LABELS[entry.region]}</p>
              </div>
              {entry.badge ? (
                <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                  {entry.badge}
                </span>
              ) : null}
            </div>
            <p className="mb-4 text-sm text-slate-600">{entry.neighborhoods.join(" · ")}</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href={buildBuyUrlForZip(entry.zip)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Search homes
              </Link>
              <Link
                href={buildContactUrlForZip(entry.zip)}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Contact
              </Link>
              {apiKey && mapReady ? (
                <button
                  type="button"
                  onClick={() => focusZip(entry.zip)}
                  className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Show on map
                </button>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {filteredZips.length === 0 ? (
        <p className="text-center text-slate-600">No zip codes match your search. Try 89131 or Centennial Hills.</p>
      ) : null}
    </div>
  );
}
