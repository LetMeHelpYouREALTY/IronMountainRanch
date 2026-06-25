/**
 * Palmer-style topical entity pages — breadcrumbs, FAQ filters, zip village lists.
 */

import {
  getVillagePrimaryZip,
  ironMountainRanchFaqs,
  IRON_MOUNTAIN_RANCH_HUB_PATH,
  subCommunities,
  type SubCommunity,
} from "@/lib/iron-mountain-ranch";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  type BreadcrumbItem,
} from "@/lib/schema";
import { IMR_COMMUNITY_PLACE_ID } from "@/lib/imr-seo-schema";

export type ImrFaq = { question: string; answer: string };

export function buildImrTopicBreadcrumbs(
  topicLabel: string,
  topicPath: string,
): BreadcrumbItem[] {
  return [
    { name: "Home", url: "/" },
    { name: "Iron Mountain Ranch", url: IRON_MOUNTAIN_RANCH_HUB_PATH },
    { name: topicLabel, url: topicPath },
  ];
}

export function buildImrTopicPageSchema(
  topicLabel: string,
  topicPath: string,
  faqs?: readonly ImrFaq[],
) {
  const parts = [generateBreadcrumbSchema(buildImrTopicBreadcrumbs(topicLabel, topicPath))];
  if (faqs && faqs.length > 0) {
    parts.push(generateFAQSchema([...faqs]));
  }
  return combineSchemas(...parts);
}

export function pickImrFaqs(
  match: (question: string) => boolean,
): ImrFaq[] {
  return ironMountainRanchFaqs.filter((f) => match(f.question)).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));
}

export function getVillagesForZip(zip: "89131" | "89143"): SubCommunity[] {
  return subCommunities.filter((v) => getVillagePrimaryZip(v.slug) === zip);
}

/** Visible topical guides linked from the IMR hub (Palmer silo map). */
export const IMR_TOPICAL_GUIDES = [
  {
    href: "/89131-homes-for-sale",
    label: "89131 homes for sale",
    description: "Numbered villages, Bradley Ranch, Quarterhorse Estate",
  },
  {
    href: "/89143-homes-for-sale",
    label: "89143 homes for sale",
    description: "Iron Mountain Estates and Kyle Canyon corridor",
  },
  {
    href: "/iron-mountain-ranch-hoa",
    label: "HOA & LMA guide",
    description: "Village HOAs and landscape maintenance",
  },
  {
    href: "/iron-mountain-ranch-schools",
    label: "Schools (CCSD)",
    description: "Campus assignments near IMR",
  },
  {
    href: "/kb-home-iron-mountain-ranch",
    label: "KB Home resale guide",
    description: "Builder villages from 2002 forward",
  },
  {
    href: "/iron-mountain-ranch-reviews",
    label: "Community reviews",
    description: "What buyers ask about IMR",
  },
  {
    href: "/iron-mountain-ranch-vs-spring-mountain-ranch",
    label: "vs Spring Mountain Ranch",
    description: "Different community — not the same HOA",
  },
  {
    href: "/iron-mountain-ranch-vs-centennial-hills",
    label: "vs Centennial Hills",
    description: "Northwest neighbor comparison",
  },
  {
    href: "/iron-mountain-ranch-vs-summerlin",
    label: "vs Summerlin",
    description: "Gated IMR vs master-planned west side",
  },
] as const;

export { IMR_COMMUNITY_PLACE_ID, IRON_MOUNTAIN_RANCH_HUB_PATH };
