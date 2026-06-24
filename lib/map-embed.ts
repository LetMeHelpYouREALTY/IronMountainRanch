import { googleBusinessProfile } from "@/lib/google-business-profile";
import { buildGoogleMapsEmbedQuery, officePlusCode } from "@/lib/plus-codes";
import { getGbpPlaceId } from "@/lib/site-url";

/** Google Maps iframe `src` for the hyperlocal IMR office (Grand Gate St / Kyle Canyon). */
export function buildOfficeMapEmbedSrc(): string {
  const placeId = getGbpPlaceId();
  const { coordinates } = googleBusinessProfile;

  if (placeId && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.trim();
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=place_id:${encodeURIComponent(placeId)}`;
  }

  const plusQuery = buildGoogleMapsEmbedQuery(officePlusCode);
  return `https://maps.google.com/maps?q=${plusQuery}&ll=${coordinates.lat},${coordinates.lng}&z=15&output=embed`;
}
