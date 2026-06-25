import ImrRegionalMarketSection from "@/components/sections/ImrRegionalMarketSection";
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
import { IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";
import { generateListingServiceSchema } from "@/lib/schema-blueprint";
import ZipQueryBanner from "@/components/maps/ZipQueryBanner";
import { isValidZipCode } from "@/lib/las-vegas-zip-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch Houses for Sale | Las Vegas, Nevada",
  description:
    "Iron Mountain Ranch houses for sale in Las Vegas, Nevada (89131 & 89143). MLS search for gated villages and Iron Mountain Estates. Buyer representation from Dr. Jan Duffy. Call (702) 996-3758.",
  path: "/buy",
  keywords: [
    "Iron Mountain Ranch houses for sale",
    "houses for sale in Iron Mountain Ranch",
    "Iron Mountain Ranch homes for sale",
    "Iron Mountain Ranch Las Vegas",
    "Iron Mountain Ranch Nevada",
    "Iron Mountain Estates homes",
  ],
});

const listingSchema = generateListingServiceSchema();

export default function BuyPage({
  searchParams,
}: {
  searchParams?: { zip?: string };
}) {
  const zipParam = searchParams?.zip;
  const zip = zipParam && isValidZipCode(zipParam) ? zipParam : null;

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
          title="Iron Mountain Ranch Houses for Sale"
          subtitle={`Search gated Iron Mountain Ranch homes in Las Vegas, Nevada (89131 & 89143) with ${agentInfo.name}. Enter an address, city, or MLS # below — no signup until you save a search.`}
        >
          <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
            <RealScoutSimpleSearch id="imr-search" className="w-full" />
            <p className="text-sm text-white/80 text-center">
              Iron Mountain Ranch village homes · gated northwest Las Vegas · 89131 &amp; 89143
            </p>
          </div>
        </IronMountainPageHero>
        <ZipQueryBanner zip={zip} variant="buy" />
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <ImrRegionalMarketSection className="mb-12" />
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
              href={IRON_MOUNTAIN_RANCH_HUB_PATH}
              ctaName="Iron Mountain Ranch community guide"
              intent="buyer"
              proximity="midpage"
              className="text-blue-600 font-semibold hover:underline mr-6"
            >
              Iron Mountain Ranch Las Vegas, Nevada guide
            </TrackedLink>
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
