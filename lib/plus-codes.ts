/**
 * Google Plus Codes (Open Location Codes) for GBP map pins and community geo.
 * Compound codes match what Google Maps shows when dropping a pin.
 *
 * Office pin: verified GBP / Maps compound code (Las Vegas locality).
 * Community pin: Iron Mountain Ranch centroid near Kyle Canyon corridor.
 */

export type PlusCodeLocation = {
  /** Short code, e.g. `8PF7+75J` */
  short: string;
  /** Human-readable compound code for Maps search / directions */
  compound: string;
  /** Full global code (10-digit area) */
  global: string;
  latitude: number;
  longitude: number;
};

/** GBP office map pin — 9312 Grand Gate St, Kyle Canyon / Iron Mountain Ranch (89143). */
export const officePlusCode: PlusCodeLocation = {
  short: "8PF6+47",
  compound: "8PF6+47 Kyle Canyon, Las Vegas, NV",
  global: "85868PF6+47",
  latitude: 36.3228288,
  longitude: -115.2893043,
};

/** Iron Mountain Ranch master-planned community — Kyle Canyon area, northwest Las Vegas */
export const communityPlusCode: PlusCodeLocation = {
  short: "8PF7+75J",
  compound: "8PF7+75J Kyle Canyon, Las Vegas, NV",
  global: "85868PF7+75J",
  latitude: 36.3232125,
  longitude: -115.2871094,
};

export function buildGoogleMapsSearchUrl(plusCode: PlusCodeLocation): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plusCode.compound)}`;
}

export function buildGoogleMapsEmbedQuery(plusCode: PlusCodeLocation): string {
  return encodeURIComponent(plusCode.compound);
}
