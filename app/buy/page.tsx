import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";
import CalendlyInlineSection from "@/components/calendly/CalendlyInlineSection";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { Phone, Search, Key, Shield } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import { generateListingServiceSchema } from "@/lib/schema-blueprint";

export const metadata: Metadata = buildPageMetadata({
  title: "Buy a Home in Iron Mountain Ranch | Northwest Las Vegas 89131",
  description:
    "Search Iron Mountain Ranch gated homes for sale in northwest Las Vegas 89131. MLS search, village filters, and buyer representation from Dr. Jan Duffy. Call (702) 996-3758.",
  path: "/buy",
});

const listingSchema = generateListingServiceSchema();

export default function BuyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/buy"
          title="Buy in Iron Mountain Ranch"
          subtitle={`Search gated Iron Mountain Ranch homes in zip 89131 with ${agentInfo.name}. Enter an address, city, or MLS # below — no signup until you save a search.`}
        >
          <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
            <RealScoutSimpleSearch id="imr-search" className="w-full" />
            <p className="text-sm text-white/80 text-center">
              Iron Mountain Ranch village homes · gated northwest Las Vegas · 89131 &amp; 89143
            </p>
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Search,
                title: "Village-Level Search",
                desc: "Filter by Iron Mountain Ranch village, price, beds, and gate access.",
              },
              {
                icon: Key,
                title: "Buyer Representation",
                desc: "Dr. Jan negotiates price, inspections, and HOA review on your behalf.",
              },
              {
                icon: Shield,
                title: "BHHS Backed",
                desc: "Warren Buffett's brand with local Iron Mountain Ranch expertise.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6 text-center">
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h2 className="font-bold text-lg mb-2">{title}</h2>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <RealScoutListings />

          <CalendlyInlineSection
            utm={{
              utmSource: "ironmountainranchlasvegas.com",
              utmMedium: "website",
              utmCampaign: "imr-buy",
              utmContent: "buy-midpage",
            }}
            title="Tour Iron Mountain Ranch Homes In Person"
            subtitle="After you search listings above, book a private showing or buyer consultation with Dr. Jan Duffy."
            id="schedule-consultation"
          />

          <div className="text-center mt-12">
            <TrackedLink
              href="/sub-communities"
              ctaName="Explore sub-communities"
              intent="buyer"
              proximity="midpage"
              className="text-blue-600 font-semibold hover:underline mr-6"
            >
              Explore sub-communities
            </TrackedLink>
            <a href={agentInfo.phoneTel} className="inline-flex items-center text-blue-600 font-semibold">
              <Phone className="h-4 w-4 mr-2" />
              {agentInfo.phoneFormatted}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
