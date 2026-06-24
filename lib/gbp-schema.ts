// Google Business Profile page content + JSON-LD for ironmountainranchlasvegas.com
// NAP must match GBP exactly (see lib/google-business-profile.ts).

import { ironMountainRanch } from "./iron-mountain-ranch";
import {
  buildOpeningHoursSpecification,
  googleBusinessProfile,
  gbpServiceAreas,
} from "./google-business-profile";
import { getAgentHeadshotUrl } from "./agent-photos";
import { agentInfo, officeInfo, siteConfig } from "./site-config";
import { absoluteUrl, getGbpAggregateRating } from "./site-url";

export const businessInfo = {
  name: googleBusinessProfile.businessName,
  address: {
    streetAddress: officeInfo.address.street,
    addressLocality: officeInfo.address.city,
    addressRegion: officeInfo.address.state,
    postalCode: officeInfo.address.zip,
    addressCountry: "US",
  },
  phone: {
    display: agentInfo.phoneFormatted,
    tel: agentInfo.phoneTel.replace("tel:", ""),
  },
  email: agentInfo.email,
  get url() {
    return siteConfig.url;
  },
  license: agentInfo.license,
  priceRange: "$$",
  hours: googleBusinessProfile.hours,
  geo: {
    latitude: officeInfo.coordinates.lat,
    longitude: officeInfo.coordinates.lng,
  },
  serviceAreas: [...gbpServiceAreas],
  categories: {
    primary: googleBusinessProfile.primaryCategory,
    secondary: [...googleBusinessProfile.secondaryCategories],
  },
  services: [
    { name: "Iron Mountain Ranch Buyer Representation", description: "MLS search, village tours, and offer strategy in gated northwest Las Vegas villages." },
    { name: "Iron Mountain Ranch Home Sales", description: "Pricing, staging guidance, and marketing for IMR resale listings." },
    { name: "Iron Mountain Ranch Home Valuation", description: "CMAs using current village comps in 89131 and 89143." },
    { name: "Gated Community Specialist", description: "HOA, LMA, and village-specific guidance across IMR sub-communities." },
    { name: "Northwest Las Vegas Relocation", description: "Neighborhood comparisons near Centennial Hills, Skye Canyon, and Aliante." },
    { name: "New Construction & Resale Guidance", description: "KB Home villages and resale homes across the IMR master plan." },
  ],
  socialProfiles: [
    "https://www.facebook.com/drjanduffy",
    "https://www.instagram.com/drjanduffy",
    "https://www.linkedin.com/in/drjanduffy",
  ],
};

export const gbpDescription = {
  whoWeAre: `${siteConfig.name} is the staffed office for Dr. Jan Duffy, REALTOR® with ${agentInfo.brokerage}. The practice focuses on buyer and seller representation inside Iron Mountain Ranch — a gated KB Home master-planned community in northwest Las Vegas (89131 and 89143) with village parks, ponds, and walking paths.`,

  whatWeDo: `Dr. Jan helps buyers compare Iron Mountain Ranch villages, understand HOA and landscape maintenance (LMA) costs, and write competitive offers with current MLS data. Sellers receive village-specific pricing, prep guidance, and Berkshire Hathaway HomeServices marketing. Consultations are available in person at the Kyle Canyon–area office (${officeInfo.address.full}), by phone at ${agentInfo.phoneFormatted}, or through the site's scheduling tools.`,

  whereWeServe: `Primary service area: Iron Mountain Ranch and surrounding northwest Las Vegas communities including Centennial Hills, Silverstone Ranch, Skye Canyon, and Aliante. Zip codes served: ${ironMountainRanch.zipCodes.join(" and ")}. Office hours: Monday–Friday 9:00 AM–6:00 PM, Saturday 10:00 AM–4:00 PM, Sunday by appointment.`,
};

export const gbpFAQs = [
  {
    question: "What is the Google Business Profile name for this office?",
    answer: `The registered business name is "${siteConfig.name}" — matching signage and this website. Per Google's 2026 guidelines, the name does not include extra keywords or neighborhood stuffing.`,
  },
  {
    question: "What is the office address and phone for Iron Mountain Ranch real estate help?",
    answer: `${officeInfo.address.full}. Call ${agentInfo.phoneFormatted} or email ${agentInfo.email}.`,
  },
  {
    question: "What zip codes does Iron Mountain Ranch cover?",
    answer: `Iron Mountain Ranch spans ${ironMountainRanch.zipCodes.join(" and ")} in northwest Las Vegas. School assignments and HOA fees depend on your specific village and lot.`,
  },
  {
    question: "Is Iron Mountain Ranch a gated community?",
    answer: "Yes. Iron Mountain Ranch is organized into gated villages with controlled access, community parks, and shared desert landscaping maintained through village HOAs and the landscape maintenance association.",
  },
  {
    question: "How do I search Iron Mountain Ranch homes for sale?",
    answer: `Use the MLS search on ${siteConfig.url}/buy or call ${agentInfo.phoneFormatted} for a curated list by village and floor plan.`,
  },
  {
    question: "How do I schedule a consultation with Dr. Jan Duffy?",
    answer: `Book online through the Calendly consultation on any page, call ${agentInfo.phoneFormatted}, or visit ${officeInfo.address.full} during posted business hours.`,
  },
  {
    question: "What are the office hours?",
    answer: "Monday–Friday 9:00 AM–6:00 PM, Saturday 10:00 AM–4:00 PM, Sunday by appointment.",
  },
  {
    question: "Does this website match the Google Business Profile?",
    answer: `Yes. Name, address, phone, hours, and website URL on this page mirror the Google Business Profile for ${siteConfig.name}. Update the GBP dashboard and this site together when anything changes.`,
  },
];

export function generateLocalBusinessSchema() {
  const aggregateRating = getGbpAggregateRating();

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${absoluteUrl("/google-business")}#gbp-office`,
    name: businessInfo.name,
    image: getAgentHeadshotUrl(),
    url: absoluteUrl("/google-business"),
    telephone: businessInfo.phone.tel,
    email: businessInfo.email,
    priceRange: businessInfo.priceRange,
    address: {
      "@type": "PostalAddress",
      ...businessInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(),
    areaServed: businessInfo.serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Iron Mountain Ranch Real Estate Services",
      itemListElement: businessInfo.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    ...(aggregateRating ? { aggregateRating } : {}),
    sameAs: businessInfo.socialProfiles,
    parentOrganization: {
      "@type": "Organization",
      name: agentInfo.brokerage,
    },
  };
}

export function generateFAQSchema(faqs = gbpFAQs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/google-business")}#faq`,
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
