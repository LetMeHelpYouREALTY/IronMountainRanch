import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import ImrHubLinkStrip from "@/components/sections/ImrHubLinkStrip";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { ironMountainRanch, IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";
import {
  buildImrTopicBreadcrumbs,
  buildImrTopicPageSchema,
  pickImrFaqs,
} from "@/lib/imr-topical-pages";
import { agentInfo } from "@/lib/site-config";

const PATH = "/iron-mountain-ranch-hoa" as const;
const TOPIC = "HOA & LMA";

const faqs = pickImrFaqs(
  (q) =>
    q.includes("HOA") ||
    q.includes("Spring Mountain") ||
    q.includes("gated") ||
    q.includes("zip codes"),
);

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch HOA & LMA Guide | Las Vegas 89131 & 89143",
  description:
    "Iron Mountain Ranch homeowners association and Landscape Maintenance Association (LMA) explained—village HOAs, gates, parks, and dues. Not Spring Mountain Ranch. Dr. Jan Duffy. Call (702) 996-3758.",
  path: PATH,
  keywords: [
    "Iron Mountain Ranch homeowners association",
    "Iron Mountain Ranch HOA",
    "Iron Mountain Ranch LMA",
    "Iron Mountain Ranch HOA fees",
    "Iron Mountain Ranch gated community",
    "89131 HOA",
    "89143 HOA",
  ],
});

const pageSchema = buildImrTopicPageSchema(TOPIC, PATH, faqs);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export default function IronMountainRanchHoaPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-hoa-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="Iron Mountain Ranch HOA & Landscape Maintenance Association"
          subtitle="Village HOAs, gates, and shared parks in northwest Las Vegas — not Spring Mountain Ranch."
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
              What is the Iron Mountain Ranch homeowners association structure?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">{ironMountainRanch.hoaOverview}</p>
            <p className="text-slate-700 leading-relaxed mb-4">{ironMountainRanch.landscapeNote}</p>
            <p className="text-slate-600 text-sm">{ironMountainRanch.hoaNote}</p>
          </section>

          <section className="mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Iron Mountain Ranch is not Spring Mountain Ranch
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Google and buyer forums often confuse these names. Spring Mountain Ranch is a separate
              master-planned community with its own HOA contacts. If your address is in Iron Mountain
              Ranch (89131 or 89143 gated villages), use IMR village HOA and LMA documents—not Spring
              Mountain Ranch.{" "}
              <Link
                href="/iron-mountain-ranch-vs-spring-mountain-ranch"
                className="font-semibold text-blue-700 hover:underline"
              >
                Compare Iron Mountain Ranch vs Spring Mountain Ranch
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What do HOA and LMA dues typically cover?
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>
                <strong>Village HOA:</strong> gated entry, neighborhood amenities, and village-specific
                landscaping where applicable.
              </li>
              <li>
                <strong>LMA:</strong> community parks, ponds, walking paths, and shared desert
                landscaping across the master plan.
              </li>
              <li>
                <strong>Before you write an offer:</strong> Dr. Jan Duffy verifies current dues from
                listing documents and seller disclosures—not online estimates from other communities.
              </li>
            </ul>
            <p className="mt-6 text-slate-600">
              Questions about a specific village? Browse{" "}
              <Link href="/sub-communities" className="text-blue-600 font-semibold hover:underline">
                Iron Mountain Ranch village guides
              </Link>{" "}
              or call{" "}
              <a href={agentInfo.phoneTel} className="text-blue-600 font-semibold hover:underline">
                {agentInfo.phoneFormatted}
              </a>
              .
            </p>
          </section>

          <FAQSection
            faqs={faqs}
            title="Iron Mountain Ranch HOA FAQ"
            subtitle="Village fees, LMA, and Spring Mountain Ranch disambiguation"
          />

          <p className="mt-10 text-center text-sm text-slate-500">
            <Link href={IRON_MOUNTAIN_RANCH_HUB_PATH} className="text-blue-600 hover:underline">
              ← Back to Iron Mountain Ranch homes for sale
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
