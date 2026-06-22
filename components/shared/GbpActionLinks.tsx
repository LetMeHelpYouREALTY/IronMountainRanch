import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { agentInfo, officeInfo } from "@/lib/site-config";
import {
  getGbpDirectionsUrl,
  getGbpReviewUrl,
} from "@/lib/site-url";

type GbpActionLinksProps = {
  className?: string;
  layout?: "row" | "stack";
};

export default function GbpActionLinks({
  className = "",
  layout = "row",
}: GbpActionLinksProps) {
  const reviewUrl = getGbpReviewUrl();
  const directionsUrl = getGbpDirectionsUrl(
    officeInfo.coordinates.lat,
    officeInfo.coordinates.lng,
  );

  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors";
  const wrapper =
    layout === "row"
      ? `flex flex-wrap gap-3 ${className}`
      : `flex flex-col gap-3 ${className}`;

  return (
    <div className={wrapper}>
      <Link
        href={agentInfo.phoneTel}
        className={`${base} bg-blue-600 text-white hover:bg-blue-700`}
      >
        <Phone className="h-4 w-4" />
        Call {agentInfo.phoneFormatted}
      </Link>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-slate-300 bg-white text-slate-900 hover:bg-slate-50`}
      >
        <MapPin className="h-4 w-4" />
        Directions
      </a>
      {reviewUrl ? (
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100`}
        >
          <Star className="h-4 w-4" />
          Google Reviews
        </a>
      ) : null}
    </div>
  );
}
