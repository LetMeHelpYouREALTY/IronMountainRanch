/**
 * Per-page metadata keywords — Iron Mountain Ranch Las Vegas (June 2026).
 * Phrases sourced from Parallel Search of MLS/community pages (Realtor.com, Redfin,
 * Shelter Realty, competitor agent sites) and tracked GSC/SERP clusters.
 */

import type { SubCommunity } from "@/lib/iron-mountain-ranch";
import { getSubCommunity } from "@/lib/iron-mountain-ranch";

/** Always safe on IMR-branded pages (keep NAP/agent terms out of keyword stuffing). */
export const IMR_BASE_KEYWORDS = [
  "Iron Mountain Ranch",
  "Iron Mountain Ranch Las Vegas",
  "Iron Mountain Ranch Nevada",
  "Iron Mountain Ranch real estate",
  "northwest Las Vegas gated community",
  "89131",
  "89143",
  "Kyle Canyon Las Vegas",
  "Homes by Dr Jan Duffy",
] as const;

/** Head terms competitors rank for (Shelter, Luxury Home Pro, Leslie, etc.). */
export const IMR_HEAD_KEYWORDS = [
  "iron mountain ranch",
  "iron mountain ranch las vegas",
  "iron mountain ranch nevada",
  "iron mountain las vegas",
  "iron mountain nevada",
  "iron mountain ranch homes for sale",
  "iron mountain ranch houses for sale",
  "houses for sale in iron mountain ranch",
  "iron mountain ranch las vegas nevada",
  "iron mountain ranch gated community",
] as const;

const MAX_KEYWORDS = 20;

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 && withSlash.endsWith("/")
    ? withSlash.slice(0, -1)
    : withSlash;
}

function dedupeKeywords(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out.slice(0, MAX_KEYWORDS);
}

/** Village / subdivision phrases from MLS labels and buyer search variants. */
export function buildVillageKeywords(village: SubCommunity): string[] {
  const phrases = [
    village.name,
    `${village.name} homes for sale`,
    `${village.name} Las Vegas`,
    village.mlsSubdivision,
    `${village.mlsSubdivision} homes for sale`,
    "Iron Mountain Ranch village homes",
    "Iron Mountain Ranch gated homes",
  ];
  if (village.alsoKnownAs?.length) {
    for (const alias of village.alsoKnownAs) {
      phrases.push(alias, `${alias} Iron Mountain Ranch`, `${alias} Las Vegas`);
    }
  }
  if (village.slug === "iron-mountain-estates") {
    phrases.push(
      "Iron Mountain Estates",
      "Iron Mountain Estate",
      "Iron Mountain Estates Las Vegas",
      "Iron Mountain Estates homes for sale",
      "iron mountain estates",
    );
  }
  if (village.slug === "village-4") {
    phrases.push("Wolf Creek Iron Mountain Ranch", "Wolf Creek Las Vegas 89131");
  }
  if (village.slug === "village-3") {
    phrases.push("Meadow Ridge Iron Mountain Ranch", "Meadow Ridge Las Vegas");
  }
  if (village.slug === "village-7") {
    phrases.push("Classics at Iron Mountain Ranch", "Classics Iron Mountain Ranch");
  }
  if (village.slug === "quarterhorse-estate") {
    phrases.push("Quarterhorse Estate Las Vegas", "Quarterhorse Estate homes for sale");
  }
  if (village.slug === "bradley") {
    phrases.push("Bradley Ranch Las Vegas", "Bradley Ranch Iron Mountain Ranch");
  }
  return phrases;
}

