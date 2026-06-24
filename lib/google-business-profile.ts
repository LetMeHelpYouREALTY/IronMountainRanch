/**
 * Google Business Profile mirror for Iron Mountain Ranch | Homes by Dr. Jan Duffy.
 * Single source for hours + GBP field guidance — must match the live GBP dashboard.
 *
 * @see docs/google-business-profile-alignment.md
 */

import { agentInfo, officeInfo, siteConfig } from "./site-config";
import { absoluteUrl } from "./site-url";
import { officePlusCode } from "./plus-codes";

/** GBP primary category (Google predefined list). */
export const GBP_PRIMARY_CATEGORY = "Real Estate Agent" as const;

/** Secondary categories — keep to 3–5 relevant types per Google guidance. */
export const GBP_SECONDARY_CATEGORIES = [
  "Real Estate Consultant",
  "Real Estate Agency",
] as const;

export type BusinessHoursLine = {
  day: string;
  hours: string;
  /** Schema.org dayOfWeek value when hours are fixed (omit for appointment-only days). */
  schemaDay?: string;
  opens?: string;
  closes?: string;
};

/** Visible + schema hours — match GBP exactly. */
export const businessHoursLines: BusinessHoursLine[] = [
  { day: "Monday", hours: "9:00 AM – 6:00 PM", schemaDay: "Monday", opens: "09:00", closes: "18:00" },
  { day: "Tuesday", hours: "9:00 AM – 6:00 PM", schemaDay: "Tuesday", opens: "09:00", closes: "18:00" },
  { day: "Wednesday", hours: "9:00 AM – 6:00 PM", schemaDay: "Wednesday", opens: "09:00", closes: "18:00" },
  { day: "Thursday", hours: "9:00 AM – 6:00 PM", schemaDay: "Thursday", opens: "09:00", closes: "18:00" },
  { day: "Friday", hours: "9:00 AM – 6:00 PM", schemaDay: "Friday", opens: "09:00", closes: "18:00" },
  { day: "Saturday", hours: "10:00 AM – 4:00 PM", schemaDay: "Saturday", opens: "10:00", closes: "16:00" },
  { day: "Sunday", hours: "By appointment" },
];

/** Compact footer display lines. */
export const businessHoursDisplay = [
  "Mon–Fri: 9:00 AM – 6:00 PM",
  "Sat: 10:00 AM – 4:00 PM",
  "Sun: By appointment",
] as const;

export function buildOpeningHoursSpecification() {
  return businessHoursLines
    .filter((line): line is BusinessHoursLine & { schemaDay: string; opens: string; closes: string } =>
      Boolean(line.schemaDay && line.opens && line.closes),
    )
    .map((line) => ({
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: line.schemaDay,
      opens: line.opens,
      closes: line.closes,
    }));
}

/** Service areas listed in GBP (hyper-local first). */
export const gbpServiceAreas = [
  "Iron Mountain Ranch, Las Vegas, NV",
  "Kyle Canyon, Las Vegas, NV",
  "Northwest Las Vegas, NV",
  "Centennial Hills, Las Vegas, NV",
  "89131, Las Vegas, NV",
  "89143, Las Vegas, NV",
  "Clark County, NV",
] as const;

export const googleBusinessProfile = {
  businessName: siteConfig.name,
  shortName: siteConfig.shortSiteName,
  websiteUrl: absoluteUrl("/"),
  googleBusinessPagePath: "/google-business" as const,
  phone: agentInfo.phoneFormatted,
  phoneTel: agentInfo.phoneTel,
  email: agentInfo.email,
  address: officeInfo.address,
  coordinates: officeInfo.coordinates,
  mapPlusCode: officePlusCode.compound,
  license: agentInfo.license,
  brokerage: agentInfo.brokerage,
  agentName: agentInfo.name,
  primaryCategory: GBP_PRIMARY_CATEGORY,
  secondaryCategories: GBP_SECONDARY_CATEGORIES,
  serviceAreas: gbpServiceAreas,
  hours: businessHoursLines,
  hoursDisplay: businessHoursDisplay,
} as const;
