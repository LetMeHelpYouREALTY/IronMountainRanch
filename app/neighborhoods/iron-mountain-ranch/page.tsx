import Navbar from "@/components/layouts/Navbar";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import FAQSection from "@/components/sections/FAQSection";
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
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Las Vegas, Nevada | Homes for Sale",
  description:
    "Iron Mountain Ranch, Las Vegas, Nevada — gated homes and houses for sale in 89131 & 89143. Iron Mountain Estates, village guides, and MLS search. Dr. Jan Duffy, BHHS Nevada Properties. Call (702) 996-3758.",
  path: IRON_MOUNTAIN_RANCH_HUB_PATH,
  keywords: [
    "Iron Mountain Ranch Las Vegas",
    "Iron Mountain Ranch Nevada",
    "Iron Mountain Ranch homes for sale",
    "Iron Mountain Ranch houses for sale",
    "houses for sale in Iron Mountain Ranch",
    "Iron Mountain Estates",
    "Iron Mountain Ranch gated community",
    "89131 homes",
    "89143 homes",
  ],
});

const placeSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: `${ironMountainRanch.name}, Las Vegas, Nevada`,
  description: ironMountainRanch.description,
  url: absoluteUrl(IRON_MOUNTAIN_RANCH_HUB_PATH),
  geo: {
    "@type": "GeoCoordinates",
    latitude: ironMountainRanch.geo.latitude,
    longitude: ironMountainRanch.geo.longitude,
  },
  containedInPlace: {
    "@type": "City",
    name: "Las Vegas",
    addressRegion: "NV",
    addressCountry: "US",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ironMountainRanchFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function IronMountainRanchPage() {
  const estates = getIronMountainEstatesVillage();
  const mapQuery = encodeURIComponent(
    `${ironMountainRanch.name} Las Vegas Nevada ${ironMountainRanch.zipCodes[0]}`,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
          <nav className="text-sm text-slate-500 mb-6 max-w-6xl mx-auto">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/neighborhoods" className="hover:text-blue-600">
              Neighborhoods
            </Link>
            {" / "}
            <span className="text-slate-900">Iron Mountain Ranch</span>
          </nav>

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
