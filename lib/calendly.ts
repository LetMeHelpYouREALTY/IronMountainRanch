/**
 * Calendly URL builders — in-person consultation is the default site-wide event.
 * UTM params flow through to Follow Up Boss via Calendly native integration.
 */

const DEFAULT_CONSULTATION_URL =
  "https://calendly.com/drjanduffy/in-person-real-estate-consultation";

export const CALENDLY_CONSULTATION_URL =
  process.env.NEXT_PUBLIC_CALENDLY_CONSULTATION_URL ?? DEFAULT_CONSULTATION_URL;

export type CalendlyUtmParams = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export function buildCalendlyUrl(utm: CalendlyUtmParams = {}): string {
  const url = new URL(CALENDLY_CONSULTATION_URL);
  url.searchParams.set("hide_gdpr_banner", "1");

  if (utm.utmSource) url.searchParams.set("utm_source", utm.utmSource);
  if (utm.utmMedium) url.searchParams.set("utm_medium", utm.utmMedium);
  if (utm.utmCampaign) url.searchParams.set("utm_campaign", utm.utmCampaign);
  if (utm.utmContent) url.searchParams.set("utm_content", utm.utmContent);

  return url.toString();
}

export const CALENDLY_BADGE = {
  text: "Schedule time with me",
  color: "#0069ff",
  textColor: "#ffffff",
  branding: false,
} as const;
