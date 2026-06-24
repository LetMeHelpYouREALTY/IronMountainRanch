/**
 * Canonical site URL for ironmountainranchlasvegas.com.
 * Production host: https://www.ironmountainranchlasvegas.com (matches GSC + GBP website field).
 * Set NEXT_PUBLIC_SITE_URL in Vercel to the www URL.
 */
export const CANONICAL_SITE_URL = "https://www.ironmountainranchlasvegas.com";
const DEFAULT_SITE_URL = CANONICAL_SITE_URL;
const APEX_SITE_HOST = "ironmountainranchlasvegas.com";
export const CANONICAL_SITE_HOST = "www.ironmountainranchlasvegas.com";

/** Normalize apex env values to the www canonical origin. */
export function normalizeSiteUrl(url: string): string {
  try {
    const parsed = new URL(url.replace(/\/$/, ""));
    if (parsed.hostname.toLowerCase() === APEX_SITE_HOST) {
      parsed.hostname = CANONICAL_SITE_HOST;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return normalizeSiteUrl(raw);
}

export function absoluteUrl(path = ""): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Google Business Profile place ID — set NEXT_PUBLIC_GBP_PLACE_ID in production */
export function getGbpPlaceId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GBP_PLACE_ID?.trim();
  return id || undefined;
}

export function getGbpReviewUrl(): string | undefined {
  const placeId = getGbpPlaceId();
  if (!placeId) return undefined;
  return `https://search.google.com/local/writereview?placeid=${placeId}`;
}

export function getGbpDirectionsUrl(lat: number, lng: number): string {
  const placeId = getGbpPlaceId();
  if (placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function getGoogleSearchConsoleVerification():
  | { google: string }
  | undefined {
  const token = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return token ? { google: token } : undefined;
}

/** Emit only when both env vars are set and GBP is verified (5+ reviews). */
export function getGbpAggregateRating():
  | {
      "@type": "AggregateRating";
      ratingValue: string;
      reviewCount: string;
      bestRating: string;
    }
  | undefined {
  const ratingValue = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE?.trim();
  const reviewCountRaw = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT?.trim();
  if (!ratingValue || !reviewCountRaw) return undefined;
  const reviewCount = Number.parseInt(reviewCountRaw, 10);
  if (!Number.isFinite(reviewCount) || reviewCount < 1) return undefined;
  return {
    "@type": "AggregateRating",
    ratingValue,
    reviewCount: String(reviewCount),
    bestRating: "5",
  };
}
