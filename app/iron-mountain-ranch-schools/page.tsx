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

const PATH = "/iron-mountain-ranch-schools" as const;
const TOPIC = "Schools";

const faqs = pickImrFaqs((q) => q.includes("zip") || q.includes("Where is Iron Mountain"));

export const metadata: Metadata = buildPageMetadata({
  title: "Schools Near Iron Mountain Ranch | CCSD Las Vegas 89131 & 89143",
  description:
    "Clark County School District campuses near Iron Mountain Ranch gated villages in northwest Las Vegas. Verify zoning by address before you buy. Dr. Jan Duffy, (702) 996-3758.",
  path: PATH,
  keywords: [
    "Iron Mountain Ranch schools",
    "schools near Iron Mountain Ranch",
    "CCSD Iron Mountain Ranch",
    "O'Callaghan Middle School",
    "Centennial High School Iron Mountain Ranch",
    "89131 schools",
    "89143 schools",
  ],
});

const pageSchema = buildImrTopicPageSchema(TOPIC, PATH, faqs);
const breadcrumbs = buildImrTopicBreadcrumbs(TOPIC, PATH);

export default function IronMountainRanchSchoolsPage() {
  return (
    <>
      <SchemaScript schema={pageSchema} id="imr-schools-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={PATH}
          title="Schools Near Iron Mountain Ranch, Las Vegas"
          subtitle="Clark County School District assignments for 89131 and 89143 — verify every address before you close."
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
              What schools serve Iron Mountain Ranch addresses?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-6">{ironMountainRanch.schoolsNote}</p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {ironMountainRanch.schools.map((school) => (
                <li
                  key={school.name}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-900">{school.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Grades {school.grades}</p>
                  <p className="text-sm text-slate-600 mt-2">{school.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              How do I verify school zoning for an IMR listing?
            </h2>
            <p className="text-slate-700 leading-relaxed">
              CCSD assigns schools by street address—not by subdivision marketing name. A Village 4
              (Wolf Creek) home and an Iron Mountain Estates parcel can map to different elementary
              zones. Dr. Jan Duffy confirms zoning with CCSD tools and listing disclosures before you
              tour, especially when comparing{" "}
              <Link href="/89131-homes-for-sale" className="text-blue-600 font-semibold hover:underline">
                89131
              </Link>{" "}
              villages to{" "}
              <Link href="/89143-homes-for-sale" className="text-blue-600 font-semibold hover:underline">
                89143
              </Link>{" "}
              estate homes.
            </p>
          </section>

          <FAQSection
            faqs={faqs}
            title="Iron Mountain Ranch schools FAQ"
            subtitle="CCSD zoning and zip codes 89131 & 89143"
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
