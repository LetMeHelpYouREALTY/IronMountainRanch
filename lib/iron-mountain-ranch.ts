/**
 * Iron Mountain Ranch sub-communities (villages) within the master-planned community.
 */

export type SubCommunity = {
  slug: string;
  name: string;
  description: string;
  highlights: string[];
};

export const ironMountainRanch = {
  name: "Iron Mountain Ranch",
  slug: "iron-mountain-ranch",
  zipCodes: ["89131", "89143"],
  description:
    "Iron Mountain Ranch is a master-planned, gated community in northwest Las Vegas featuring wooded parks, ponds, walking paths, and affordably priced 3–4 bedroom single-family homes near the 215 Beltway.",
  medianPrice: "$550,000",
  medianPriceNote: "Buyer-favorable market as of 2026",
  priceRange: "$300,000 – $800,000",
  homeCount: 1700,
  villageCount: 9,
  yearBuiltRange: "2002 – present",
  geo: {
    latitude: 36.2812,
    longitude: -115.2847,
  },
  containedIn: "Las Vegas, NV",
  nearbyCommunities: [
    "Silverstone Ranch",
    "Centennial Hills",
    "Lynbrook",
    "Los Prados",
    "Elkhorn Springs",
  ],
  amenities: [
    "Gated neighborhoods",
    "Wooded community parks",
    "Ponds and walking paths",
    "Proximity to 215 Beltway",
    "15 minutes to Red Rock Canyon",
  ],
  hoaNote:
    "HOA fees vary by village; Dr. Jan provides exact dues and coverage before you write an offer.",
} as const;

export const subCommunities: SubCommunity[] = [
  {
    slug: "village-1-a",
    name: "Iron Mountain Ranch Village 1-A",
    description:
      "Established village with mature landscaping and gated access in northwest Las Vegas 89131.",
    highlights: ["Gated entry", "Established lots", "Near community parks"],
  },
  {
    slug: "village-3",
    name: "Iron Mountain Ranch Village 3",
    description:
      "Popular village featuring tree-lined streets and access to Iron Mountain Ranch walking paths.",
    highlights: ["Wooded streets", "Pond views", "3–4 bedroom homes"],
  },
  {
    slug: "village-5",
    name: "Iron Mountain Ranch Village 5",
    description:
      "Family-friendly village with strong resale demand and convenient 215 Beltway access.",
    highlights: ["Family floor plans", "Gated", "Quick freeway access"],
  },
  {
    slug: "village-7",
    name: "Iron Mountain Ranch Village 7",
    description:
      "Desirable village with larger lots and proximity to Centennial Hills amenities.",
    highlights: ["Larger lots", "Gated", "Centennial Hills nearby"],
  },
  {
    slug: "village-9",
    name: "Iron Mountain Ranch Village 9",
    description:
      "Active resale market with a mix of single- and two-story homes in gated Iron Mountain Ranch.",
    highlights: ["Mixed floor plans", "Gated", "Strong schools access"],
  },
  {
    slug: "village-11",
    name: "Iron Mountain Ranch Village 11",
    description:
      "Newer-phase village with updated builds and scenic northwest Las Vegas views.",
    highlights: ["Newer builds", "Gated", "Mountain views"],
  },
  {
    slug: "bradley",
    name: "Iron Mountain Ranch / Bradley",
    description:
      "Bradley section of Iron Mountain Ranch offering value-oriented homes in 89131.",
    highlights: ["Affordable entry", "Gated options", "89131 zip"],
  },
];

export function getSubCommunity(slug: string): SubCommunity | undefined {
  return subCommunities.find((v) => v.slug === slug);
}

export const ironMountainRanchFaqs = [
  {
    question: "What is the median home price in Iron Mountain Ranch?",
    answer:
      "Iron Mountain Ranch homes typically range from the $300s to $800s, with a median near $550,000 in 2026. Email DrDuffy@IronMountainRanchLasVegas.com or call (702) 996-3758 for a live comp report.",
  },
  {
    question: "Is Iron Mountain Ranch a gated community?",
    answer:
      "Yes. Iron Mountain Ranch includes multiple gated villages with controlled access. Each village has its own HOA and amenity package. Dr. Jan Duffy explains gate access and dues before you tour.",
  },
  {
    question: "What zip code is Iron Mountain Ranch in?",
    answer:
      "Iron Mountain Ranch is primarily in the 89131 zip code, with some areas in 89143. The office at 6628 Sky Pointe Dr., Las Vegas NV 89131 serves buyers and sellers throughout the community.",
  },
  {
    question: "What sub-communities are in Iron Mountain Ranch?",
    answer:
      "Iron Mountain Ranch has nine villages including Village 1-A, Village 3, Village 5, Village 7, Village 9, Village 11, and the Bradley section. Browse each sub-community at ironmountainranchlasvegas.com/sub-communities.",
  },
  {
    question: "Who is the realtor for Iron Mountain Ranch homes?",
    answer:
      "Dr. Jan Duffy, REALTOR® (License S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties. Contact DrDuffy@IronMountainRanchLasVegas.com or call (702) 996-3758.",
  },
  {
    question: "How do I search Iron Mountain Ranch listings?",
    answer:
      "Use the MLS search on the Buy page or contact Dr. Jan Duffy for village-specific alerts in Iron Mountain Ranch before homes hit public portals.",
  },
] as const;
