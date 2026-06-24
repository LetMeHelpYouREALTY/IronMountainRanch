import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import CalendlyInlineSection from "@/components/calendly/CalendlyInlineSection";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { Phone, Camera, TrendingUp, BarChart } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = buildPageMetadata({
  title: "Sell Your Iron Mountain Ranch Home | Las Vegas 89131",
  description:
    "Sell your Iron Mountain Ranch home. Schedule an in-person seller consultation with Dr. Jan Duffy — gated 89131 village pricing expertise. Call (702) 996-3758.",
  path: "/sell",
});

const sellServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Iron Mountain Ranch Home Selling Service",
  serviceType: "Seller Representation",
  url: absoluteUrl("/sell"),
  provider: {
    "@type": "RealEstateAgent",
    name: agentInfo.name,
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    email: agentInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "6628 Sky Pointe Dr.",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89131",
    },
  },
  areaServed: "Iron Mountain Ranch, Las Vegas NV 89131",
};

const sellUtm = {
  utmSource: "ironmountainranchlasvegas.com",
  utmMedium: "website",
  utmCampaign: "imr-sell",
  utmContent: "sell-hero",
} as const;

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellServiceSchema) }}
      />
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/sell"
          title="Sell Your Iron Mountain Ranch Home"
          subtitle={`Schedule an in-person seller consultation with ${agentInfo.name} — village-specific pricing for gated Iron Mountain Ranch homes in 89131.`}
        >
          <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden bg-white/95 shadow-lg">
            <CalendlyWidget
              id="schedule-consultation"
              utm={sellUtm}
              height="520px"
            />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: BarChart,
                title: "Seller Consultation",
                desc: "In-person meeting to review Iron Mountain Ranch village comps and net proceeds.",
              },
              {
                icon: Camera,
                title: "Professional Marketing",
                desc: "Photography, syndication, and BHHS global buyer network.",
              },
              {
                icon: TrendingUp,
                title: "Strategic Pricing",
                desc: "Price right from day one to maximize net proceeds in 89131.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6">
                <Icon className="h-8 w-8 text-blue-600 mb-3" />
                <h2 className="font-bold text-lg mb-2">{title}</h2>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <CalendlyInlineSection
            utm={{ ...sellUtm, utmContent: "sell-midpage" }}
            title="Book Your Seller Consultation"
            subtitle="Choose a time for an in-person meeting — Iron Mountain Ranch pricing, staging, and BHHS marketing plan."
            id="schedule-consultation-mid"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
