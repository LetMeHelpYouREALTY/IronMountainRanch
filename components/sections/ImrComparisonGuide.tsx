import Link from "next/link";
import ImrRegionalMarketSection from "@/components/sections/ImrRegionalMarketSection";
import ImrHubLinkStrip from "@/components/sections/ImrHubLinkStrip";
import { ironMountainRanchMarket, type RegionalMarketArea } from "@/lib/lv-regional-market";
import { IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";

type ImrComparisonGuideProps = {
  competitor: RegionalMarketArea;
  intro: string;
  imrAdvantages: string[];
  competitorAdvantages: string[];
  whenToChooseImr: string;
};

export default function ImrComparisonGuide({
  competitor,
  intro,
  imrAdvantages,
  competitorAdvantages,
  whenToChooseImr,
}: ImrComparisonGuideProps) {
  return (
    <>
      <p className="text-lg text-slate-700 leading-relaxed mb-6">{intro}</p>
      <ImrHubLinkStrip className="mb-10" />

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Iron Mountain Ranch ({ironMountainRanchMarket.medianPriceFormatted} median)
          </h2>
          <ul className="space-y-2 text-slate-700 text-sm">
            {imrAdvantages.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-600">•</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={IRON_MOUNTAIN_RANCH_HUB_PATH}
            className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
          >
            Iron Mountain Ranch community guide →
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {competitor.name} ({competitor.medianPriceFormatted} median)
          </h2>
          <ul className="space-y-2 text-slate-700 text-sm">
            {competitorAdvantages.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-slate-400">•</span>
                {item}
              </li>
            ))}
          </ul>
          {competitor.id !== "spring-mountain-ranch" ? (
            <Link
              href={`/neighborhoods/${competitor.id}`}
              className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
            >
              {competitor.name} neighborhood page →
            </Link>
          ) : null}
        </div>
      </div>

      <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          When Iron Mountain Ranch is the better fit
        </h2>
        <p className="text-slate-700 leading-relaxed">{whenToChooseImr}</p>
      </section>

      <ImrRegionalMarketSection className="mb-12" />
    </>
  );
}
