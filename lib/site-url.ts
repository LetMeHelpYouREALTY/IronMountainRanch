/**
 * Canonical site URL for ironmountainranchlasvegas.com.
 * Set NEXT_PUBLIC_SITE_URL in Vercel to match your Google Search Console property.
 */
const DEFAULT_SITE_URL = "https://www.ironmountainranchlasvegas.com";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
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
