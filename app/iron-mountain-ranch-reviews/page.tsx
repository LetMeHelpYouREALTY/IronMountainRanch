import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import ImrHubLinkStrip from "@/components/sections/ImrHubLinkStrip";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";
import { buildImrTopicBreadcrumbs, buildImrTopicPageSchema } from "@/lib/imr-topical-pages";
import { agentInfo } from "@/lib/site-config";

const PATH = "/iron-mountain-ranch-reviews" as const;
const TOPIC = "Reviews";

/** No fabricated Review schema — GBP CTAs only. */
const pageSchema = buildImrTopicPageSchema(TOPIC, PATH);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Reviews | Las Vegas Gated Community",
  description:
    "What buyers and residents ask about Iron Mountain Ranch in Las Vegas—gates, HOAs, schools, and village life. Read Google reviews for Dr. Jan Duffy's office. Call (702) 996-3758.",
  path: PATH,
  keywords: [
    "Iron Mountain Ranch las vegas reviews",
    "Iron Mountain Ranch reviews",
    "Iron Mountain Ranch gated community reviews",
    "Iron Mountain Ranch homeowner reviews",
  ],
});

export default function IronMountainRanchReviewsPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-reviews-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="Iron Mountain Ranch Reviews & Buyer Questions"
          subtitle="Community Place reviews vs agent office reviews — how to evaluate gated village life in 89131 & 89143."
          showImrContext={false}
        >
          <div className="flex justify-center">
            <GbpActionLinks />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <BreadcrumbNav items={breadcrumbs} className="mb-6" />
          <ImrHubLinkStrip className="mb-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Where do Iron Mountain Ranch reviews appear on Google?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Google may show a <strong>community Place</strong> panel for &quot;Iron Mountain
              Ranch&quot; (the neighborhood landmark) separately from{" "}
              <strong>Iron Mountain Ranch | Homes by Dr. Jan Duffy</strong> (the real estate office
              Google Business Profile at {agentInfo.phoneFormatted}). Community reviews describe the
              area; agent reviews describe service when you buy or sell.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Use the buttons below to read or leave a review for Dr. Jan&apos;s office after a
              consultation or closing—not for HOA business.
            </p>
          </section>

          <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              What do buyers ask before writing an offer?
            </h2>
            <ul className="space-y-3 text-slate-700 text-sm">
              <li>Gate access, visitor policies, and village-specific HOA dues</li>
              <li>LMA maintenance of parks, ponds, and walking paths</li>
              <li>CCSD school zoning by exact address (89131 vs 89143)</li>
              <li>Commute to US-95, the 215 Beltway, Centennial Hills, and Floyd Lamb Park</li>
              <li>Resale comps by MLS subdivision—not a single community median</li>
            </ul>
            <p className="mt-6 text-slate-600">
              Detailed answers live on the{" "}
              <Link href={IRON_MOUNTAIN_RANCH_HUB_PATH} className="text-blue-600 font-semibold hover:underline">
                Iron Mountain Ranch community guide
              </Link>
              ,{" "}
              <Link href="/iron-mountain-ranch-hoa" className="text-blue-600 font-semibold hover:underline">
                HOA guide
              </Link>
              , and village pages.
            </p>
          </section>

          <div className="flex justify-center mb-10">
            <GbpActionLinks layout="stack" />
          </div>

          <p className="text-center text-sm text-slate-500">
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
