import Navbar from "@/components/layouts/Navbar";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import { MapPin, Phone, Home, Users, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Iron Mountain Ranch vs Las Vegas Neighborhoods | 89131 Comparison",
  description:
    "Compare Iron Mountain Ranch gated villages (89131 & 89143) with Summerlin, Henderson, Centennial Hills, and northwest Las Vegas. Village guides from Dr. Jan Duffy. Call (702) 996-3758.",
  path: "/neighborhoods",
  keywords: [
    "Iron Mountain Ranch neighborhoods",
    "89131 gated communities",
    "Iron Mountain Ranch vs Summerlin",
    "northwest Las Vegas comparison",
    "Centennial Hills vs Iron Mountain Ranch",
  ],
});

const ironMountainRanchCard = {
  name: "Iron Mountain Ranch",
  slug: "iron-mountain-ranch",
  medianPrice: "$550,000",
  priceChange: "+3.8%",
  description:
    "KB Home master plan with ~1,700 gated village homes, parks, ponds, and LMA trails in 89131 & 89143",
  highlights: ["Gated villages", "89131 & 89143", "Village 1-A–11", "Iron Mountain Estates"],
  bestFor: "Primary focus — gated northwest family homes",
  primary: true,
};

const neighborhoods = [
  {
    name: "Summerlin",
    slug: "summerlin",
    medianPrice: "$625,000",
    priceChange: "+6.8%",
    description: "Premier master-planned community with parks, trails, and top-rated schools",
    highlights: ["150+ Parks", "Top Schools", "Red Rock Views", "Downtown Summerlin"],
    bestFor: "Families, professionals, outdoor enthusiasts",
  },
  {
    name: "Henderson",
    slug: "henderson",
    medianPrice: "$485,000",
    priceChange: "+5.1%",
    description: "Nevada's second-largest city known for safety, schools, and family-friendly living",
    highlights: ["Low Crime Rate", "Excellent Schools", "Lake Las Vegas", "Green Valley"],
    bestFor: "Families, retirees, commuters",
  },
  {
    name: "Green Valley",
    slug: "green-valley",
    medianPrice: "$520,000",
    priceChange: "+4.8%",
    description: "Established Henderson community with mature landscaping and excellent amenities",
    highlights: ["Golf Courses", "Walking Trails", "The District", "Mature Trees"],
    bestFor: "Established families, golfers, professionals",
  },
  {
    name: "The Ridges",
    slug: "the-ridges",
    medianPrice: "$2,500,000",
    priceChange: "+8.5%",
    description: "Ultra-luxury guard-gated community with custom estates and celebrity residents",
    highlights: ["Guard-Gated", "Custom Estates", "Bear's Best Golf", "Strip Views"],
    bestFor: "Luxury buyers, celebrities, executives",
  },
  {
    name: "Southern Highlands",
    slug: "southern-highlands",
    medianPrice: "$750,000",
    priceChange: "+7.2%",
    description: "Master-planned luxury community with championship golf and mountain views",
    highlights: ["Golf Community", "Guard-Gated", "Mountain Views", "Luxury Amenities"],
    bestFor: "Golfers, luxury buyers, families",
  },
  {
    name: "North Las Vegas",
    slug: "north-las-vegas",
    medianPrice: "$385,000",
    priceChange: "+3.2%",
    description: "Rapidly growing area with affordable new construction and family-friendly communities",
    highlights: ["New Construction", "Affordable", "Growing Area", "Family-Friendly"],
    bestFor: "First-time buyers, young families, investors",
  },
  {
    name: "Skye Canyon",
    slug: "skye-canyon",
    medianPrice: "$550,000",
    priceChange: "+5.5%",
    description: "Newer master-planned community in northwest Las Vegas with mountain views",
    highlights: ["New Homes", "Mountain Views", "Skye Center", "Great Schools"],
    bestFor: "Young families, outdoor enthusiasts, commuters",
  },
  {
    name: "Centennial Hills",
    slug: "centennial-hills",
    medianPrice: "$495,000",
    priceChange: "+4.8%",
    description: "Northwest Las Vegas community with mountain proximity and family amenities",
    highlights: ["Mountain Access", "Parks", "Shopping", "Family-Friendly"],
    bestFor: "Families, outdoor lovers, professionals",
  },
  {
    name: "Inspirada",
    slug: "inspirada",
    medianPrice: "$525,000",
    priceChange: "+5.0%",
    description: "Henderson master-planned community with resort-style living and modern homes",
    highlights: ["Resort Pools", "Walking Trails", "New Construction", "Great Schools"],
    bestFor: "Families, active adults, new home buyers",
  },
  {
    name: "Mountains Edge",
    slug: "mountains-edge",
    medianPrice: "$475,000",
    priceChange: "+4.5%",
    description: "Southwest Las Vegas master-planned community with mountain views and parks",
    highlights: ["Mountain Views", "Parks", "Growing Area", "Affordable Luxury"],
    bestFor: "Families, commuters, value-seekers",
  },
];

const allNeighborhoods = [ironMountainRanchCard, ...neighborhoods];

export default function NeighborhoodsPage() {
  return (
    <>
      <Navbar />
      <main>
        <IronMountainPageHero
          path="/neighborhoods"
          title="Iron Mountain Ranch & Northwest Comparisons"
          subtitle="This site specializes in Iron Mountain Ranch gated villages. Other areas below help you compare pricing and lifestyle before you choose a village in 89131 or 89143."
        />
        <div className="container mx-auto px-4 py-16">
          {/* Neighborhood Grid */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {allNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={
                    neighborhood.slug === "iron-mountain-ranch"
                      ? "/neighborhoods/iron-mountain-ranch"
                      : `/neighborhoods/${neighborhood.slug}`
                  }
                  className={`rounded-lg p-6 hover:shadow-lg transition-all group ${
                    "primary" in neighborhood && neighborhood.primary
                      ? "border-2 border-blue-400 bg-blue-50"
                      : "bg-white border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {neighborhood.name}
                      </h2>
                      <p className="text-sm text-slate-500">{neighborhood.bestFor}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{neighborhood.medianPrice}</div>
                      <div className="text-sm text-green-600">{neighborhood.priceChange} YoY</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{neighborhood.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                &ldquo;Iron Mountain Ranch buyers often compare Centennial Hills, Summerlin, and
                Skye Canyon before choosing a gated village in 89131. I filter MLS by subdivision—Village
                4 (Wolf Creek), Meadow Ridge, Iron Mountain Estates—so you see real village pricing, not
                valley averages.&rdquo;
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, BHHS Nevada Properties
              </cite>
            </div>
          </section>

          {/* Neighborhood Services */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Neighborhood Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Area Tours</h3>
                <p className="text-slate-400 text-sm">
                  Personalized neighborhood tours to help you experience each community firsthand
                </p>
              </div>
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">School Research</h3>
                <p className="text-slate-400 text-sm">
                  Detailed school district information, ratings, and enrollment guidance
                </p>
              </div>
              <div className="text-center">
                <Home className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Home Matching</h3>
                <p className="text-slate-400 text-sm">
                  Find homes that match your criteria in the neighborhoods you love
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need help choosing an Iron Mountain Ranch village?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Dr. Jan Duffy tours gated villages in 89131 and 89143 and compares them to northwest
              alternatives before you write an offer.
            </p>
            <a
              href="tel:+17029963758"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call (702) 996-3758
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: June 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
