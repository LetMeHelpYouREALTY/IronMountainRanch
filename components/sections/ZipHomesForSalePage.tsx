import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import IronMountainPageHero from "@/components/sections/IronMountainPageHero";
import ImrHubLinkStrip from "@/components/sections/ImrHubLinkStrip";
import BreadcrumbNav from "@/components/shared/BreadcrumbNav";
import SchemaScript from "@/components/SchemaScript";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import GbpActionLinks from "@/components/shared/GbpActionLinks";
import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { ironMountainRanch, IRON_MOUNTAIN_RANCH_HUB_PATH } from "@/lib/iron-mountain-ranch";
import {
  buildImrTopicBreadcrumbs,
  buildImrTopicPageSchema,
  getVillagesForZip,
} from "@/lib/imr-topical-pages";
import { agentInfo } from "@/lib/site-config";

type ZipHomesPageProps = {
  zip: "89131" | "89143";
};

export function buildZipHomesMetadata(zip: "89131" | "89143"): Metadata {
  const isEstates = zip === "89143";
  return buildPageMetadata({
    title: isEstates
      ? "89143 Homes for Sale | Iron Mountain Estates & IMR"
      : "89131 Homes for Sale | Iron Mountain Ranch Las Vegas",
    description: isEstates
      ? `Homes for sale in zip 89143 — Iron Mountain Estates and Kyle Canyon corridor inside Iron Mountain Ranch. Gated northwest Las Vegas. Dr. Jan Duffy. Call ${agentInfo.phoneFormatted}.`
      : `Homes for sale in zip 89131 — Iron Mountain Ranch gated KB villages, Wolf Creek, Meadow Ridge, and more. Northwest Las Vegas MLS search. Dr. Jan Duffy.`,
    path: `/${zip}-homes-for-sale`,
    keywords: isEstates
      ? [
          "89143 homes for sale",
          "Iron Mountain Estates homes for sale",
          "89143 Iron Mountain Ranch",
          "Kyle Canyon homes for sale",
          "Iron Mountain Ranch 89143",
        ]
      : [
          "89131 homes for sale",
          "Iron Mountain Ranch 89131",
          "89131 gated homes",
          "Wolf Creek Las Vegas",
          "Iron Mountain Ranch las vegas for sale",
        ],
  });
}

export function ZipHomesForSalePage({ zip }: ZipHomesPageProps) {
  const path = `/${zip}-homes-for-sale` as const;
  const topic = `${zip} homes for sale`;
  const villages = getVillagesForZip(zip);
  const zipGuide =
    zip === "89131" ? ironMountainRanch.zipGuide.zip89131 : ironMountainRanch.zipGuide.zip89143;
  const pageSchema = buildImrTopicPageSchema(topic, path);
  const breadcrumbs = buildImrTopicBreadcrumbs(topic, path);

  return (
    <>
      <SchemaScript schema={pageSchema} id={`imr-zip-${zip}-schema`} />
      <Navbar />
      <main>
        <IronMountainPageHero
          path={path}
          title={`${zip} Homes for Sale in Iron Mountain Ranch`}
          subtitle={`Gated northwest Las Vegas MLS search — zip ${zip} inside the Iron Mountain Ranch master plan.`}
          showImrContext={false}
        >
          <div className="flex justify-center">
            <GbpActionLinks />
          </div>
        </IronMountainPageHero>
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          <BreadcrumbNav items={breadcrumbs} className="mb-6" />
          <ImrHubLinkStrip className="mb-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What homes for sale are in zip {zip}?
            </h2>
            <p className="text-slate-700 leading-relaxed">{zipGuide}</p>
            <p className="mt-4 text-slate-600 text-sm">
              Median list prices in Iron Mountain Ranch often land near {ironMountainRanch.medianPrice}{" "}
              with a typical range of {ironMountainRanch.priceRange} depending on village and week.
            </p>
          </section>

          <section className="mb-12" aria-labelledby="zip-villages-heading">
            <h2 id="zip-villages-heading" className="text-2xl font-bold text-slate-900 mb-4">
              Iron Mountain Ranch villages in {zip}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {villages.map((village) => (
                <Link
                  key={village.slug}
                  href={`/sub-communities/${village.slug}`}
                  className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-slate-900">{village.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{village.mlsSubdivision}</p>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{village.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <RealScoutListings />

          <p className="mt-10 text-center text-sm text-slate-500">
            <Link href={IRON_MOUNTAIN_RANCH_HUB_PATH} className="text-blue-600 hover:underline">
              ← Full Iron Mountain Ranch community guide
            </Link>
            {zip === "89131" ? (
              <>
                {" · "}
                <Link href="/89143-homes-for-sale" className="text-blue-600 hover:underline">
                  89143 homes for sale
                </Link>
              </>
            ) : (
              <>
                {" · "}
                <Link href="/89131-homes-for-sale" className="text-blue-600 hover:underline">
                  89131 homes for sale
                </Link>
              </>
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
