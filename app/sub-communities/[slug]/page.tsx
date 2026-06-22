import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSubCommunity, subCommunities } from "@/lib/iron-mountain-ranch";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return subCommunities.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const village = getSubCommunity(slug);
  if (!village) return {};

  return {
    title: `${village.name} Homes for Sale | Iron Mountain Ranch Las Vegas`,
    description: `${village.description} Search listings with Dr. Jan Duffy. Call (702) 500-1942.`,
    alternates: { canonical: `/sub-communities/${slug}` },
    openGraph: {
      title: `${village.name} | Iron Mountain Ranch`,
      url: absoluteUrl(`/sub-communities/${slug}`),
    },
  };
}

export default async function SubCommunityPage({ params }: PageProps) {
  const { slug } = await params;
  const village = getSubCommunity(slug);
  if (!village) notFound();

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Neighborhood",
    name: village.name,
    description: village.description,
    url: absoluteUrl(`/sub-communities/${slug}`),
    containedInPlace: {
      "@type": "Neighborhood",
      name: "Iron Mountain Ranch",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89131",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-sm text-slate-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            {" / "}
            <Link href="/sub-communities" className="hover:text-blue-600">Sub-Communities</Link>
            {" / "}
            <span className="text-slate-900">{village.name}</span>
          </nav>

          <p className="text-blue-600 font-semibold mb-3">{siteConfig.name}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {village.name} Homes for Sale
          </h1>
          <p className="text-xl text-slate-600 mb-8">{village.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {village.highlights.map((h) => (
              <span key={h} className="bg-blue-50 text-blue-800 text-sm px-3 py-1 rounded-full">
                {h}
              </span>
            ))}
          </div>
          <GbpActionLinks className="mb-12" />

          <RealScoutListings />

          <p className="text-center text-slate-600 mt-10">
            Questions about {village.name}? Email{" "}
            <a href={`mailto:${agentInfo.email}`} className="text-blue-600 font-semibold">
              {agentInfo.email}
            </a>{" "}
            or call {agentInfo.phoneFormatted}.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
