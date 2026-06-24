/**
 * Cloudflare R2 + Images URL helpers for Iron Mountain Ranch media.
 * Heroes default to R2 public bucket `listing-photos` (portfolio-wide).
 */

import { IMR_LEGACY_HERO_IMAGES } from "@/lib/imr-hero-images";

/** Portfolio R2 public origin (lovellcanyon.com listing-photos bucket). */
export const DEFAULT_R2_PUBLIC_BASE =
  "https://pub-55f2185197354e748b122f17b695df69.r2.dev";

export const IMR_R2_BUCKET = "listing-photos";

export function isCloudflareHeroMediaEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_HERO_MEDIA_ENABLED !== "false";
}

export function getR2PublicBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_R2_MEDIA_BASE_URL?.replace(/\/$/, "") ??
    DEFAULT_R2_PUBLIC_BASE
  );
}

export function getR2ObjectUrl(key: string): string {
  const normalizedKey = key.replace(/^\//, "");
  return `${getR2PublicBaseUrl()}/${normalizedKey}`;
}

/**
 * Resolve hero `src` for next/image — R2 when Cloudflare media is enabled, else local public path.
 */
export function resolveHeroImageSrc(localPath: string, r2Key: string): string {
  if (!isCloudflareHeroMediaEnabled()) return localPath;
  return getR2ObjectUrl(r2Key);
}

export function resolveLegacyHeroSrc(localPath: string): string {
  if (!isCloudflareHeroMediaEnabled()) return localPath;
  const match = IMR_LEGACY_HERO_IMAGES.find((item) => item.localPath === localPath);
  if (!match) return localPath;
  return getR2ObjectUrl(match.r2Key);
}

export function buildCloudflareImagesDeliveryUrl(
  imageId: string,
  variant = "public",
): string | undefined {
  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH?.trim();
  if (!accountHash || process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED !== "true") {
    return undefined;
  }
  const id = imageId.replace(/^\//, "");
  return `https://imagedelivery.net/${accountHash}/${id}/${variant}`;
}

export async function r2ObjectExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      next: { revalidate: 3600 },
    });
    return response.ok;
  } catch {
    return false;
  }
}
