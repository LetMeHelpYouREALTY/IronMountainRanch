import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";
import { lasVegasZipData } from "@/lib/las-vegas-zip-data";

const LasVegasZipCodeMap = dynamic(
  () => import("@/components/maps/LasVegasZipCodeMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200" aria-hidden="true" />
    ),
  },
);

export const metadata: Metadata = buildPageMetadata({
  title: "Las Vegas Zip Code Map | Iron Mountain Ranch & Northwest Valley",
  description:
    "Interactive Las Vegas Valley zip code map with Iron Mountain Ranch (89131 & 89143) highlighted. Search homes by zip or contact Dr. Jan Duffy for northwest Las Vegas real estate.",
  path: "/las-vegas-zip-code-map",
  keywords: [
    "Las Vegas zip code map",
    "Iron Mountain Ranch zip code",
    "89131 zip code",
    "89143 zip code",
    "northwest Las Vegas zip codes",
    "Centennial Hills zip code",
  ],
});

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl("/las-vegas-zip-code-map")}#webpage`,
      name: "Las Vegas Valley Zip Code Map",
      description:
        "Directory and map of Las Vegas Valley zip codes with Iron Mountain Ranch (89131 and 89143) highlighted for northwest Las Vegas home search.",
      url: absoluteUrl("/las-vegas-zip-code-map"),
      isPartOf: { "@id": absoluteUrl("/") },
      about: {
        "@type": "City",
        name: "Las Vegas",
        addressRegion: "NV",
        addressCountry: "US",
      },
      author: {
        "@type": "RealEstateAgent",
        name: agentInfo.name,
        telephone: agentInfo.phoneTel.replace("tel:", ""),
        worksFor: {
          "@type": "Organization",
          name: agentInfo.brokerage,
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Las Vegas Zip Code Map",
          item: absoluteUrl("/las-vegas-zip-code-map"),
        },
      ],
    },
    {
      "@type": "Map",
      name: "Las Vegas Valley Zip Code Map",
      mapType: "https://schema.org/VenueMap",
      url: absoluteUrl("/las-vegas-zip-code-map"),
      about: {
        "@type": "City",
        name: "Las Vegas",
        addressRegion: "NV",
      },
    },
  ],
};

const zipFaq = [
  {
    question: "What zip codes cover Iron Mountain Ranch?",
    answer:
      "Iron Mountain Ranch spans 89131 and 89143 in northwest Las Vegas. Village assignments and HOA boundaries depend on your specific address — Dr. Jan Duffy confirms details before you tour.",
  },
  {
    question: "How do I search homes in a specific Las Vegas zip code?",
    answer:
      "Choose a zip card on this map and select Search homes to open the MLS search on /buy, or call (702) 996-3758 for a curated list in that zip.",
  },
];

export default function LasVegasZipCodeMapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/las-vegas-zip-code-map"
          title="Las Vegas Valley Zip Code Map"
          subtitle={`Find northwest Las Vegas and Iron Mountain Ranch zip codes (89131 & 89143). ${siteConfig.name}.`}
        >
          <GbpActionLinks className="justify-center" />
        </IronMountainPageHero>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/sub-communities" className="hover:text-blue-600">
                  Iron Mountain Ranch
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-900">Zip code map</li>
            </ol>
          </nav>

          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-lg text-slate-700">
              Use the map and zip cards to explore Las Vegas Valley neighborhoods. Iron Mountain Ranch
              buyers often start in <strong>89131</strong> and <strong>89143</strong> — gated KB villages
              with parks, ponds, and quick access to the 215 Beltway.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {lasVegasZipData.length} zip codes listed · Updated {new Date().getFullYear()}
            </p>
          </div>

          <LasVegasZipCodeMap />

          <section className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Zip code questions</h2>
            <div className="space-y-4">
              {zipFaq.map((item) => (
                <div key={item.question} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-3xl rounded-2xl bg-slate-900 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">Ready to search by zip?</h2>
            <p className="mt-3 text-slate-300">
              Start with Iron Mountain Ranch on /buy or schedule a consultation with Dr. Jan Duffy.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/buy#imr-search"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
              >
                Search IMR listings
              </Link>
              <Link
                href="/sub-communities"
                className="rounded-lg border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Village guides
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
