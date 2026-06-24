import Link from "next/link";
import { MapPin, Shield } from "lucide-react";
import {
  featuredVillageLinks,
  getImrPageContext,
  IMR_HYPERLOCAL_FACTS,
} from "@/lib/imr-hyperlocal-content";
import { ironMountainRanchMarket } from "@/lib/lv-regional-market";

type ImrPageContextProps = {
  path: string;
};

export default function ImrPageContext({ path }: ImrPageContextProps) {
  const context = getImrPageContext(path);
  if (!context) return null;

  return (
    <section
      className="border-b border-slate-200 bg-slate-50"
      aria-labelledby="imr-page-context-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Shield className="h-4 w-4 text-blue-600" aria-hidden />
          <span>Iron Mountain Ranch · {IMR_HYPERLOCAL_FACTS.zips}</span>
          <span className="hidden sm:inline">·</span>
          <MapPin className="h-4 w-4 text-blue-600 sm:hidden" aria-hidden />
          <span>~{IMR_HYPERLOCAL_FACTS.homeCount.toLocaleString()} gated homes</span>
        </div>

        <h2
          id="imr-page-context-heading"
          className="text-2xl font-bold text-slate-900 md:text-3xl"
        >
          {context.heading}
        </h2>

        {context.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="mt-4 max-w-4xl text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}

        {context.showMarketSnippet ? (
          <div className="mt-6 inline-flex flex-wrap gap-4 rounded-lg border border-blue-200 bg-white px-5 py-4 text-sm">
            <div>
              <span className="text-slate-500">IMR median </span>
              <span className="font-semibold text-slate-900">
                {ironMountainRanchMarket.medianPriceFormatted}
              </span>
            </div>
            <div>
              <span className="text-slate-500">YoY </span>
              <span className="font-semibold text-green-700">
                {ironMountainRanchMarket.yearOverYearChange}
              </span>
            </div>
            <div>
              <span className="text-slate-500">DOM </span>
              <span className="font-semibold text-slate-900">
                {ironMountainRanchMarket.daysOnMarket} days
              </span>
            </div>
            <Link href="/market-report" className="font-semibold text-blue-600 hover:underline">
              Full comparison →
            </Link>
          </div>
        ) : null}

        {context.showVillageLinks ? (
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Iron Mountain Ranch villages
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/sub-communities"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                All villages
              </Link>
              {featuredVillageLinks.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-blue-400"
                >
                  {v.name}
                </Link>
              ))}
              <Link
                href="/buy#imr-search"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:border-blue-400"
              >
                Search 89131 MLS
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