/** Route-specific keyword sets (merged with base + extras). */
const ROUTE_KEYWORDS: Record<string, readonly string[]> = {
  "/": [
    ...IMR_HEAD_KEYWORDS,
    "Iron Mountain Ranch homes for sale",
    "Iron Mountain Ranch KB Home",
    "Centennial Hills Iron Mountain Ranch",
  ],
  "/buy": [
    "Iron Mountain Ranch houses for sale",
    "houses for sale in Iron Mountain Ranch",
    "Iron Mountain Ranch MLS search",
    "Iron Mountain Ranch buyer agent",
    "gated homes 89131",
    "gated homes 89143",
  ],
  "/sell": [
    "sell Iron Mountain Ranch home",
    "Iron Mountain Ranch home value",
    "list Iron Mountain Ranch house",
    "Iron Mountain Ranch seller agent",
    "Iron Mountain Ranch CMA",
  ],
  "/home-valuation": [
    "Iron Mountain Ranch home value",
    "Iron Mountain Ranch CMA",
    "what is my Iron Mountain Ranch home worth",
    "Iron Mountain Ranch appraisal",
  ],
  "/contact": [
    "Iron Mountain Ranch realtor",
    "Dr Jan Duffy Iron Mountain Ranch",
    "Iron Mountain Ranch real estate agent",
    "Kyle Canyon real estate office",
  ],
  "/about": [
    "Dr Jan Duffy realtor",
    "Iron Mountain Ranch specialist",
    "Berkshire Hathaway Iron Mountain Ranch",
  ],
  "/google-business": [
    "Iron Mountain Ranch office",
    "Iron Mountain Ranch Google Business Profile",
    "9312 Grand Gate St real estate",
  ],
  "/faq": [
    "Iron Mountain Ranch FAQ",
    "Iron Mountain Ranch HOA",
    "Iron Mountain Ranch villages",
  ],
  "/sub-communities": [
    "Iron Mountain Ranch villages",
    "Iron Mountain Ranch sub-communities",
    "Iron Mountain Ranch gated villages",
    "Iron Mountain Estates",
    "Bradley Ranch",
    "Quarterhorse Estate",
  ],
  "/neighborhoods/iron-mountain-ranch": [
    ...IMR_HEAD_KEYWORDS,
    "Iron Mountain Estates",
    "Iron Mountain Ranch HOA",
    "Iron Mountain Ranch LMA",
    "northwest Las Vegas master planned community",
  ],
  "/neighborhoods": [
    "Las Vegas neighborhoods",
    "northwest Las Vegas communities",
    "Iron Mountain Ranch vs Summerlin",
  ],
  "/neighborhoods/centennial-hills": [
    "Centennial Hills homes for sale",
    "Centennial Hills vs Iron Mountain Ranch",
    "northwest Las Vegas homes",
  ],
  "/neighborhoods/skye-canyon": [
    "Skye Canyon homes for sale",
    "Skye Canyon vs Iron Mountain Ranch",
    "northwest Las Vegas new construction",
  ],
  "/neighborhoods/summerlin": [
    "Summerlin homes for sale",
    "Summerlin vs Iron Mountain Ranch",
  ],
  "/neighborhoods/southern-highlands": [
    "Southern Highlands Las Vegas",
    "Southern Highlands homes for sale",
  ],
  "/neighborhoods/mountains-edge": [
    "Mountains Edge Las Vegas",
    "Mountains Edge homes for sale",
  ],
  "/neighborhoods/henderson": [
    "Henderson NV homes for sale",
    "Henderson real estate",
  ],
  "/neighborhoods/green-valley": [
    "Green Valley Henderson homes",
    "Green Valley real estate",
  ],
  "/neighborhoods/inspirada": [
    "Inspirada Henderson homes",
    "Inspirada real estate",
  ],
  "/neighborhoods/north-las-vegas": [
    "North Las Vegas homes for sale",
    "North Las Vegas real estate",
  ],
  "/neighborhoods/the-ridges": [
    "The Ridges Summerlin homes",
    "Summerlin luxury homes",
  ],
  "/buyers": [
    "Iron Mountain Ranch buyers",
    "buy home Iron Mountain Ranch",
    "first time buyer northwest Las Vegas",
  ],
  "/buyers/first-time-buyers": [
    "first time home buyer Las Vegas",
    "Iron Mountain Ranch first time buyer",
    "gated community first home 89131",
  ],
  "/buyers/california-relocator": [
    "California to Las Vegas relocation",
    "move to Iron Mountain Ranch",
    "Nevada relocation realtor",
  ],
  "/buyers/luxury-homes-las-vegas": [
    "luxury homes Iron Mountain Ranch",
    "Iron Mountain Estates luxury",
    "northwest Las Vegas luxury homes",
  ],
  "/sellers": [
    "sell home Las Vegas",
    "Iron Mountain Ranch listing agent",
  ],
  "/sellers/relocation": [
    "sell home relocation Las Vegas",
    "Iron Mountain Ranch relocation seller",
  ],
  "/sellers/downsizing": [
    "downsize Iron Mountain Ranch",
    "sell large home Las Vegas",
  ],
  "/sellers/move-up": [
    "move up buyer Las Vegas",
    "sell and buy Iron Mountain Ranch",
  ],
  "/sellers/divorce-probate": [
    "divorce real estate Las Vegas",
    "probate home sale Las Vegas",
    "Iron Mountain Ranch probate sale",
  ],
  "/market-report": [
    "Iron Mountain Ranch market report",
    "northwest Las Vegas housing market",
    "89131 home prices",
  ],
  "/market-insights": [
    "Las Vegas market insights",
    "Iron Mountain Ranch market trends",
  ],
  "/market-update": [
    "Las Vegas market update",
    "Iron Mountain Ranch home prices",
  ],
  "/luxury-homes": [
    "luxury homes Iron Mountain Ranch",
    "Iron Mountain Estates homes",
    "Quarterhorse Estate luxury",
  ],
  "/new-construction": [
    "KB Home Iron Mountain Ranch",
    "new construction northwest Las Vegas",
    "Iron Mountain Ranch resale homes",
  ],
  "/investment-properties": [
    "Iron Mountain Ranch investment property",
    "Las Vegas rental homes 89131",
  ],
  "/relocation": [
    "relocate to Las Vegas",
    "Iron Mountain Ranch relocation",
    "moving to northwest Las Vegas",
  ],
  "/listings": [
    "Iron Mountain Ranch MLS listings",
    "Iron Mountain Ranch homes for sale",
  ],
  "/services": [
    "Iron Mountain Ranch real estate services",
    "buyer seller representation Las Vegas",
  ],
  "/why-berkshire-hathaway": [
    "Berkshire Hathaway Nevada Properties",
    "BHHS Las Vegas realtor",
    "Iron Mountain Ranch BHHS",
  ],
  "/las-vegas-zip-code-map": [
    "Las Vegas zip code map",
    "89131 map",
    "89143 map",
    "Iron Mountain Ranch zip codes",
  ],
  "/55-plus-communities": [
    "55 plus communities Las Vegas",
    "active adult Las Vegas",
    "Iron Mountain Ranch not 55 plus",
  ],
  "/security-policy": [
    "ironmountainranchlasvegas.com security",
  ],
};

