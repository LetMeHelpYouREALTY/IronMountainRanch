/**
 * Hyperlocal copy for ironmountainranchlasvegas.com — Iron Mountain Ranch
 * gated villages (89131 & 89143) and sub-community guides.
 *
 * Facts sourced via Parallel Search (June 2026): LMA established 2002,
 * ~1,703 homes, KB Home master plan, village gates, parks/ponds, northwest
 * Las Vegas between Centennial Hills and Aliante; Sheep Range views; US-95/215 access.
 */

import { ironMountainRanch, subCommunities } from "@/lib/iron-mountain-ranch";
import { marketStats } from "@/lib/site-config";
import { regionalMarketComparison } from "@/lib/lv-regional-market";

export const IMR_HYPERLOCAL_FACTS = {
  homeCount: ironMountainRanch.homeCount,
  established: "2002",
  zips: ironMountainRanch.zipCodes.join(" & "),
  median: marketStats.ironMountainRanch.medianPriceFormatted,
  valleyMedian: marketStats.lasVegas.medianPriceFormatted,
  summerlinMedian: marketStats.summerlin.medianPriceFormatted,
  centennialHillsMedian: marketStats.centennialHills.medianPriceFormatted,
  priceBand: "$475,000 – $1,050,000",
  activeBand: "$550,000 – $725,000",
  nearby: ironMountainRanch.nearbyCommunities.join(", "),
} as const;

const NEIGHBORHOOD_NAMES: Record<string, string> = {
  summerlin: "Summerlin",
  henderson: "Henderson",
  "green-valley": "Green Valley",
  "the-ridges": "The Ridges",
  "southern-highlands": "Southern Highlands",
  "north-las-vegas": "North Las Vegas",
  "skye-canyon": "Skye Canyon",
  "centennial-hills": "Centennial Hills",
  inspirada: "Inspirada",
  "mountains-edge": "Mountains Edge",
};

export type ImrPageContextData = {
  heading: string;
  paragraphs: string[];
  variant: "default" | "comparison";
  comparisonArea?: string;
  showVillageLinks: boolean;
  showMarketSnippet: boolean;
};

const EXEMPT_EXACT = new Set([
  "/",
  "/buy",
  "/sell",
  "/home-valuation",
  "/sub-communities",
  "/google-business",
  "/las-vegas-zip-code-map",
  "/security-policy",
  "/market-report",
  "/neighborhoods/iron-mountain-ranch",
]);

export function shouldShowImrPageContext(path: string): boolean {
  if (EXEMPT_EXACT.has(path)) return false;
  if (path.startsWith("/sub-communities/")) return false;
  return true;
}

function comparisonParagraph(areaName: string, slug: string): string {
  const areaStat = regionalMarketComparison.find((a) => a.id === slug);

  const areaMedian = areaStat?.medianPriceFormatted ?? "varies by submarket";
  const areaDom = areaStat ? `${areaStat.daysOnMarket} days` : "market-dependent";

  return `${areaName} (${areaMedian} median, ~${areaDom} on market) is a common comparison for Iron Mountain Ranch buyers in northwest Las Vegas. Iron Mountain Ranch offers gated KB villages in ${IMR_HYPERLOCAL_FACTS.zips} with a marketing median near ${IMR_HYPERLOCAL_FACTS.median}—often between the broader valley (${IMR_HYPERLOCAL_FACTS.valleyMedian}) and premium Summerlin (${IMR_HYPERLOCAL_FACTS.summerlinMedian}). Dr. Jan Duffy filters MLS by village (Village 1-A through 11, Iron Mountain Estates, Bradley Ranch, Quarterhorse Estate) so you compare apples-to-apples before you tour ${areaName}.`;
}

