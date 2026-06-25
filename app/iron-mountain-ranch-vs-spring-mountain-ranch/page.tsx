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
import { IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";
import {
  buildImrTopicBreadcrumbs,
  buildImrTopicPageSchema,
  pickImrFaqs,
} from "@/lib/imr-topical-pages";

const PATH = "/iron-mountain-ranch-vs-spring-mountain-ranch" as const;
const TOPIC = "vs Spring Mountain Ranch";

const faqs = pickImrFaqs((q) => q.includes("Spring Mountain"));

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch vs Spring Mountain Ranch | Not the Same HOA",
  description:
    "Iron Mountain Ranch (89131 & 89143, northwest Las Vegas) is not Spring Mountain Ranch. Different master plans, HOAs, and addresses. Compare before you search the wrong community.",
  path: PATH,
  keywords: [
    "Iron Mountain Ranch vs Spring Mountain Ranch",
    "Spring Mountain Ranch Las Vegas",
    "Iron Mountain Ranch HOA",
    "Spring Mountain Ranch HOA",
    "Iron Mountain Ranch not Spring Mountain",
  ],
});

const pageSchema = buildImrTopicPageSchema(TOPIC, PATH, faqs);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export default function ImrVsSpringMountainRanchPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-vs-smr-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="Iron Mountain Ranch vs Spring Mountain Ranch"
          subtitle="Different communities, different HOAs — verify your address before you tour or pay dues."
          showImrContext={false}
        >
          <div className="flex justify-center">
            <GbpActionLinks />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <BreadcrumbNav items={breadcrumbs} className="mb-6" />
          <ImrHubLinkStrip className="mb-8" />

          <section className="mb-12 rounded-2xl border border-red-200 bg-red-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">They are not the same place</h2>
            <p className="text-slate-700 leading-relaxed">
              Iron Mountain Ranch is a gated KB Home master plan in <strong>northwest Las Vegas</strong>{" "}
              (zip codes 89131 and 89143) near Kyle Canyon and Centennial Hills. Spring Mountain Ranch
              is a <strong>separate</strong> Las Vegas Valley community with its own HOA and marketing
              name. Google People Also Ask often mixes the two—use your listing address and MLS
              subdivision, not similar-sounding names.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Iron Mountain Ranch</h2>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Northwest Las Vegas · 89131 &amp; 89143</li>
                <li>• Gated KB villages + Iron Mountain Estates</li>
                <li>• Village HOAs + community LMA</li>
                <li>• ~1,700 homes · Built from 2002</li>
              </ul>
              <Link
                href={IRON_MOUNTAIN_RANCH_HUB_PATH}
                className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
              >
                Iron Mountain Ranch homes for sale →
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Spring Mountain Ranch</h2>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• Different master-planned community</li>
                <li>• Separate HOA management &amp; dues</li>
                <li>• Not an Iron Mountain Ranch village</li>
                <li>• Do not use IMR HOA contacts for SMR addresses</li>
              </ul>
            </div>
          </div>

          <FAQSection
            faqs={faqs}
            title="Iron Mountain Ranch vs Spring Mountain Ranch FAQ"
            subtitle="HOA, location, and buyer confusion"
          />

          <p className="mt-10 text-center text-sm text-slate-500">
            <Link href="/iron-mountain-ranch-hoa" className="text-blue-600 hover:underline">
              Iron Mountain Ranch HOA guide
            </Link>
            {" · "}
            <Link href={IRON_MOUNTAIN_RANCH_HUB_PATH} className="text-blue-600 hover:underline">
              Community hub
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
