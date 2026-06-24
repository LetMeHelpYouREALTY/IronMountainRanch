/**
 * Hyperlocal hero imagery for Iron Mountain Ranch Las Vegas (89131 / 89143).
 * Visual themes informed by Parallel research: KB gated villages, Sheep Range views,
 * community parks/ponds, and estate enclaves in northwest Las Vegas.
 */

import type { SubCommunity } from "@/lib/iron-mountain-ranch";

export type HeroImageKey =
  | "gated-village"
  | "village-streetscape"
  | "community-park"
  | "estates"
  | "seller-home"
  | "sheep-range";

export type PageHeroContent = {
  imageKey: HeroImageKey;
  /** Descriptive alt for SEO + a11y */
  alt: string;
  /** Short hyperlocal badge above the headline */
  locationBadge: string;
  /** Optional second line (MLS village, zip, etc.) */
  locationDetail?: string;
};

const HERO_IMAGE_SRC: Record<HeroImageKey, string> = {
  "gated-village": "/images/hero/imr-gated-village-hero.webp",
  "village-streetscape": "/images/hero/imr-village-streetscape-hero.webp",
  "community-park": "/images/hero/imr-community-park-hero.webp",
  estates: "/images/hero/imr-estates-hero.webp",
  "seller-home": "/images/hero/imr-seller-home-hero.webp",
  "sheep-range": "/images/hero/imr-sheep-range-hero.webp",
};

export function getHeroImageSrc(key: HeroImageKey): string {
  return HERO_IMAGE_SRC[key];
}

const IMR_BADGE = "Iron Mountain Ranch · Northwest Las Vegas";
const ZIP_BADGE = "89131 & 89143";

/** Stable pick by slug so each village keeps a consistent hero variant */
function villageHeroKey(slug: string): HeroImageKey {
  const keys: HeroImageKey[] = [
    "gated-village",
    "village-streetscape",
    "community-park",
    "estates",
    "sheep-range",
  ];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % keys.length;
  }
  return keys[hash] ?? "gated-village";
}

export function getHeroForSubCommunity(village: SubCommunity): PageHeroContent {
  const isEstate =
    village.slug === "iron-mountain-estates" || village.slug === "quarterhorse-estate";
  const imageKey: HeroImageKey = isEstate
    ? "estates"
    : village.slug === "bradley"
      ? "village-streetscape"
      : villageHeroKey(village.slug);

  const alias =
    village.alsoKnownAs && village.alsoKnownAs.length > 0
      ? ` · Also known as ${village.alsoKnownAs[0]}`
      : "";

  return {
    imageKey,
    alt: `${village.name} homes in Iron Mountain Ranch, northwest Las Vegas — gated desert community with mountain views near zip ${village.slug.includes("estate") || village.mlsSubdivision.includes("89143") ? "89143" : "89131"}`,
    locationBadge: `${village.name} · ${IMR_BADGE}`,
    locationDetail: `MLS: ${village.mlsSubdivision}${alias} · ${ZIP_BADGE}`,
  };
}

type RouteHeroRule = {
  test: (path: string) => boolean;
  hero: PageHeroContent;
};

