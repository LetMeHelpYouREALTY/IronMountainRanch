import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import LeadCTA from "@/components/sections/LeadCTA";
import Link from "next/link";
import type { Metadata } from "next";
import { ironMountainRanch, subCommunities } from "@/lib/iron-mountain-ranch";
import { generateNeighborhoodSchema } from "@/lib/schema-blueprint";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Iron Mountain Ranch Sub-Communities | Villages in 89131",
  description:
    "Explore Iron Mountain Ranch sub-communities and gated villages in northwest Las Vegas 89131. Village guides from Dr. Jan Duffy.",
  alternates: { canonical: "/sub-communities" },
  openGraph: {
    title: "Iron Mountain Ranch Sub-Communities",
    url: absoluteUrl("/sub-communities"),
  },
};

export default function SubCommunitiesPage() {
  const neighborhoodSchema = generateNeighborhoodSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighborhoodSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <p className="text-blue-600 font-semibold text-center mb-3">{siteConfig.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6">
            Iron Mountain Ranch Sub-Communities
          </h1>
          <p className="text-xl text-slate-600 text-center mb-4 max-w-3xl mx-auto">
            {ironMountainRanch.description}
          </p>
          <p className="text-center text-slate-500 mb-8">
            ~{ironMountainRanch.homeCount.toLocaleString()} homes across{" "}
            {ironMountainRanch.villageCount} villages · Zip {ironMountainRanch.zipCodes.join(", ")}
          </p>
          <div className="flex justify-center mb-12">
            <GbpActionLinks />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subCommunities.map((village) => (
              <Link
                key={village.slug}
                href={`/sub-communities/${village.slug}`}
                className="block border border-slate-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-2">{village.name}</h2>
                <p className="text-slate-600 text-sm mb-4">{village.description}</p>
                <ul className="text-sm text-slate-500 space-y-1">
                  {village.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>

        <LeadCTA
          className="mt-16"
          subheading="Search live Iron Mountain Ranch listings across all nine villages, book a private tour, or call Dr. Jan Duffy directly."
          calendlyUtm={{ campaign: "sub-communities" }}
        />
      </main>
      <Footer />
    </>
  );
}
