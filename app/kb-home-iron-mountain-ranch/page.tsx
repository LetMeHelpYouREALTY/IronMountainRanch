import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import ImrHubLinkStrip from "@/components/sections/ImrHubLinkStrip";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import FAQSection from "@/components/sections/FAQSection";
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

const PATH = "/kb-home-iron-mountain-ranch" as const;
const TOPIC = "KB Home Resale";

const faqs = pickImrFaqs(
  (q) => q.includes("sub-communities") || q.includes("median") || q.includes("village"),
);

export const metadata: Metadata = buildPageMetadata({
  title: "KB Home Iron Mountain Ranch | Resale Villages Las Vegas 89131",
  description:
    "KB Home built Iron Mountain Ranch villages from 2002 forward—today's market is mostly gated resale in 89131 & 89143. Village guides and MLS search with Dr. Jan Duffy.",
  path: PATH,
  keywords: [
    "KB Home Iron Mountain Ranch",
    "Iron Mountain Ranch KB Home",
    "KB Home Las Vegas resale",
    "Iron Mountain Ranch villages KB",
    "gated KB homes 89131",
  ],
});

const pageSchema = buildImrTopicPageSchema(TOPIC, PATH, faqs);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export default function KbHomeIronMountainRanchPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-kb-home-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="KB Home Villages in Iron Mountain Ranch"
          subtitle="Master-planned northwest Las Vegas — gated resale across Village 1-A through 11 and estate enclaves."
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
              Is Iron Mountain Ranch still a KB Home community?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">{ironMountainRanch.builder.summary}</p>
            <p className="text-slate-600 text-sm">
              Built {ironMountainRanch.yearBuiltRange} · ~{ironMountainRanch.homeCount.toLocaleString()}{" "}
              homes · {ironMountainRanch.villageCount} villages · Zips{" "}
              {ironMountainRanch.zipCodes.join(" & ")}
            </p>
          </section>

          <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              How do buyers search KB resale in Iron Mountain Ranch?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              MLS filters by subdivision name (for example Iron Mountain Ranch-Village 4 for Wolf Creek).
              Dr. Jan Duffy sets village-level alerts so you see new KB resale before it saturates public
              portals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/buy#imr-search"
                className="inline-flex rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Search Iron Mountain Ranch MLS
              </Link>
              <Link
                href="/sub-communities"
                className="inline-flex rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Village directory
              </Link>
              <Link
                href="/new-construction"
                className="inline-flex rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                New construction options
              </Link>
            </div>
          </section>

          <FAQSection
            faqs={faqs}
            title="KB Home Iron Mountain Ranch FAQ"
            subtitle="Villages, pricing, and MLS search"
          />

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
