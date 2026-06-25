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
import { getRegionalMarketArea } from "@/lib/lv-regional-market";

const PATH = "/iron-mountain-ranch-vs-summerlin" as const;
const TOPIC = "vs Summerlin";

const competitor = getRegionalMarketArea("summerlin");

const faqs = [
  {
    question: "Is Iron Mountain Ranch cheaper than Summerlin?",
    answer:
      "Marketing snapshots often show Iron Mountain Ranch medians below Summerlin—IMR commonly lands near the mid-$500,000s while Summerlin trends higher with premium west-side amenities. Village and estate sections of IMR can approach Summerlin pricing; compare MLS comps by subdivision.",
  },
  {
    question: "Do Iron Mountain Ranch buyers also tour Summerlin?",
    answer:
      "Yes—relocating families frequently compare northwest gated IMR villages with Summerlin master plans. IMR offers Kyle Canyon / Centennial Hills positioning; Summerlin offers Downtown Summerlin and established west-side schools. Dr. Jan Duffy runs parallel MLS searches.",
  },
];

const pageSchema = buildImrTopicPageSchema(TOPIC, PATH, faqs);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch vs Summerlin | Gated NW vs West Las Vegas",
  description:
    "Compare Iron Mountain Ranch gated villages with Summerlin master-planned homes. Price, commute, and lifestyle—northwest Las Vegas vs Summerlin with Dr. Jan Duffy.",
  path: PATH,
  keywords: [
    "Iron Mountain Ranch vs Summerlin",
    "Summerlin vs Iron Mountain Ranch",
    "gated homes northwest Las Vegas",
    "Iron Mountain Ranch or Summerlin",
  ],
});

export default function ImrVsSummerlinPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-vs-summerlin-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="Iron Mountain Ranch vs Summerlin"
          subtitle="Gated northwest villages vs Las Vegas's flagship west-side master plan."
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
            intro="Summerlin sets the premium bar for Las Vegas master-planned living. Iron Mountain Ranch competes on gated village value in 89131 and 89143—often $50,000–$100,000 below Summerlin medians in marketing snapshots while still offering mountain views and freeway access."
            imrAdvantages={[
              "Gated KB villages with lower median than Summerlin",
              "Kyle Canyon / US-95 northwest commute",
              "Iron Mountain Estates for larger luxury footprints",
              "Village-level MLS comp transparency",
            ]}
            competitorAdvantages={[
              "Downtown Summerlin retail and dining",
              "Long-established west-side reputation",
              "Higher-end custom and semi-custom inventory",
              "Strong Summerlin association amenities",
            ]}
            whenToChooseImr="Choose Iron Mountain Ranch when you want gated northwest value, KB resale predictability, or estate homes in 89143 without Summerlin's price premium. Choose Summerlin when west-side branding, Downtown Summerlin, and top-tier west valley schools justify the higher median."
          />
          <FAQSection faqs={faqs} title="IMR vs Summerlin FAQ" />
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
