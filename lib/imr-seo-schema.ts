/**
 * Iron Mountain Ranch entity graph — Place / Residence children, breadcrumbs.
 * Chris Palmer-style @id stacking: hub community → village nodes.
 */

import type { SubCommunity } from "@/lib/iron-mountain-ranch";
import {
  getVillagePrimaryZip,
  ironMountainRanch,
  ironMountainRanchFaqs,
  IRON_MOUNTAIN_RANCH_HUB_PATH,
  subCommunities,
} from "@/lib/iron-mountain-ranch";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  type BreadcrumbItem,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";

export const IMR_COMMUNITY_PLACE_ID = `${absoluteUrl(IRON_MOUNTAIN_RANCH_HUB_PATH)}#community`;

export function imrVillagePlaceId(slug: string): string {
  return `${absoluteUrl(`/sub-communities/${slug}`)}#place`;
}

export function generateImrCommunityPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": IMR_COMMUNITY_PLACE_ID,
    name: `${ironMountainRanch.name}, Las Vegas, Nevada`,
    alternateName: [
      "Iron Mountain Ranch Las Vegas",
      "Iron Mountain Ranch Nevada",
      "Iron Mountain Ranch gated community",
    ],
    description: ironMountainRanch.description,
    url: absoluteUrl(IRON_MOUNTAIN_RANCH_HUB_PATH),
    geo: {
      "@type": "GeoCoordinates",
      latitude: ironMountainRanch.geo.latitude,
      longitude: ironMountainRanch.geo.longitude,
    },
    containedInPlace: {
      "@type": "City",
      name: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    additionalProperty: ironMountainRanch.zipCodes.map((zip) => ({
      "@type": "PropertyValue",
      name: "Zip code",
      value: zip,
    })),
  };
}

export function generateImrVillagePlaceSchema(village: SubCommunity, slug: string) {
  const zip = getVillagePrimaryZip(slug);
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    "@id": imrVillagePlaceId(slug),
    name: `${village.name}, Iron Mountain Ranch`,
    ...(village.alsoKnownAs?.length ? { alternateName: village.alsoKnownAs } : {}),
    description: village.description,
    url: absoluteUrl(`/sub-communities/${slug}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: zip,
      addressCountry: "US",
    },
    isPartOf: { "@id": IMR_COMMUNITY_PLACE_ID },
    containedInPlace: {
      "@type": "Place",
      "@id": IMR_COMMUNITY_PLACE_ID,
      name: ironMountainRanch.name,
    },
  };
}

export function buildImrHubBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Neighborhoods", url: "/neighborhoods" },
    { name: "Iron Mountain Ranch", url: IRON_MOUNTAIN_RANCH_HUB_PATH },
  ];
}

export function buildSubCommunitiesBreadcrumbs(): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Iron Mountain Ranch", url: IRON_MOUNTAIN_RANCH_HUB_PATH },
    { name: "Sub-Communities", url: "/sub-communities" },
  ];
}

export function buildImrVillageBreadcrumbs(villageName: string, slug: string): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Iron Mountain Ranch", url: IRON_MOUNTAIN_RANCH_HUB_PATH },
    { name: "Sub-Communities", url: "/sub-communities" },
    { name: villageName, url: `/sub-communities/${slug}` },
  ];
}

export function buildSubCommunitiesPageSchema() {
  return combineSchemas(
    generateBreadcrumbSchema(buildSubCommunitiesBreadcrumbs()),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Iron Mountain Ranch Sub-Communities",
      description: ironMountainRanch.description,
      isPartOf: { "@id": IMR_COMMUNITY_PLACE_ID },
      numberOfItems: subCommunities.length,
      url: absoluteUrl("/sub-communities"),
      itemListElement: subCommunities.map((village, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: village.name,
        url: absoluteUrl(`/sub-communities/${village.slug}`),
      })),
    },
    generateFAQSchema([...ironMountainRanchFaqs]),
  );
}

export function buildImrHubPageSchema() {
  return combineSchemas(
    generateBreadcrumbSchema(buildImrHubBreadcrumbs()),
    generateImrCommunityPlaceSchema(),
    generateFAQSchema([...ironMountainRanchFaqs]),
  );
}

export function buildImrVillagePageSchema(village: SubCommunity, slug: string) {
  return combineSchemas(
    generateBreadcrumbSchema(buildImrVillageBreadcrumbs(village.name, slug)),
    generateImrVillagePlaceSchema(village, slug),
  );
}