const PAGE_INTROS: Record<string, Omit<ImrPageContextData, "showVillageLinks" | "showMarketSnippet">> = {
  "/buyers": {
    heading: "Buying inside Iron Mountain Ranch gated villages",
    paragraphs: [
      `Iron Mountain Ranch is a KB Home master plan with ~${IMR_HYPERLOCAL_FACTS.homeCount.toLocaleString()} homes across gated villages in zip ${IMR_HYPERLOCAL_FACTS.zips}. Most resale activity clusters ${IMR_HYPERLOCAL_FACTS.activeBand} for 2,200–3,400 sq ft family homes with LMA-maintained parks, ponds, and walking paths.`,
      `Before you write an offer, confirm village HOA/LMA dues, gate access, and school assignments for your exact address. Dr. Jan runs village-level MLS searches—not generic valley alerts.`,
    ],
    variant: "default",
  },
  "/sellers": {
    heading: "Selling your Iron Mountain Ranch home",
    paragraphs: [
      `Village and floor plan drive pricing inside Iron Mountain Ranch. Marketing snapshots show a community median near ${IMR_HYPERLOCAL_FACTS.median} with typical DOM around ${marketStats.ironMountainRanch.daysOnMarket} days—village-dependent.`,
      `Dr. Jan pulls closed comps by MLS subdivision (e.g., Iron Mountain Ranch-Village 4 / Wolf Creek vs Iron Mountain Estate in 89143) before listing your home.`,
    ],
    variant: "default",
  },
  "/listings": {
    heading: "MLS listings for Iron Mountain Ranch villages",
    paragraphs: [
      `Start with Iron Mountain Ranch and northwest 89131/89143 inventory—gated KB villages with Sheep Range views and quick 215 Beltway access. Browse by village on our sub-community guides or search all IMR homes on the Buy page.`,
    ],
    variant: "default",
  },
  "/contact": {
    heading: "Questions about Iron Mountain Ranch villages?",
    paragraphs: [
      `Dr. Jan Duffy specializes in Iron Mountain Ranch and northwest Las Vegas gated communities. Ask about village gates, HOA/LMA fees, 89131 vs 89143 schools, or a private tour of Wolf Creek, Meadow Ridge, Iron Mountain Estates, and other MLS subdivisions.`,
    ],
    variant: "default",
  },
  "/relocation": {
    heading: "Relocating to Iron Mountain Ranch (89131 & 89143)",
    paragraphs: [
      `Iron Mountain Ranch gives northwest Las Vegas families gated KB villages, parks, and pond trails—often ${IMR_HYPERLOCAL_FACTS.activeBand} for move-in-ready resale—without Summerlin price tags. US-95 and the 215 Beltway connect to Centennial Hills, Aliante, Floyd Lamb Park, and Red Rock Canyon.`,
      `California and out-of-state buyers use Dr. Jan for video tours, village comparisons, and remote offer strategy on Iron Mountain Ranch MLS subdivisions.`,
    ],
    variant: "default",
  },
  "/market-insights": {
    heading: "Northwest Las Vegas context for Iron Mountain Ranch",
    paragraphs: [
      `Valley-wide trends below apply to Iron Mountain Ranch resale, but village-level medians differ: entry villages may start near $400,000 while estate sections in 89143 stretch past $900,000. Pair macro insights with our June 2026 IMR comparison on sub-community pages.`,
    ],
    variant: "default",
  },
  "/market-update": {
    heading: "Weekly pulse — Iron Mountain Ranch & northwest 89131",
    paragraphs: [
      `This weekly snapshot covers the Las Vegas Valley; for Iron Mountain Ranch village comps, DOM, and list-to-sale ratios, request a live MLS pull for your target subdivision (Village 1-A through 11, Bradley Ranch, Quarterhorse Estate, Iron Mountain Estates).`,
    ],
    variant: "default",
  },
};

export function getImrPageContext(path: string): ImrPageContextData | null {
  if (!shouldShowImrPageContext(path)) return null;

  const neighborhoodMatch = path.match(/^\/neighborhoods\/([^/]+)$/);
  if (neighborhoodMatch) {
    const slug = neighborhoodMatch[1];
    if (slug === "iron-mountain-ranch") return null;
    const areaName = NEIGHBORHOOD_NAMES[slug] ?? slug.replace(/-/g, " ");
    return {
      heading: `How ${areaName} compares to Iron Mountain Ranch`,
      paragraphs: [comparisonParagraph(areaName, slug)],
      variant: "comparison",
      comparisonArea: areaName,
      showVillageLinks: true,
      showMarketSnippet: true,
    };
  }

  const intro = PAGE_INTROS[path];
  if (intro) {
    return {
      ...intro,
      showVillageLinks: true,
      showMarketSnippet: path.startsWith("/market"),
    };
  }

  if (path.startsWith("/buyers/") || path.startsWith("/sellers/") || path.startsWith("/55-plus")) {
    return {
      heading: "Your Iron Mountain Ranch home comes first",
      paragraphs: [
        `This guide supports buyers and sellers at Iron Mountain Ranch—gated KB villages in ${IMR_HYPERLOCAL_FACTS.zips}. Dr. Jan Duffy's primary focus is village-level MLS expertise (median near ${IMR_HYPERLOCAL_FACTS.median}); use the links below to explore Wolf Creek, Meadow Ridge, Iron Mountain Estates, and every numbered village.`,
      ],
      variant: "default",
      showVillageLinks: true,
      showMarketSnippet: false,
    };
  }

  if (
    path === "/luxury-homes" ||
    path === "/investment-properties" ||
    path === "/new-construction" ||
    path === "/services"
  ) {
    return {
      heading: "Iron Mountain Ranch — northwest Las Vegas focus",
      paragraphs: [
        `Iron Mountain Estates and premium village homes in 89143 often trade ${IMR_HYPERLOCAL_FACTS.priceBand} with gated access and larger lots. Dr. Jan positions every service—luxury, investment, or new-build guidance—against live Iron Mountain Ranch MLS data first.`,
      ],
      variant: "default",
      showVillageLinks: true,
      showMarketSnippet: true,
    };
  }

  if (path === "/neighborhoods") {
    return {
      heading: "Iron Mountain Ranch is home base",
      paragraphs: [
        `This site specializes in Iron Mountain Ranch gated villages (~${IMR_HYPERLOCAL_FACTS.homeCount.toLocaleString()} homes, established ${IMR_HYPERLOCAL_FACTS.established}). Other Las Vegas areas below are for comparison only—start with village guides and live 89131/89143 search.`,
      ],
      variant: "default",
      showVillageLinks: true,
      showMarketSnippet: true,
    };
  }

  return {
    heading: "Iron Mountain Ranch — gated villages in northwest Las Vegas",
    paragraphs: [
      `KB Home's Iron Mountain Ranch master plan spans gated villages in ${IMR_HYPERLOCAL_FACTS.zips} with parks, ponds, and LMA landscaping. Marketing medians cluster near ${IMR_HYPERLOCAL_FACTS.median} between Centennial Hills (${IMR_HYPERLOCAL_FACTS.centennialHillsMedian}) and Summerlin (${IMR_HYPERLOCAL_FACTS.summerlinMedian}).`,
    ],
    variant: "default",
    showVillageLinks: true,
    showMarketSnippet: false,
  };
}

export const featuredVillageLinks = subCommunities.slice(0, 6).map((v) => ({
  name: v.name,
  href: `/sub-communities/${v.slug}`,
}));
