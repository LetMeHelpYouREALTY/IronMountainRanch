import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import Link from "next/link";
import type { Metadata } from "next";
import { Phone, Camera, TrendingUp, BarChart } from "lucide-react";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Sell Your Iron Mountain Ranch Home | Las Vegas 89131",
  description:
    "Sell your Iron Mountain Ranch home for top dollar. Free CMA, professional marketing, and gated-community pricing expertise from Dr. Jan Duffy. Call (702) 500-1942.",
  alternates: { canonical: "/sell" },
  openGraph: {
    title: "Sell Iron Mountain Ranch Homes",
    url: absoluteUrl("/sell"),
  },
};

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

export default function SellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellServiceSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-blue-600 font-semibold text-center mb-3">{siteConfig.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6">
            Sell Your Iron Mountain Ranch Home
          </h1>
          <p className="text-xl text-slate-600 text-center mb-8 max-w-3xl mx-auto">
            Village-specific pricing, gated-community marketing, and Berkshire Hathaway
            HomeServices exposure — led by {agentInfo.name}.
          </p>
          <div className="flex justify-center mb-12">
            <GbpActionLinks />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: BarChart, title: "Free Home Valuation", desc: "Accurate CMA using Iron Mountain Ranch village comps." },
              { icon: Camera, title: "Professional Marketing", desc: "Photography, syndication, and BHHS global buyer network." },
              { icon: TrendingUp, title: "Strategic Pricing", desc: "Price right from day one to maximize net proceeds." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6">
                <Icon className="h-8 w-8 text-blue-600 mb-3" />
                <h2 className="font-bold text-lg mb-2">{title}</h2>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to list?</h2>
            <p className="text-blue-100 mb-6">
              Contact {agentInfo.email} or call {agentInfo.phoneFormatted} for a confidential
              seller consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50"
              >
                Schedule Consultation
              </Link>
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center border border-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
