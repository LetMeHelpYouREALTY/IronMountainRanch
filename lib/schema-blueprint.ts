/**
 * JSON-LD schema blueprint for ironmountainranchlasvegas.com
 * Types: LocalBusiness, RealEstateAgent, Neighborhood, FAQPage, ListingService
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { buildOpeningHoursSpecification } from "./google-business-profile";
import { ironMountainRanch, ironMountainRanchFaqs } from "./iron-mountain-ranch";
import { agentInfo, officeInfo, siteConfig } from "./site-config";
import { absoluteUrl, getGbpAggregateRating } from "./site-url";

const ORG_ID = `${absoluteUrl("/")}#organization`;
const AGENT_ID = `${absoluteUrl("/")}#agent`;
const LOCAL_BUSINESS_ID = `${absoluteUrl("/")}#localbusiness`;
const NEIGHBORHOOD_ID = `${absoluteUrl("/sub-communities")}#neighborhood`;
const LISTING_SERVICE_ID = `${absoluteUrl("/buy")}#listing-service`;

const postalAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: officeInfo.address.street,
  addressLocality: officeInfo.address.city,
  addressRegion: officeInfo.address.state,
  postalCode: officeInfo.address.zip,
  addressCountry: "US",
};

const geo = {
  "@type": "GeoCoordinates" as const,
  latitude: officeInfo.coordinates.lat,
  longitude: officeInfo.coordinates.lng,
};

const openingHours = buildOpeningHoursSpecification();

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    email: agentInfo.email,
    image: absoluteUrl("/images/agent/dr-jan-duffy.jpg"),
    priceRange: "$$",
    address: postalAddress,
    geo,
    openingHoursSpecification: openingHours,
    areaServed: {
      "@type": "Neighborhood",
      name: ironMountainRanch.name,
      containedInPlace: { "@type": "City", name: "Las Vegas", addressRegion: "NV" },
    },
    sameAs: [
      "https://www.facebook.com/drjanduffy",
      "https://www.instagram.com/drjanduffy",
      "https://www.linkedin.com/in/drjanduffy",
    ],
  };
}

export function generateRealEstateAgentSchema() {
  const aggregateRating = getGbpAggregateRating();
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": AGENT_ID,
    name: agentInfo.name,
    description: `${agentInfo.title} specializing in Iron Mountain Ranch and northwest Las Vegas gated communities. License ${agentInfo.license}.`,
    url: absoluteUrl("/"),
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    email: agentInfo.email,
    image: absoluteUrl("/images/agent/dr-jan-duffy.jpg"),
    worksFor: {
      "@type": "Organization",
      name: agentInfo.brokerage,
    },
    parentOrganization: { "@id": LOCAL_BUSINESS_ID },
    address: postalAddress,
    geo,
    openingHoursSpecification: openingHours,
    areaServed: ironMountainRanch.zipCodes.map((zip) => ({
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: zip,
      addressCountry: "US",
    })),
    ...(aggregateRating ? { aggregateRating } : {}),
    sameAs: [
      "https://www.facebook.com/drjanduffy",
      "https://www.instagram.com/drjanduffy",
      "https://www.linkedin.com/in/drjanduffy",
    ],
  };
}

export function generateNeighborhoodSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Neighborhood",
    "@id": NEIGHBORHOOD_ID,
    name: ironMountainRanch.name,
    description: ironMountainRanch.description,
    url: absoluteUrl("/sub-communities"),
    containedInPlace: {
      "@type": "City",
      name: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ironMountainRanch.geo.latitude,
      longitude: ironMountainRanch.geo.longitude,
    },
  };
}

export function generateListingServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": LISTING_SERVICE_ID,
    name: "Iron Mountain Ranch Listing Service",
    serviceType: "Real Estate Listing Search",
    description:
      "MLS listing search and buyer representation for Iron Mountain Ranch homes for sale in Las Vegas 89131.",
    url: absoluteUrl("/buy"),
    provider: { "@id": AGENT_ID },
    areaServed: {
      "@id": NEIGHBORHOOD_ID,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free buyer consultation for Iron Mountain Ranch home search",
    },
  };
}

export function generateFaqPageSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }> = ironMountainRanchFaqs,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Full @graph blueprint for root layout */
export function generateSiteSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateLocalBusinessSchema(),
      generateRealEstateAgentSchema(),
      generateNeighborhoodSchema(),
      generateListingServiceSchema(),
      generateFaqPageSchema(),
    ],
  };
}

export { ORG_ID, AGENT_ID, LOCAL_BUSINESS_ID, NEIGHBORHOOD_ID, LISTING_SERVICE_ID };
