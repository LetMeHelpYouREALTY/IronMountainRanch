/**
 * Las Vegas Valley regional market comparison — June 2026 marketing snapshot.
 * Iron Mountain Ranch figures are hyperlocal to 89131/89143 gated villages.
 * Metro rows align with site market-report; verify live MLS before offers.
 *
 * Research (Parallel Search, June 2026): Redfin IMR closed median ~$425K–$450K;
 * active list medians in 89131 ~$452K–$667K by source; northwest family homes
 * often trade $550K–$725K per Centennial Hills / IMR buyer guides.
 */

import type { SubCommunity } from "@/lib/iron-mountain-ranch";

export const REGIONAL_MARKET_LAST_UPDATED = "June 2026";

export type RegionalMarketArea = {
  id: string;
  name: string;
  medianPrice: number;
  medianPriceFormatted: string;
  yearOverYearChange: string;
  daysOnMarket: number;
  /** Hyperlocal emphasis on IMR sub-community pages */
  highlight?: boolean;
  scopeNote?: string;
};

export const ironMountainRanchMarket: RegionalMarketArea = {
  id: "iron-mountain-ranch",
  name: "Iron Mountain Ranch (89131 & 89143)",
  medianPrice: 550_000,
  medianPriceFormatted: "$550,000",
  yearOverYearChange: "+3.8%",
  daysOnMarket: 32,
  highlight: true,
  scopeNote: "Gated KB villages & estate enclaves — village-dependent",
};

/** Northwest + valley context for IMR buyer guides */
export const regionalMarketComparison: RegionalMarketArea[] = [
  ironMountainRanchMarket,
  {
    id: "centennial-hills",
    name: "Centennial Hills (neighbor)",
    medianPrice: 525_000,
    medianPriceFormatted: "$525,000",
    yearOverYearChange: "+4.5%",
    daysOnMarket: 34,
    scopeNote: "Northwest Las Vegas master plans adjacent to IMR",
  },
  {
    id: "las-vegas",
    name: "Las Vegas (Overall)",
    medianPrice: 450_000,
    medianPriceFormatted: "$450,000",
    yearOverYearChange: "+4.2%",
    daysOnMarket: 28,
  },
  {
    id: "henderson",
    name: "Henderson",
    medianPrice: 485_000,
    medianPriceFormatted: "$485,000",
    yearOverYearChange: "+5.1%",
    daysOnMarket: 24,
  },
  {
    id: "summerlin",
    name: "Summerlin",
    medianPrice: 625_000,
    medianPriceFormatted: "$625,000",
    yearOverYearChange: "+6.8%",
    daysOnMarket: 22,
  },
  {
    id: "north-las-vegas",
    name: "North Las Vegas",
    medianPrice: 385_000,
    medianPriceFormatted: "$385,000",
    yearOverYearChange: "+3.2%",
    daysOnMarket: 32,
  },
  {
    id: "southern-highlands",
    name: "Southern Highlands",
    medianPrice: 750_000,
    medianPriceFormatted: "$750,000",
    yearOverYearChange: "+7.2%",
    daysOnMarket: 35,
  },
  {
    id: "luxury",
    name: "Luxury ($1M+)",
    medianPrice: 1_200_000,
    medianPriceFormatted: "$1,200,000",
    yearOverYearChange: "+8.5%",
    daysOnMarket: 45,
  },
];

/** Metro-only cards for market-report (excludes IMR + Centennial Hills duplicate) */
export const metroMarketComparison: RegionalMarketArea[] =
  regionalMarketComparison.filter(
    (area) =>
      area.id !== "iron-mountain-ranch" && area.id !== "centennial-hills",
  );

export function getRegionalMarketArea(id: string): RegionalMarketArea {
  const area = regionalMarketComparison.find((a) => a.id === id);
  if (!area) {
    throw new Error(`Missing regional market data for id: ${id}`);
  }
  return area;
}

export function getVillageMarketInsight(village: SubCommunity): string {
  const isEstate =
    village.slug === "iron-mountain-estates" ||
    village.slug === "quarterhorse-estate" ||
    village.slug === "bradley";

  const zipHint = village.mlsSubdivision.includes("89143") ||
    village.slug === "iron-mountain-estates"
    ? "89143"
    : "89131";

  if (isEstate) {
    return `${village.name} trades above the typical Iron Mountain Ranch village median—often $700,000–$1.2M+ in current MLS marketing for larger gated homes in zip ${zipHint}. Compared with Southern Highlands ($750,000 median) or Summerlin ($625,000), estate sections inside IMR can offer gated northwest living with Sheep Range views and quicker 215 Beltway access. Days on market vary by price tier; Dr. Jan tracks live comps for ${village.mlsSubdivision} before you tour.`;
  }

  if (village.slug === "village-4") {
    return `Village 4 (Wolf Creek) is often among the more approachable price points in Iron Mountain Ranch—recent northwest 89131 listings have started near $400,000 while the community-wide marketing median sits around $550,000. That positions Wolf Creek below the broader Las Vegas valley median ($450,000) on entry-level inventory but still inside a gated KB village with LMA-maintained parks. Typical marketing DOM in IMR is about 32 days versus 28 days valley-wide.`;
  }

  return `${village.name} (${village.mlsSubdivision}) sits in northwest Las Vegas zip ${zipHint} inside the Iron Mountain Ranch master plan—gated KB villages with parks and ponds between Centennial Hills and Aliante. Marketing snapshots for IMR cluster near $550,000 with roughly 32 days on market, compared with $525,000 in neighboring Centennial Hills and $625,000 in Summerlin. Village-level list prices change weekly; Dr. Jan filters MLS by your exact subdivision before showings.`;
}

export function getSubCommunitiesMarketIntro(): string {
  return `Iron Mountain Ranch buyers compare gated village resale in 89131 and 89143 against the wider Las Vegas Valley. Northwest family homes here often trade between the valley median ($450,000) and Summerlin ($625,000), with estate villages pushing toward Southern Highlands pricing. The table below is a June 2026 marketing snapshot—pair it with live MLS search on the Buy page or a village-specific CMA from Dr. Jan Duffy.`;
}
