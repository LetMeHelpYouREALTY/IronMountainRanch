import GbpActionLinks from "@/components/shared/GbpActionLinks";
import { buildOfficeMapEmbedSrc } from "@/lib/map-embed";
import { officeInfo, siteConfig } from "@/lib/site-config";

type SiteOfficeMapSectionProps = {
  className?: string;
};

/** Site-wide office map — Kyle Canyon / Iron Mountain Ranch corridor (89143). */
export default function SiteOfficeMapSection({ className = "" }: SiteOfficeMapSectionProps) {
  const mapTitle = `${siteConfig.name} — office map`;

  return (
    <section
      className={`bg-slate-100 border-t border-slate-200 ${className}`}
      aria-labelledby="site-office-map-heading"
    >
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 id="site-office-map-heading" className="text-2xl font-bold text-slate-900">
            Find Us in Iron Mountain Ranch
          </h2>
          <p className="mt-2 text-slate-600">
            {officeInfo.areaLabel} · {officeInfo.address.full}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Kyle Canyon corridor · gated village specialist · zips 89131 &amp; 89143
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <iframe
            src={buildOfficeMapEmbedSrc()}
            width="100%"
            height={300}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={mapTitle}
            className="w-full"
          />
        </div>

        <div className="max-w-4xl mx-auto mt-6 flex justify-center">
          <GbpActionLinks />
        </div>
      </div>
    </section>
  );
}
