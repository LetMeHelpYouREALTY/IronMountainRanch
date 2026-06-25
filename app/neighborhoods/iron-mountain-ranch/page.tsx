import Navbar from "@/components/layouts/Navbar";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import FAQSection from "@/components/sections/FAQSection";
import ImrVillageGuideTable from "@/components/sections/ImrVillageGuideTable";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { agentInfo, officeInfo } from "@/lib/site-config";
import {
  getIronMountainEstatesVillage,
  ironMountainRanch,
  ironMountainRanchFaqs,
  ironMountainRanchHubIntro,
  IRON_MOUNTAIN_RANCH_HUB_PATH,
} from "@/lib/iron-mountain-ranch";
import { buildImrHubBreadcrumbs, buildImrHubPageSchema } from "@/lib/imr-seo-schema";
import { IMR_TOPICAL_GUIDES } from "@/lib/imr-topical-pages";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Las Vegas Homes for Sale | 89131 & 89143",
  description:
    "Iron Mountain Ranch Las Vegas homes for sale in gated 89131 & 89143 — villages, Iron Mountain Estates, schools, HOA, and MLS search. Dr. Jan Duffy, BHHS Nevada Properties. Call (702) 996-3758.",
  path: IRON_MOUNTAIN_RANCH_HUB_PATH,
  keywords: [
    "Iron Mountain Ranch Las Vegas",
    "Iron Mountain Ranch Nevada",
    "Iron Mountain Ranch homes for sale",
    "Iron Mountain Ranch houses for sale",
    "Iron Mountain Ranch las vegas for sale",
    "houses for sale in Iron Mountain Ranch",
    "Iron Mountain Estates",
    "Iron Mountain Ranch gated community",
    "Iron Mountain Ranch homeowners association",
    "89131 homes",
    "89143 homes",
  ],
});

const hubSchema = buildImrHubPageSchema();
const hubBreadcrumbs = buildImrHubBreadcrumbs();

