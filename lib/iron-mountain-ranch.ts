/**
 * Iron Mountain Ranch sub-communities within the KB Home master-planned community.
 * Display names are buyer-friendly; mlsSubdivision matches GLVAR / LVR MLS labels (June 2026).
 */

import { agentInfo } from "@/lib/site-config";
import { communityPlusCode } from "@/lib/plus-codes";

export type SubCommunity = {
  slug: string;
  /** Buyer-friendly title for H1s and cards */
  name: string;
  /** Exact GLVAR / LVR MLS subdivision string */
  mlsSubdivision: string;
  /** Builder or legacy marketing names buyers may search */
  alsoKnownAs?: string[];
  description: string;
  highlights: string[];
};

export const ironMountainRanch = {
  name: "Iron Mountain Ranch",
  slug: "iron-mountain-ranch",
  zipCodes: ["89131", "89143"],
  description:
    "Iron Mountain Ranch is a KB Home master-planned community in northwest Las Vegas with gated villages, community parks, ponds, and walking paths. Single-family homes—mostly 3–4 bedrooms—sit on larger lots near the 215 Beltway with Gass Peak and the Sheep Range as a backdrop.",
  medianPrice: "$550,000",
  medianPriceNote: "List prices vary by village and week; ask Dr. Jan for a live MLS snapshot.",
  priceRange: "$350,000 – $1,000,000+",
  homeCount: 1703,
  villageCount: 14,
  yearBuiltRange: "2002 – present",
  geo: {
    latitude: communityPlusCode.latitude,
    longitude: communityPlusCode.longitude,
  },
  plusCode: communityPlusCode.compound,
  plusCodeLocality: "Kyle Canyon, Las Vegas, NV",
  containedIn: "Las Vegas, NV",
  nearbyCommunities: [
    "Silverstone Ranch",
    "Centennial Hills",
    "Aliante",
    "Lynbrook",
    "Los Prados",
  ],
  amenities: [
    "Gated villages with controlled access",
    "Community parks and open space",
    "Ponds and walking paths",
    "Landscape Maintenance Association (LMA) common areas",
    "Quick access to US-95 and the 215 Beltway",
    "Minutes to Floyd Lamb Park and Red Rock Canyon",
    "Clark County School District",
  ],
  hoaNote:
    "HOA and LMA dues vary by village and lot; Dr. Jan confirms exact fees and coverage before you tour or write an offer.",
  landscapeNote:
    "Villages participate in a Landscape Maintenance Association that maintains shared desert landscaping, parks, and trails.",
} as const;

export const subCommunities: SubCommunity[] = [
  {
    slug: "village-1-a",
    name: "Village 1-A",
    mlsSubdivision: "Iron Mountain Ranch-Village 1-A",
    description:
      "Established gated village in 89131 with mature landscaping and larger two-story floor plans—common MLS range roughly 2,900+ sq ft.",
    highlights: ["Gated entry", "Mature lots", "Larger floor plans"],
  },
  {
    slug: "village-2",
    name: "Village 2 — Lamplight Manor",
    mlsSubdivision: "Iron Mountain Ranch-Village 2",
    alsoKnownAs: ["Lamplight Manor"],
    description:
      "Gated village with family-sized KB floor plans and strong northwest Las Vegas resale activity near Centennial Hills amenities.",
    highlights: ["Gated", "Family floor plans", "89131"],
  },
  {
    slug: "village-3",
    name: "Village 3 — Meadow Ridge",
    mlsSubdivision: "Iron Mountain Ranch-Village 3",
    alsoKnownAs: ["Meadow Ridge"],
    description:
      "Tree-lined streets and walking-path access make Village 3 a steady choice for move-up buyers in Iron Mountain Ranch.",
    highlights: ["Wooded streets", "Walking paths", "3–4 bedroom homes"],
  },
  {
    slug: "village-4",
    name: "Village 4 — Wolf Creek",
    mlsSubdivision: "Iron Mountain Ranch-Village 4",
    alsoKnownAs: ["Wolf Creek"],
    description:
      "Value-oriented gated village with efficient single- and two-story plans—often among the community’s more approachable price points.",
    highlights: ["Gated", "Entry-level pricing", "Active resale"],
  },
  {
    slug: "village-5",
    name: "Village 5",
    mlsSubdivision: "Iron Mountain Ranch-Village 5",
    description:
      "Family-friendly gated village with convenient 215 Beltway access and popular 2,700+ sq ft KB layouts.",
    highlights: ["Family floor plans", "Gated", "215 Beltway access"],
  },
  {
    slug: "village-6",
    name: "Village 6 — Caramel Canyon",
    mlsSubdivision: "Iron Mountain Ranch-Village 6",
    alsoKnownAs: ["Caramel Canyon"],
    description:
      "Mid-phase gated village within Iron Mountain Ranch offering a balance of lot size, privacy, and northwest Las Vegas convenience.",
    highlights: ["Gated", "Suburban lots", "Centennial Hills nearby"],
  },
  {
    slug: "village-7",
    name: "Village 7 — Classics at Iron Mountain Ranch",
    mlsSubdivision: "Iron Mountain Ranch-Village 7",
    alsoKnownAs: ["Classics at Iron Mountain Ranch", "Classics At Iron Mountain Ranch"],
    description:
      "Desirable village with efficient 2,000+ sq ft plans and proximity to shopping and services along the Centennial Hills corridor.",
    highlights: ["Efficient plans", "Gated", "Shopping nearby"],
  },
  {
    slug: "village-8",
    name: "Village 8 — Granite Falls",
    mlsSubdivision: "Iron Mountain Ranch-Village 8",
    alsoKnownAs: ["Granite Falls", "Granite Falls 2", "Granite Falls 3"],
    description:
      "Gated village in the Iron Mountain Ranch master plan with consistent KB architecture and community park access.",
    highlights: ["Gated", "Community parks", "89131"],
  },
  {
    slug: "village-9",
    name: "Village 9",
    mlsSubdivision: "Iron Mountain Ranch-Village 9",
    description:
      "Active resale market with a mix of single- and two-story homes in gated Iron Mountain Ranch—popular with relocating families.",
    highlights: ["Mixed floor plans", "Gated", "Strong schools access"],
  },
  {
    slug: "village-10",
    name: "Village 10",
    mlsSubdivision: "Iron Mountain Ranch-Village 10",
    description:
      "Newer-phase gated village featuring updated KB builds and contemporary desert landscaping in northwest Las Vegas.",
    highlights: ["Newer builds", "Gated", "Updated landscaping"],
  },
  {
    slug: "village-11",
    name: "Village 11",
    mlsSubdivision: "Iron Mountain Ranch-Village 11",
    description:
      "Among the community’s larger homesites with expansive floor plans—often 3,500+ sq ft in current MLS marketing.",
    highlights: ["Larger homes", "Gated", "Mountain views"],
  },
  {
    slug: "iron-mountain-estates",
    name: "Iron Mountain Estates",
    mlsSubdivision: "Iron Mountain Estate",
    alsoKnownAs: ["Iron Mountain Estate"],
    description:
      "Gated estate enclave within Iron Mountain Ranch—primarily in 89143—with larger luxury homes. MLS listings commonly show 5,000–6,200+ sq ft floor plans, dual primary suites, and cul-de-sac lots.",
    highlights: [
      "Gated estate enclave",
      "89143",
      "5,000+ sq ft homes",
      "Inside Iron Mountain Ranch",
    ],
  },
  {
    slug: "bradley",
    name: "Bradley Ranch",
    mlsSubdivision: "Bradley Ranch",
    description:
      "Bradley Ranch is a gated section within the Iron Mountain Ranch master plan with approachable resale price points in 89131.",
    highlights: ["Value-oriented", "Gated", "89131"],
  },
  {
    slug: "quarterhorse-estate",
    name: "Quarterhorse Estate",
    mlsSubdivision: "Quarterhorse Estate",
    description:
      "Premium gated enclave inside Iron Mountain Ranch (89131) with larger single-family homes—often 3,200+ sq ft in current MLS marketing.",
    highlights: ["Gated estate section", "Larger floor plans", "89131"],
  },
];

