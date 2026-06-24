import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { Phone, Search, Key, Shield } from "lucide-react";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { generateListingServiceSchema } from "@/lib/schema-blueprint";

export const metadata: Metadata = buildPageMetadata({
  title: "Buy a Home in Iron Mountain Ranch | Northwest Las Vegas 89131",
  description: "Buy an Iron Mountain Ranch home in northwest Las Vegas. Gated community MLS search, buyer representation, and village guidance from Dr. Jan Duffy. Call (702) 996-3758.",
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
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-blue-600 font-semibold text-center mb-3">{siteConfig.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6">
            Buy in Iron Mountain Ranch
          </h1>
          <p className="text-xl text-slate-600 text-center mb-8 max-w-3xl mx-auto">
            Search gated Iron Mountain Ranch homes in zip code 89131 with {agentInfo.name}. Free
            buyer representation through Berkshire Hathaway HomeServices Nevada Properties.
          </p>
          <div className="flex justify-center mb-12">
            <GbpActionLinks />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Search, title: "Village-Level Search", desc: "Filter by Iron Mountain Ranch village, price, beds, and gate access." },
              { icon: Key, title: "Buyer Representation", desc: "Dr. Jan negotiates price, inspections, and HOA review on your behalf." },
              { icon: Shield, title: "BHHS Backed", desc: "Warren Buffett's brand with local Iron Mountain Ranch expertise." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6 text-center">
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h2 className="font-bold text-lg mb-2">{title}</h2>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex justify-center">
            <div
              dangerouslySetInnerHTML={{
                __html: `<realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>`,
              }}
            />
          </div>

          <RealScoutListings />

          <div className="text-center mt-12">
            <Link
              href="/sub-communities"
              className="text-blue-600 font-semibold hover:underline mr-6"
            >
              Explore sub-communities
            </Link>
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