export default function IronMountainRanchPage() {
  const estates = getIronMountainEstatesVillage();
  const mapQuery = encodeURIComponent(
    `${ironMountainRanch.name} Las Vegas Nevada ${ironMountainRanch.zipCodes[0]}`,
  );

  return (
    <>
      <SchemaScript schema={hubSchema} id="imr-hub-schema" />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={IRON_MOUNTAIN_RANCH_HUB_PATH}
          title="Iron Mountain Ranch Homes for Sale in Las Vegas, Nevada"
          subtitle={
            <>
              Gated northwest Las Vegas, Nevada community in zip codes{" "}
              <strong>{ironMountainRanch.zipCodes.join(" & ")}</strong>. Search{" "}
              <Link href="/buy" className="underline hover:text-white font-semibold">
                Iron Mountain Ranch houses for sale
              </Link>{" "}
              with <strong>{agentInfo.name}</strong>.
            </>
          }
        >
          <div className="flex justify-center">
            <GbpActionLinks />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 py-16">
          <BreadcrumbNav items={hubBreadcrumbs} className="mb-6 max-w-6xl mx-auto" />

          <section className="max-w-5xl mx-auto mb-12">
            <p className="text-lg text-slate-700 leading-relaxed">{ironMountainRanchHubIntro}</p>
            <p className="mt-4 text-slate-600">
              <Link href="/buy" className="text-blue-600 font-semibold hover:underline">
                Search Iron Mountain Ranch houses for sale
              </Link>
              {" · "}
              <Link href="/sub-communities" className="text-blue-600 font-semibold hover:underline">
                Compare gated villages
              </Link>
              {" · "}
              <a href={agentInfo.phoneTel} className="text-blue-600 font-semibold hover:underline">
                Call {agentInfo.phoneFormatted}
              </a>
            </p>
          </section>

          <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Iron Mountain Ranch, Las Vegas, Nevada</h2>
              <p className="text-slate-600 mb-4">{ironMountainRanch.description}</p>
              <p className="text-slate-600 mb-4 text-sm">
                Iron Mountain Ranch in Nevada sits northwest of the Las Vegas Strip in Clark County,
                minutes from Centennial Hills, Skye Canyon, and Kyle Canyon road access. The master
                plan spans both 89131 and 89143 with gated villages, parks, and walking paths.
              </p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>
                  <strong>Median price:</strong> {ironMountainRanch.medianPrice}
                </li>
                <li>
                  <strong>Price range:</strong> {ironMountainRanch.priceRange}
                </li>
                <li>
                  <strong>Homes:</strong> ~{ironMountainRanch.homeCount.toLocaleString()} across{" "}
                  {ironMountainRanch.villageCount} villages
                </li>
                <li>
                  <strong>Built:</strong> {ironMountainRanch.yearBuiltRange}
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Office NAP</h2>
              <p className="text-slate-300 text-sm mb-4">
                Matches Google Business Profile for {agentInfo.name}
              </p>
              <address className="not-italic text-sm space-y-2 text-slate-200">
                <p>{agentInfo.brokerage}</p>
                <p>{officeInfo.address.full}</p>
                <p>
                  <a href={agentInfo.phoneTel} className="hover:text-blue-300">
                    {agentInfo.phoneFormatted}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${agentInfo.email}`} className="hover:text-blue-300">
                    {agentInfo.email}
                  </a>
                </p>
              </address>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16 grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Zip code 89131 — numbered villages &amp; enclaves
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{ironMountainRanch.zipGuide.zip89131}</p>
              <Link
                href="/buy#imr-search"
                className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
              >
                Search Iron Mountain Ranch houses for sale in 89131 →
              </Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Zip code 89143 — Iron Mountain Estates
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{ironMountainRanch.zipGuide.zip89143}</p>
              <Link
                href="/sub-communities/iron-mountain-estates"
                className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
              >
                Iron Mountain Estates homes for sale →
              </Link>
            </div>
          </section>

          <section className="max-w-5xl mx-auto mb-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {ironMountainRanch.builder.name} master plan &amp; resale market
            </h2>
            <p className="text-slate-600 leading-relaxed">{ironMountainRanch.builder.summary}</p>
            <p className="mt-4 text-slate-600 text-sm">
              Nearby master-planned comparisons:{" "}
              {ironMountainRanch.nearbyCommunities.join(", ")}. For village-level MLS comps,{" "}
              <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                contact Dr. Jan Duffy
              </Link>{" "}
              before you tour.
            </p>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Schools near Iron Mountain Ranch (CCSD)
            </h2>
            <p className="text-slate-600 text-sm mb-6">{ironMountainRanch.schoolsNote}</p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {ironMountainRanch.schools.map((school) => (
                <li
                  key={school.name}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <h3 className="font-semibold text-slate-900">{school.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">Grades {school.grades}</p>
                  <p className="text-sm text-slate-600 mt-2">{school.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <ImrVillageGuideTable />

          <section className="max-w-5xl mx-auto mb-16" aria-labelledby="topical-guides-heading">
            <h2 id="topical-guides-heading" className="text-2xl font-bold text-slate-900 mb-3">
              Iron Mountain Ranch buyer guides
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Topic pages for zip codes, HOAs, schools, KB resale, reviews, and neighborhood
              comparisons—each links back to this hub.
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {IMR_TOPICAL_GUIDES.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-slate-900">{guide.label}</span>
                    <p className="text-sm text-slate-600 mt-1">{guide.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {estates ? (
            <section className="max-w-5xl mx-auto mb-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Iron Mountain Estates</h2>
              <p className="text-slate-600 mb-4">{estates.description}</p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {estates.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/sub-communities/${estates.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Iron Mountain Estates homes for sale →
              </Link>
            </section>
          ) : null}

          <section className="max-w-5xl mx-auto mb-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Iron Mountain Ranch HOA &amp; LMA (not Spring Mountain Ranch)
            </h2>
            <p className="text-slate-600 mb-3">{ironMountainRanch.hoaOverview}</p>
            <p className="text-slate-600 text-sm">{ironMountainRanch.landscapeNote}</p>
            <p className="text-slate-500 text-sm mt-3">{ironMountainRanch.hoaNote}</p>
            <Link
              href="/iron-mountain-ranch-hoa"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
            >
              Full Iron Mountain Ranch HOA &amp; LMA guide →
            </Link>
          </section>

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Iron Mountain Ranch Map — Las Vegas, Nevada
            </h2>
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="Iron Mountain Ranch Las Vegas Nevada map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <RealScoutListings />

          <FAQSection
            faqs={[...ironMountainRanchFaqs]}
            title="Iron Mountain Ranch FAQ"
            subtitle="Common questions about Iron Mountain Ranch, Las Vegas, Nevada — buyers and sellers in this gated northwest community"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
