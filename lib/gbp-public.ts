import { officeInfo, siteConfig } from "@/lib/site-config";
import { getGbpPlaceId, getGbpReviewUrl } from "@/lib/site-url";

export function isGbpReviewsDisabled(): boolean {
  return process.env.NEXT_PUBLIC_GBP_REVIEWS_DISABLED === "true";
}

export function getVisibleGbpAggregateRating(): {
  ratingValue: number;
  reviewCount: number;
} | null {
  const ratingRaw = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE?.trim();
  const countRaw = process.env.NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT?.trim();
  if (!ratingRaw || !countRaw) return null;

  const ratingValue = Number.parseFloat(ratingRaw);
  const reviewCount = Number.parseInt(countRaw, 10);
  if (!Number.isFinite(ratingValue) || !Number.isFinite(reviewCount) || reviewCount < 1) {
    return null;
  }

  return { ratingValue, reviewCount };
}

/** URL for "read reviews" CTAs — never points at another site's GBP. */
export function getGbpBrowseReviewsUrl(): string | undefined {
  if (isGbpReviewsDisabled()) return undefined;

  const custom = process.env.NEXT_PUBLIC_GBP_BROWSE_REVIEWS_URL?.trim();
  if (custom) return custom;

  const placeId = getGbpPlaceId();
  if (placeId) {
    return `https://search.google.com/local/reviews?placeid=${placeId}`;
  }

  const query = encodeURIComponent(`${siteConfig.name} ${officeInfo.address.full}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Pre-opened review form — set NEXT_PUBLIC_GBP_WRITEREVIEW_URL from GBP dashboard when verified. */
export function getGbpWriteReviewUrl(): string | undefined {
  if (isGbpReviewsDisabled()) return undefined;

  const custom = process.env.NEXT_PUBLIC_GBP_WRITEREVIEW_URL?.trim();
  if (custom) return custom;

  return getGbpReviewUrl();
}
