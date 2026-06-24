/**
 * Iron Mountain Ranch hero assets — stored in Cloudflare R2 (`listing-photos` bucket).
 * Local fallbacks in public/images/hero/ for dev when R2 is unreachable.
 */

export type HeroImageKey =
  | "gated-village"
  | "village-streetscape"
  | "community-park"
  | "estates"
  | "seller-home"
  | "sheep-range";

export type ImrHeroImageAsset = {
  key: HeroImageKey;
  filename: string;
  /** R2 object key inside bucket `listing-photos` */
  r2Key: string;
  /** Vercel/public fallback path */
  localPath: string;
  width: number;
  height: number;
};

const R2_HERO_PREFIX = "iron-mountain-ranch/heroes";

function heroAsset(
  key: HeroImageKey,
  filename: string,
  width = 1920,
  height = 1080,
): ImrHeroImageAsset {
  return {
    key,
    filename,
    r2Key: `${R2_HERO_PREFIX}/${filename}`,
    localPath: `/images/hero/${filename}`,
    width,
    height,
  };
}

export const IMR_HERO_IMAGES: ImrHeroImageAsset[] = [
  heroAsset("gated-village", "imr-gated-village-hero.webp"),
  heroAsset("village-streetscape", "imr-village-streetscape-hero.webp"),
  heroAsset("community-park", "imr-community-park-hero.webp"),
  heroAsset("estates", "imr-estates-hero.webp"),
  heroAsset("seller-home", "imr-seller-home-hero.webp"),
  heroAsset("sheep-range", "imr-sheep-range-hero.webp"),
];

export const IMR_HERO_BY_KEY = Object.fromEntries(
  IMR_HERO_IMAGES.map((asset) => [asset.key, asset]),
) as Record<HeroImageKey, ImrHeroImageAsset>;

/** Legacy rotating heroes (HeroSection) — also on R2 when enabled */
export const IMR_LEGACY_HERO_IMAGES = [
  {
    filename: "hero_bg_1.jpg",
    r2Key: `${R2_HERO_PREFIX}/legacy/hero_bg_1.jpg`,
    localPath: "/Image/hero_bg_1.jpg",
  },
  {
    filename: "hero_bg_2.jpg",
    r2Key: `${R2_HERO_PREFIX}/legacy/hero_bg_2.jpg`,
    localPath: "/Image/hero_bg_2.jpg",
  },
  {
    filename: "hero_bg_3.jpg",
    r2Key: `${R2_HERO_PREFIX}/legacy/hero_bg_3.jpg`,
    localPath: "/Image/hero_bg_3.jpg",
  },
] as const;
