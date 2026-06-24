/**
 * Iron Mountain Ranch — site identity, NAP, and primary navigation.
 * NAP must match Google Business Profile exactly.
 */

import { getSiteUrl } from "./site-url";

export const siteConfig = {
  name: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  shortSiteName: "Iron Mountain Ranch",
  fullName: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  tagline: "Gated Northwest Las Vegas Real Estate",
  brandLine:
    "Iron Mountain Ranch | Homes by Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties",
  brandName: "Berkshire Hathaway HomeServices",
  shortName: "BHHS",
  get url() {
    return getSiteUrl();
  },
  description:
    "Iron Mountain Ranch homes for sale in northwest Las Vegas (89131). Gated community homes with expert buyer and seller representation from Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.",
  primaryCommunity: "Iron Mountain Ranch",
  primaryZip: "89131",
};

export const agentInfo = {
  name: "Dr. Jan Duffy",
  title: "REALTOR®",
  license: "S.0197614.LLC",
  phone: "(702) 996-3758",
  phoneFormatted: "(702) 996-3758",
  phoneTel: "tel:+17029963758",
  /** Accessible name for icon-only phone links (nav, CTAs) */
  phoneCallLabel: "Call Dr. Jan Duffy at (702) 996-3758",
  email: "DrDuffy@IronMountainRanchLasVegas.com",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
};

export const officeInfo = {
  name: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
  address: {
    street: "6628 Sky Pointe Dr.",
    city: "Las Vegas",
    state: "NV",
    zip: "89131",
    full: "6628 Sky Pointe Dr., Las Vegas, NV 89131",
  },
  coordinates: {
    lat: 36.2905,
    lng: -115.2658,
  },
  phone: "(702) 996-3758",
  phoneTel: "tel:+17029963758",
};

/** Primary site navigation — URL architecture for Google + users */
export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/buy#imr-search", label: "Buy" },
  { href: "/sell#schedule-consultation", label: "Sell" },
  { href: "/home-valuation#schedule-consultation", label: "Home Value" },
  { href: "/sub-communities", label: "Sub-Communities" },
  { href: "/market-report", label: "Market Report" },
  { href: "/contact", label: "Contact" },
] as const;

// Market Statistics (Updated June 2026 — hyperlocal IMR + valley context)
export const marketStats = {
  lastUpdated: "June 2026",
  lasVegas: {
    medianPrice: 450000,
    medianPriceFormatted: "$450,000",
    yearOverYearChange: "+4.2%",
    daysOnMarket: 28,
    activeListings: 4850,
    closedSales: 2340,
    inventoryMonths: 2.1,
  },
  ironMountainRanch: {
    medianPrice: 550000,
    medianPriceFormatted: "$550,000",
    yearOverYearChange: "+3.8%",
    daysOnMarket: 32,
    priceRange: "$350,000 – $1,000,000+",
  },
  centennialHills: {
    medianPrice: 525000,
    medianPriceFormatted: "$525,000",
    yearOverYearChange: "+4.5%",
    daysOnMarket: 34,
  },
  henderson: {
    medianPrice: 485000,
    medianPriceFormatted: "$485,000",
    yearOverYearChange: "+5.1%",
    daysOnMarket: 24,
    activeListings: 1280,
  },
  summerlin: {
    medianPrice: 625000,
    medianPriceFormatted: "$625,000",
    yearOverYearChange: "+6.8%",
    daysOnMarket: 22,
    luxuryMedian: 1200000,
    luxuryMedianFormatted: "$1.2M",
  },
  northLasVegas: {
    medianPrice: 385000,
    medianPriceFormatted: "$385,000",
    yearOverYearChange: "+3.2%",
    daysOnMarket: 32,
  },
  southernHighlands: {
    medianPrice: 750000,
    medianPriceFormatted: "$750,000",
    yearOverYearChange: "+7.2%",
    daysOnMarket: 35,
  },
  luxury: {
    medianPrice: 1200000,
    medianPriceFormatted: "$1.2M",
    yearOverYearChange: "+8.5%",
    activeListings: 890,
    daysOnMarket: 45,
    pricePerSqFt: 385,
  },
};

