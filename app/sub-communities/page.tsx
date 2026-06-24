import ImrRegionalMarketSection from "@/components/sections/ImrRegionalMarketSection";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import FAQSection from "@/components/sections/FAQSection";
import DeferredRealScoutListings from "@/components/realscout/DeferredRealScoutListings";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  ironMountainRanch,
  ironMountainRanchFaqs,
  subCommunities,
} from "@/lib/iron-mountain-ranch";
import { generateNeighborhoodSchema } from "@/lib/schema-blueprint";
import { agentInfo } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";
import { MapPin, Trees, Shield, Phone } from "lucide-react";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Sub-Communities | Gated Villages in 89131",
  description: `Explore Iron Mountain Ranch gated villages in northwest Las Vegas—Village 1-A through Village 11, Iron Mountain Estates, Bradley Ranch, and Quarterhorse Estate. ~1,700 homes, parks, and ponds. Village guides from Dr. Jan Duffy. Call ${agentInfo.phoneFormatted}.`,
  path: "/sub-communities",
  keywords: [
    "Iron Mountain Ranch sub-communities",
    "Iron Mountain Ranch villages",
    "gated communities 89131",
    "Iron Mountain Ranch Village 3",
    "Iron Mountain Estates Las Vegas",
    "Iron Mountain Estate 89143",
    "Bradley Ranch Las Vegas",
    "Quarterhorse Estate Iron Mountain Ranch",
  ],
});

function buildItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Iron Mountain Ranch Sub-Communities",
    description: ironMountainRanch.description,
    numberOfItems: subCommunities.length,
    itemListElement: subCommunities.map((village, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: village.name,
      url: absoluteUrl(`/sub-communities/${village.slug}`),
    })),
  };
}

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ironMountainRanchFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function SubCommunitiesPage() {
  const neighborhoodSchema = generateNeighborhoodSchema();
  const itemListSchema = buildItemListSchema();
  const faqSchema = buildFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/sub-communities"
          title="Iron Mountain Ranch Sub-Communities"
          subtitle={ironMountainRanch.description}
        >
          <p className="text-white/80 mb-6">
            ~{ironMountainRanch.homeCount.toLocaleString()} homes · Zip{" "}
            {ironMountainRanch.zipCodes.join(" & ")} · Built {ironMountainRanch.yearBuiltRange}
            {" · "}
            <Link href="/las-vegas-zip-code-map" className="underline hover:text-white">
              Las Vegas zip code map
            </Link>
          </p>
          <div className="flex justify-center">
            <GbpActionLinks />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 max-w-6xl py-16">
          {/* AEO: direct answer */}
          <section className="mb-14 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              What sub-communities are in Iron Mountain Ranch?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Iron Mountain Ranch is a KB Home master-planned community in northwest Las Vegas with{" "}
              <strong>gated villages</strong> commonly labeled in MLS as{" "}
              <strong>Iron Mountain Ranch-Village 1-A through Village 11</strong>, plus{" "}
              <strong>Iron Mountain Estates</strong>, <strong>Bradley Ranch</strong>, and{" "}
              <strong>Quarterhorse Estate</strong>. Several villages use builder marketing names
              buyers still search—such as <strong>Wolf Creek</strong> (Village 4),{" "}
              <strong>Meadow Ridge</strong> (Village 3), and{" "}
              <strong>Classics at Iron Mountain Ranch</strong> (Village 7). The community includes
              roughly 1,700 single-family homes across zip codes{" "}
              {ironMountainRanch.zipCodes.join(" and ")}, with community parks, ponds, and walking
              paths maintained through a Landscape Maintenance Association.
            </p>
            <p className="text-slate-600 text-sm">{ironMountainRanch.hoaNote}</p>
          </section>

          <ImrRegionalMarketSection className="mb-16" />

          {/* Village grid */}
          <section className="mb-16" aria-labelledby="village-directory-heading">
            <h2 id="village-directory-heading" className="text-2xl font-bold text-slate-900 mb-6">
              Village directory
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCommunities.map((village) => (
                <Link
                  key={village.slug}
                  href={`/sub-communities/${village.slug}`}
                  className="block border border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all bg-white"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{village.name}</h3>
                  <p className="text-xs text-slate-400 mb-2">MLS: {village.mlsSubdivision}</p>
                  <p className="text-slate-600 text-sm mb-4">{village.description}</p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    {village.highlights.map((h) => (
                      <li key={h}>• {h}</li>
                    ))}
                  </ul>
                  <span className="inline-block mt-4 text-blue-600 text-sm font-semibold">
                    View village guide →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="mb-16" aria-labelledby="amenities-heading">
            <h2 id="amenities-heading" className="text-2xl font-bold text-slate-900 mb-6">
              Why buyers choose Iron Mountain Ranch villages
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Gated villages",
                  text: "Controlled-access neighborhoods across the master plan—not a single gate, but village-by-village security.",
                },
                {
                  icon: Trees,
                  title: "Parks & paths",
                  text: ironMountainRanch.landscapeNote,
                },
                {
                  icon: MapPin,
                  title: "Northwest location",
                  text: "US-95 and the 215 Beltway put Centennial Hills, Aliante, Floyd Lamb Park, and Red Rock Canyon within an easy drive.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-lg border border-slate-200 p-5 bg-white">
                  <Icon className="h-8 w-8 text-blue-600 mb-3" aria-hidden />
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm">{text}</p>
                </div>
              ))}
            </div>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
              {ironMountainRanch.amenities.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-blue-600">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <DeferredRealScoutListings />

          <section className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Search all Iron Mountain Ranch listings
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              MLS inventory spans every village. Filter by price, beds, or days on market on the Buy
              page—or call Dr. Jan for village-specific alerts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/buy"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Search MLS listings
              </Link>
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call {agentInfo.phoneFormatted}
              </a>
            </div>
          </section>

          <FAQSection
            faqs={[...ironMountainRanchFaqs]}
            title="Iron Mountain Ranch Village FAQ"
            subtitle="Answers for buyers comparing gated villages in 89131 and 89143"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
