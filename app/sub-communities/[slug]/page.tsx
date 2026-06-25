import ImrRegionalMarketSection from "@/components/sections/ImrRegionalMarketSection";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSubCommunity,
  IRON_MOUNTAIN_RANCH_HUB_PATH,
  subCommunities,
} from "@/lib/iron-mountain-ranch";
import { agentInfo } from "@/lib/site-config";
import { getHeroForSubCommunity } from "@/lib/page-hero";
import { buildPageMetadata } from "@/lib/page-metadata";
import {
  buildImrVillageBreadcrumbs,
  buildImrVillagePageSchema,
} from "@/lib/imr-seo-schema";

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

  return buildPageMetadata({
    title: `${village.name} Homes for Sale | Iron Mountain Ranch Las Vegas`,
    description: `${village.description} Search gated Iron Mountain Ranch listings with Dr. Jan Duffy. Call ${agentInfo.phoneFormatted}.`,
    path: `/sub-communities/${slug}`,
  });
}

export default async function SubCommunityPage({ params }: PageProps) {
  const { slug } = await params;
  const village = getSubCommunity(slug);
  if (!village) notFound();

  const pageSchema = buildImrVillagePageSchema(village, slug);
  const breadcrumbs = buildImrVillageBreadcrumbs(village.name, slug);
  const hero = getHeroForSubCommunity(village);

  return (
    <>
      <SchemaScript schema={pageSchema} id={`imr-village-schema-${slug}`} />
      <Navbar />
      <main>
        <PageHero {...hero}>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              {village.name} Homes for Sale
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto mb-6">
              {village.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {village.highlights.map((h) => (
                <span
                  key={h}
                  className="bg-white/15 text-white text-sm px-3 py-1 rounded-full border border-white/25"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="flex justify-center">
              <GbpActionLinks />
            </div>
          </div>
        </PageHero>
        <div className="container mx-auto px-4 max-w-5xl py-16">
          <BreadcrumbNav items={breadcrumbs} className="mb-6" />

          <p className="mb-8 text-slate-600 text-sm">
            <Link
              href={IRON_MOUNTAIN_RANCH_HUB_PATH}
              className="font-semibold text-blue-600 hover:underline"
            >
              Iron Mountain Ranch homes for sale
            </Link>
            {" · "}
            MLS subdivision: <strong>{village.mlsSubdivision}</strong>
          </p>

          <ImrRegionalMarketSection village={village} className="mb-12" />

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
