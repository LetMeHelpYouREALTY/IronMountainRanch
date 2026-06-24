import GbpActionLinks from "@/components/shared/GbpActionLinks";
import { buildOfficeMapEmbedSrc } from "@/lib/map-embed";
import { siteConfig } from "@/lib/site-config";

type GBPMapCardProps = {
  className?: string;
  title?: string;
  height?: number;
};

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
          src={buildOfficeMapEmbedSrc()}
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