export const agentStats = {
  servingSince: 2008,
  transactionsClosed: 500,
  volumeClosed: "$127M+",
  averageRating: 4.9,
  reviewCount: 200,
};

export const valuePropositions = {
  main: "When you work with a Berkshire Hathaway HomeServices agent, you're backed by a name synonymous with trust, ethical standards, and financial strength—the same principles that built Warren Buffett's empire.",
  trust:
    "Berkshire Hathaway HomeServices is the only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc. This means unmatched financial stability, ethical standards, and a global referral network of 50,000+ agents.",
  expertise:
    "Serving Las Vegas since 2008 with $127M+ in closed transactions, Dr. Jan Duffy combines deep local market knowledge with the resources of a global brand.",
};

export const neighborhoods = [
  {
    name: "Iron Mountain Ranch",
    slug: "iron-mountain-ranch",
    description:
      "Gated master-planned community in northwest Las Vegas with parks, ponds, and walking paths",
    medianPrice: "$550,000",
    highlights: ["Gated villages", "89131 zip", "Near 215 Beltway", "Red Rock access"],
  },
  {
    name: "Summerlin",
    slug: "summerlin",
    description: "Master-planned community with parks, trails, and top-rated schools",
    medianPrice: "$625,000",
    highlights: ["Red Rock views", "150+ parks", "Top schools", "Golf courses"],
  },
  {
    name: "Centennial Hills",
    slug: "centennial-hills",
    description: "Northwest Las Vegas community with mountain proximity",
    medianPrice: "$495,000",
    highlights: ["Mountain access", "Parks", "Shopping", "Family-friendly"],
  },
  {
    name: "Skye Canyon",
    slug: "skye-canyon",
    description: "Newer master-planned community in northwest Las Vegas",
    medianPrice: "$550,000",
    highlights: ["New homes", "Mountain views", "Modern amenities", "Great schools"],
  },
];

export const services = [
  {
    name: "Home Buying",
    slug: "buyers",
    description: "Expert guidance through every step of the home buying process",
    icon: "Home",
  },
  {
    name: "Home Selling",
    slug: "sellers",
    description: "Maximize your home's value with professional marketing and negotiation",
    icon: "TrendingUp",
  },
  {
    name: "Home Valuation",
    slug: "home-valuation",
    description: "Free property valuations using current market data",
    icon: "Calculator",
  },
  {
    name: "Market Analysis",
    slug: "market-report",
    description: "In-depth Las Vegas real estate market insights",
    icon: "BarChart",
  },
];

export const expertQuotes = {
  market: `"Iron Mountain Ranch offers strong value in northwest Las Vegas — gated living, family-friendly villages, and proximity to Red Rock without Summerlin price tags."`,
  buyers: `"My job isn't just to show you houses—it's to make sure you don't overpay, that you understand what you're buying, and that you're protected through every step of the transaction."`,
  sellers: `"Pricing your home correctly from day one is the single most important factor in getting top dollar. Overpriced homes sit, and every day on market costs you money."`,
};

export const commonFAQs = {
  general: [
    {
      question: "Who is the best realtor for Iron Mountain Ranch?",
      answer:
        "Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices Nevada Properties, specializes in Iron Mountain Ranch and northwest Las Vegas gated communities. Call (702) 996-3758 or email DrDuffy@IronMountainRanchLasVegas.com.",
    },
    {
      question: "What is the zip code for Iron Mountain Ranch?",
      answer:
        "Iron Mountain Ranch is primarily in zip code 89131, with some areas in 89143. School assignments depend on your specific address.",
    },
  ],
  buying: [
    {
      question: "How long does the home buying process take in Iron Mountain Ranch?",
      answer:
        "Typically 30–45 days from offer acceptance to closing. Cash purchases can close in as little as 7–14 days depending on financing and inspections.",
    },
  ],
  selling: [
    {
      question: "What is my Iron Mountain Ranch home worth?",
      answer:
        "Home values vary by village, upgrades, and lot position. Dr. Jan provides free CMAs using current MLS data for Iron Mountain Ranch comps.",
    },
  ],
};