const NEIGHBORHOOD_SLUG_LABELS: Record<string, string> = {
  "centennial-hills": "Centennial Hills",
  "green-valley": "Green Valley",
  "henderson": "Henderson",
  "inspirada": "Inspirada",
  "iron-mountain-ranch": "Iron Mountain Ranch",
  "mountains-edge": "Mountains Edge",
  "north-las-vegas": "North Las Vegas",
  "skye-canyon": "Skye Canyon",
  "southern-highlands": "Southern Highlands",
  "summerlin": "Summerlin",
  "the-ridges": "The Ridges",
};

const FIFTY_FIVE_SLUG_LABELS: Record<string, string> = {
  "del-webb-lake-las-vegas": "Del Webb Lake Las Vegas",
  "heritage-stonebridge": "Heritage at Stonebridge",
  "solera-anthem": "Solera Anthem",
  "sun-city-aliante": "Sun City Aliante",
  "sun-city-anthem": "Sun City Anthem",
  "sun-city-summerlin": "Sun City Summerlin",
  "trilogy-summerlin": "Trilogy Summerlin",
};

function inferKeywordsFromPath(path: string): string[] {
  const subMatch = path.match(/^\/sub-communities\/([^/]+)$/);
  if (subMatch) {
    const village = getSubCommunity(subMatch[1]);
    if (village) return buildVillageKeywords(village);
    const label = subMatch[1].replace(/-/g, " ");
    return [`${label} Iron Mountain Ranch`, `${label} homes for sale`];
  }

  const neighborhoodMatch = path.match(/^\/neighborhoods\/([^/]+)$/);
  if (neighborhoodMatch) {
    const label =
      NEIGHBORHOOD_SLUG_LABELS[neighborhoodMatch[1]] ??
      neighborhoodMatch[1].replace(/-/g, " ");
    return [
      `${label} homes for sale`,
      `${label} Las Vegas`,
      `${label} real estate`,
      "compare Iron Mountain Ranch",
    ];
  }

  const fiftyFiveMatch = path.match(/^\/55-plus-communities\/([^/]+)$/);
  if (fiftyFiveMatch) {
    const label =
      FIFTY_FIVE_SLUG_LABELS[fiftyFiveMatch[1]] ??
      fiftyFiveMatch[1].replace(/-/g, " ");
    return [
      `${label} homes for sale`,
      `${label} Las Vegas`,
      "55 plus Las Vegas",
      "active adult community Las Vegas",
    ];
  }

  return [];
}

/**
 * Resolve keywords for any marketing route. Merges site base + route map + extras.
 * Called automatically from buildPageMetadata — every page gets keywords.
 */
export function resolvePageKeywords(path: string, extra?: string[]): string[] {
  const normalized = normalizePath(path);
  const routeSpecific = ROUTE_KEYWORDS[normalized] ?? inferKeywordsFromPath(normalized);

  return dedupeKeywords([
    ...IMR_BASE_KEYWORDS,
    ...routeSpecific,
    ...(extra ?? []),
  ]);
}
