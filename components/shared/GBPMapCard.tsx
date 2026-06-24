import GbpActionLinks from "@/components/shared/GbpActionLinks";
import { googleBusinessProfile } from "@/lib/google-business-profile";
import { siteConfig } from "@/lib/site-config";
import { getGbpPlaceId } from "@/lib/site-url";

type GBPMapCardProps = {
  className?: string;
  title?: string;
  height?: number;
};

function buildMapEmbedSrc(): string {
  const placeId = getGbpPlaceId();
  const { address, coordinates } = googleBusinessProfile;

  if (placeId && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.trim();
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=place_id:${encodeURIComponent(placeId)}`;
  }

  const query = encodeURIComponent(address.full);
  return `https://maps.google.com/maps?q=${query}&ll=${coordinates.lat},${coordinates.lng}&z=14&output=embed`;
}

export default function GBPMapCard({
  className = "",
  title,
  height = 320,
}: GBPMapCardProps) {
  const mapTitle = title ?? `${siteConfig.name} — Google Map`;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
        <iframe
          src={buildMapEmbedSrc()}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={mapTitle}
          className="w-full"
        />
      </div>
      <div className="mt-4">
        <GbpActionLinks />
      </div>
    </div>
  );
}