const ROUTE_HEROES: RouteHeroRule[] = [
  {
    test: (p) => p === "/",
    hero: {
      imageKey: "gated-village",
      alt: "Gated Iron Mountain Ranch master-planned community in northwest Las Vegas with Sheep Range mountain views, zip codes 89131 and 89143",
      locationBadge: "Homes by Dr. Jan Duffy · Iron Mountain Ranch",
      locationDetail: `Gated KB villages · ~1,700 homes · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/buy",
    hero: {
      imageKey: "village-streetscape",
      alt: "Tree-lined gated village street in Iron Mountain Ranch northwest Las Vegas — MLS homes for sale in 89131",
      locationBadge: "Buy in Iron Mountain Ranch",
      locationDetail: `Village-level MLS search · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/sell",
    hero: {
      imageKey: "seller-home",
      alt: "Iron Mountain Ranch home for sale in northwest Las Vegas gated community — list with Dr. Jan Duffy",
      locationBadge: "Sell Your Iron Mountain Ranch Home",
      locationDetail: `Free CMA · Village comps · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/sub-communities",
    hero: {
      imageKey: "community-park",
      alt: "Iron Mountain Ranch community park with ponds and walking paths in northwest Las Vegas 89131",
      locationBadge: "Iron Mountain Ranch Villages",
      locationDetail: `14 gated sub-communities · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p.startsWith("/sub-communities/"),
    hero: {
      imageKey: "gated-village",
      alt: "Iron Mountain Ranch village homes for sale in northwest Las Vegas",
      locationBadge: IMR_BADGE,
      locationDetail: ZIP_BADGE,
    },
  },
  {
    test: (p) => p === "/home-valuation",
    hero: {
      imageKey: "seller-home",
      alt: "What is your Iron Mountain Ranch home worth — northwest Las Vegas 89131 village-level valuation",
      locationBadge: "Iron Mountain Ranch Home Value",
      locationDetail: `Live MLS comps by village · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p.startsWith("/market"),
    hero: {
      imageKey: "sheep-range",
      alt: "Northwest Las Vegas housing market with Sheep Range backdrop — Iron Mountain Ranch and Centennial Hills area",
      locationBadge: "Iron Mountain Ranch Market",
      locationDetail: `Northwest Las Vegas · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/luxury-homes" || p.includes("luxury"),
    hero: {
      imageKey: "estates",
      alt: "Iron Mountain Estates and premium homes in Iron Mountain Ranch northwest Las Vegas 89143",
      locationBadge: "Iron Mountain Ranch Estates",
      locationDetail: `Gated estate homes · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/contact",
    hero: {
      imageKey: "gated-village",
      alt: "Contact Dr. Jan Duffy for Iron Mountain Ranch real estate at 6628 Sky Pointe Dr, Las Vegas NV 89131",
      locationBadge: "Iron Mountain Ranch REALTOR®",
      locationDetail: "6628 Sky Pointe Dr · Las Vegas NV 89131",
    },
  },
  {
    test: (p) => p === "/about" || p === "/services",
    hero: {
      imageKey: "sheep-range",
      alt: "Dr. Jan Duffy — Iron Mountain Ranch and northwest Las Vegas real estate specialist",
      locationBadge: IMR_BADGE,
      locationDetail: `Berkshire Hathaway HomeServices · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/relocation" || p.startsWith("/buyers"),
    hero: {
      imageKey: "village-streetscape",
      alt: "Relocating to Iron Mountain Ranch gated community in northwest Las Vegas Nevada",
      locationBadge: "Move to Iron Mountain Ranch",
      locationDetail: `Centennial Hills area · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p.startsWith("/sellers"),
    hero: {
      imageKey: "seller-home",
      alt: "Sell your Iron Mountain Ranch home — northwest Las Vegas village expert Dr. Jan Duffy",
      locationBadge: "Iron Mountain Ranch Sellers",
      locationDetail: `HOA & village guidance · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/investment-properties",
    hero: {
      imageKey: "village-streetscape",
      alt: "Iron Mountain Ranch investment properties in northwest Las Vegas gated villages 89131",
      locationBadge: "IMR Investment Properties",
      locationDetail: `Rental demand · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/new-construction",
    hero: {
      imageKey: "gated-village",
      alt: "KB Home villages in Iron Mountain Ranch northwest Las Vegas — resale and newer phases",
      locationBadge: "Iron Mountain Ranch Homes",
      locationDetail: `KB master plan since 2002 · ${ZIP_BADGE}`,
    },
  },
  {
    test: (p) => p === "/google-business",
    hero: {
      imageKey: "gated-village",
      alt: "Iron Mountain Ranch Real Estate office of Dr. Jan Duffy in northwest Las Vegas",
      locationBadge: "Iron Mountain Ranch | Homes by Dr. Jan Duffy",
      locationDetail: "Google Business Profile · 89131",
    },
  },
  {
    test: (p) => p === "/las-vegas-zip-code-map",
    hero: {
      imageKey: "sheep-range",
      alt: "Las Vegas Valley zip code map — northwest Las Vegas and Iron Mountain Ranch 89131 and 89143",
      locationBadge: "Las Vegas Valley Zip Codes",
      locationDetail: "89131 & 89143 · Iron Mountain Ranch",
    },
  },
  {
    test: (p) => p === "/faq",
    hero: {
      imageKey: "community-park",
      alt: "Iron Mountain Ranch FAQ — gated villages, HOAs, and schools in northwest Las Vegas",
      locationBadge: IMR_BADGE,
      locationDetail: ZIP_BADGE,
    },
  },
  {
    test: (p) => p.startsWith("/neighborhoods"),
    hero: {
      imageKey: "sheep-range",
      alt: "Northwest Las Vegas neighborhoods including Iron Mountain Ranch near Centennial Hills and Sheep Range",
      locationBadge: "Northwest Las Vegas · Iron Mountain Ranch",
      locationDetail: ZIP_BADGE,
    },
  },
];

const DEFAULT_HERO: PageHeroContent = {
  imageKey: "gated-village",
  alt: "Iron Mountain Ranch gated community homes for sale in northwest Las Vegas Nevada 89131 and 89143",
  locationBadge: IMR_BADGE,
  locationDetail: ZIP_BADGE,
};

export function getHeroForPath(path: string): PageHeroContent {
  const normalized = path.split("?")[0]?.replace(/\/$/, "") || "/";
  const clean = normalized === "" ? "/" : normalized;

  if (clean.startsWith("/neighborhoods/")) {
    const slug = clean.replace("/neighborhoods/", "");
    const label = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const isImr = slug === "iron-mountain-ranch";
    return {
      imageKey: isImr ? "gated-village" : "sheep-range",
      alt: isImr
        ? "Iron Mountain Ranch gated master-planned community in northwest Las Vegas 89131 and 89143"
        : `${label} Las Vegas homes near Iron Mountain Ranch — northwest valley real estate`,
      locationBadge: isImr
        ? "Iron Mountain Ranch · Northwest Las Vegas"
        : `${label} · Near Iron Mountain Ranch`,
      locationDetail: `${ZIP_BADGE} · Dr. Jan Duffy`,
    };
  }

  if (clean.startsWith("/55-plus-communities")) {
    return {
      imageKey: "community-park",
      alt: "Iron Mountain Ranch homeowners exploring Las Vegas 55+ active adult communities with Dr. Jan Duffy",
      locationBadge: "Iron Mountain Ranch · 55+ Advisory",
      locationDetail: `Northwest Las Vegas specialist · ${ZIP_BADGE}`,
    };
  }

  for (const rule of ROUTE_HEROES) {
    if (rule.test(clean)) return rule.hero;
  }
  return DEFAULT_HERO;
}
