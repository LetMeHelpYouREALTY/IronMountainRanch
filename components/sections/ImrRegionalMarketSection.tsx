import Link from "next/link";
import { TrendingUp } from "lucide-react";
import type { SubCommunity } from "@/lib/iron-mountain-ranch";
import {
  REGIONAL_MARKET_LAST_UPDATED,
  getSubCommunitiesMarketIntro,
  getVillageMarketInsight,
  ironMountainRanchMarket,
  regionalMarketComparison,
} from "@/lib/lv-regional-market";

type ImrRegionalMarketSectionProps = {
  village?: SubCommunity;
  className?: string;
};

export default function ImrRegionalMarketSection({
  village,
  className = "",
}: ImrRegionalMarketSectionProps) {
  const intro = village
    ? getVillageMarketInsight(village)
    : getSubCommunitiesMarketIntro();

  const heading = village
    ? `How does ${village.name} compare to the Las Vegas Valley?`
    : "Northwest Las Vegas market context for Iron Mountain Ranch";

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 md:p-8 ${className}`}
      aria-labelledby="imr-regional-market-heading"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            id="imr-regional-market-heading"
            className="text-2xl font-bold text-slate-900"
          >
            {heading}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Hyperlocal snapshot · Updated {REGIONAL_MARKET_LAST_UPDATED}
          </p>
        </div>
        <Link
          href="/market-report"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          Full market report →
        </Link>
      </div>

      <p className="mb-8 text-slate-700 leading-relaxed">{intro}</p>

      <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-900 p-5 text-white md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">IMR median</p>
          <p className="text-2xl font-bold text-blue-300">
            {ironMountainRanchMarket.medianPriceFormatted}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">YoY</p>
          <p className="text-2xl font-bold text-green-400 flex items-center gap-1">
            <TrendingUp className="h-5 w-5" aria-hidden />
            {ironMountainRanchMarket.yearOverYearChange}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Days on market</p>
          <p className="text-2xl font-bold">{ironMountainRanchMarket.daysOnMarket} days</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Zips</p>
          <p className="text-2xl font-bold">89131 & 89143</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {regionalMarketComparison.map((area) => (
          <div
            key={area.id}
            className={`rounded-lg border p-4 ${
              area.highlight
                ? "border-blue-300 bg-blue-50"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <h3 className="font-semibold text-slate-900">{area.name}</h3>
            {area.scopeNote ? (
              <p className="mt-1 text-xs text-slate-500">{area.scopeNote}</p>
            ) : null}
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-600">Median price</dt>
                <dd className="font-semibold text-slate-900">{area.medianPriceFormatted}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-600">YoY change</dt>
                <dd className="font-semibold text-green-700">{area.yearOverYearChange}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-600">Days on market</dt>
                <dd className="font-semibold text-slate-900">{area.daysOnMarket} days</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Marketing snapshot for buyer education—not an appraisal or automated valuation.
        Village prices, HOA dues, and days on market change with MLS inventory. Call Dr. Jan
        Duffy for a live comp report on {village ? village.mlsSubdivision : "your target village"}.
      </p>
    </section>
  );
}
