import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import FAQSection from "@/components/sections/FAQSection";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { agentInfo, officeInfo } from "@/lib/site-config";
import { ironMountainRanch, ironMountainRanchFaqs } from "@/lib/iron-mountain-ranch";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Homes for Sale | Northwest Las Vegas 89131",
  description: "Iron Mountain Ranch homes for sale in northwest Las Vegas (89131). Gated community with parks, ponds, and walking paths. Dr. Jan Duffy, BHHS Nevada Properties. Call (702) 996-3758.",
  path: "/neighborhoods/iron-mountain-ranch",
  keywords: ["Iron Mountain Ranch homes for sale","Iron Mountain Ranch Las Vegas","89131 homes","gated community Las Vegas","northwest Las Vegas real estate"],
});

const placeSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: ironMountainRanch.name,
  description: ironMountainRanch.description,
  url: absoluteUrl("/neighborhoods/iron-mountain-ranch"),
  geo: {
    "@type": "GeoCoordinates",
    latitude: ironMountainRanch.geo.latitude,
    longitude: ironMountainRanch.geo.longitude,
  },
  containedInPlace: {
    "@type": "City",
    name: "Las Vegas",
    addressRegion: "NV",
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
  const mapQuery = encodeURIComponent(
    `${ironMountainRanch.name} Las Vegas NV ${ironMountainRanch.zipCodes[0]}`,
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
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
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

          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-blue-600 font-semibold mb-3">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Iron Mountain Ranch Homes for Sale
            </h1>
            <p className="text-xl text-slate-600">
              Gated northwest Las Vegas community in zip code{" "}
              <strong>{ironMountainRanch.zipCodes.join(" & ")}</strong>. Work with{" "}
              <strong>{agentInfo.name}</strong> for expert buyer and seller representation.
            </p>
            <div className="mt-8 flex justify-center">
              <GbpActionLinks />
            </div>
          </div>

          <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Community Overview</h2>
              <p className="text-slate-600 mb-4">{ironMountainRanch.description}</p>
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

          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4 text-center">Iron Mountain Ranch Map</h2>
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="Iron Mountain Ranch Las Vegas map"
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
            subtitle="Common questions from buyers and sellers in this gated northwest Las Vegas community"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
