import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import ImrComparisonGuide from "@/components/sections/ImrComparisonGuide";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";
import {
  buildImrTopicBreadcrumbs,
  buildImrTopicPageSchema,
} from "@/lib/imr-topical-pages";
import { regionalMarketComparison } from "@/lib/lv-regional-market";

const PATH = "/iron-mountain-ranch-vs-centennial-hills" as const;
const TOPIC = "vs Centennial Hills";

const competitor = regionalMarketComparison.find((a) => a.id === "centennial-hills");
if (!competitor) {
  throw new Error("Missing Centennial Hills market data");
}

const faqs = [
  {
    question: "Is Iron Mountain Ranch in Centennial Hills?",
    answer:
      "Iron Mountain Ranch sits in northwest Las Vegas adjacent to Centennial Hills—buyers often shop both areas for family homes near US-95. IMR is a gated KB master plan in 89131 and 89143; Centennial Hills includes multiple non-gated and master-planned neighborhoods with its own price bands.",
  },
  {
    question: "Which is more affordable — Iron Mountain Ranch or Centennial Hills?",
    answer:
      "Marketing medians are close (often mid-$500,000s in 2026 snapshots), but IMR resale can spike in estate villages while Centennial Hills offers more non-gated inventory. Compare village-level MLS comps with Dr. Jan Duffy before you decide.",
  },
];

const pageSchema = buildImrTopicPageSchema(TOPIC, PATH, faqs);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch vs Centennial Hills | Northwest Las Vegas",
  description:
    "Compare gated Iron Mountain Ranch villages (89131 & 89143) with Centennial Hills family homes. Median prices, commutes, and MLS search with Dr. Jan Duffy.",
  path: PATH,
  keywords: [
    "Iron Mountain Ranch vs Centennial Hills",
    "Centennial Hills vs Iron Mountain Ranch",
    "northwest Las Vegas gated homes",
    "89131 vs Centennial Hills",
  ],
});

export default function ImrVsCentennialHillsPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-vs-centennial-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="Iron Mountain Ranch vs Centennial Hills"
          subtitle="Two northwest Las Vegas favorites—gated KB villages vs established Centennial Hills neighborhoods."
          showImrContext={false}
        >
          <div className="flex justify-center">
            <GbpActionLinks />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <BreadcrumbNav items={breadcrumbs} className="mb-6" />
          <ImrComparisonGuide
            competitor={competitor}
            intro="Centennial Hills is the closest large-scale comparison for Iron Mountain Ranch buyers. Both sit along the US-95 northwest corridor with Centennial Center shopping and strong CCSD options—but IMR adds village-by-village gates and a single KB architectural thread."
            imrAdvantages={[
              "Gated village entries across the master plan",
              "Consistent KB Home floor plans for resale comparisons",
              "Community parks, ponds, and LMA-maintained trails",
              "Iron Mountain Estates luxury enclave in 89143",
            ]}
            competitorAdvantages={[
              "Broader mix of builders and lot ages",
              "Large retail at Centennial Center",
              "Established parks and recreation programming",
              "More non-gated inventory under $500K",
            ]}
            whenToChooseImr="Choose Iron Mountain Ranch when gated access, village identity, and KB resale comps matter—especially for 89131 move-up buyers comparing Wolf Creek, Meadow Ridge, or Classics at Iron Mountain Ranch. Choose Centennial Hills when you want maximum inventory variety without a village gate."
          />
          <FAQSection faqs={faqs} title="IMR vs Centennial Hills FAQ" />
          <p className="mt-10 text-center text-sm text-slate-500">
            <Link href={IRON_MOUNTAIN_RANCH_HUB_PATH} className="text-blue-600 hover:underline">
              ← Iron Mountain Ranch homes for sale
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