export function getSubCommunity(slug: string): SubCommunity | undefined {
  return subCommunities.find((v) => v.slug === slug);
}

const phone = agentInfo.phoneFormatted;
const email = agentInfo.email;

export const ironMountainRanchFaqs = [
  {
    question: "How many sub-communities are in Iron Mountain Ranch?",
    answer: `Iron Mountain Ranch is a master-planned community of gated villages in northwest Las Vegas (89131 and 89143). MLS listings commonly reference numbered villages (Village 1-A through Village 11), Iron Mountain Estates, Bradley Ranch, and Quarterhorse Estate—about 1,700 homes total. Several villages also carry builder marketing names such as Wolf Creek (Village 4), Meadow Ridge (Village 3), and Classics at Iron Mountain Ranch (Village 7). Browse each guide at ironmountainranchlasvegas.com/sub-communities or call ${phone}.`,
  },
  {
    question: "Are Iron Mountain Ranch villages gated?",
    answer:
      "Yes. Iron Mountain Ranch villages are gated residential neighborhoods with controlled access. Each village may have its own HOA dues and amenity package in addition to the community Landscape Maintenance Association. Dr. Jan Duffy explains gate access and fees before you tour.",
  },
  {
    question: "What is the median home price in Iron Mountain Ranch?",
    answer: `List prices vary by village and change weekly with MLS inventory. Recent marketing snapshots for Iron Mountain Ranch often land near the $500,000–$700,000 range, with entry points lower in villages such as Village 4 (Wolf Creek) and premium homes above $900,000 in estates sections. Email ${email} or call ${phone} for a live comp report—not an automated estimate.`,
  },
  {
    question: "What zip codes are Iron Mountain Ranch sub-communities in?",
    answer:
      "Most Iron Mountain Ranch villages are in zip code 89131, with Iron Mountain Estates and some estate parcels in 89143. School assignments and tax districts depend on your specific address—verify before you buy.",
  },
  {
    question: "Who is the realtor for Iron Mountain Ranch villages?",
    answer: `Dr. Jan Duffy, REALTOR® (License S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties. Contact ${email} or call ${phone} for village-specific MLS searches and showing coordination.`,
  },
  {
    question: "What is Iron Mountain Estates?",
    answer: `Iron Mountain Estates is a gated estate neighborhood within the Iron Mountain Ranch master plan—mostly in zip code 89143. It is distinct from the numbered KB villages and typically features larger single-family homes (often 5,000+ sq ft in MLS marketing). MLS may list the subdivision as "Iron Mountain Estate" (singular) while buyers commonly say "Iron Mountain Estates." Call ${phone} for active estate inventory.`,
  },
  {
    question: "What is Quarterhorse Estate?",
    answer: `Quarterhorse Estate is a gated enclave within Iron Mountain Ranch in zip code 89131 with larger single-family homes—separate from the numbered villages in MLS. Listings often show 3,200+ sq ft floor plans. Call ${phone} for current Quarterhorse Estate inventory.`,
  },
  {
    question: "How do I search listings by Iron Mountain Ranch village?",
    answer:
      "Use the MLS search on the Buy page for all Iron Mountain Ranch homes, open any village guide below for context, or ask Dr. Jan for alerts filtered to a specific MLS subdivision before homes hit public portals.",
  },
] as const;
