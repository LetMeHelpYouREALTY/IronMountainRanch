/**
 * Calendly scheduling — single source of truth for Dr. Jan Duffy's booking links.
 *
 * Calendly is the SECONDARY lead channel (appointments). RealScout remains primary
 * for property-search leads. Follow Up Boss receives bookings via Calendly's native
 * integration, so attribution is passed through Calendly's supported UTM parameters
 * rather than a custom CRM sync.
 *
 * Calendly only persists the standard UTM fields through the booking flow:
 *   utm_source, utm_medium, utm_campaign, utm_content, utm_term  (each <= 255 chars).
 * @see https://calendly.com/help/how-to-source-track-your-calendly-embed-with-utm-parameters
 */

const CALENDLY_ACCOUNT = "https://calendly.com/drjanduffy";

/**
 * Canonical Calendly event links. Both keys resolve to the verified `/showing`
 * scheduling page so a missing event type can never produce a 404; update the
 * slug here if Dr. Jan adds dedicated event types.
 */
export const CALENDLY_EVENTS = {
  /** Property showing / buyer tour (default). */
  showing: `${CALENDLY_ACCOUNT}/showing`,
  /** Seller consultation / free home valuation. */
  consultation: `${CALENDLY_ACCOUNT}/showing`,
} as const;

export type CalendlyEvent = keyof typeof CALENDLY_EVENTS;

/** Default scheduling link used when a caller does not specify an event. */
export const DEFAULT_CALENDLY_URL = CALENDLY_EVENTS.showing;

export interface CalendlyUtm {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

/** UTM object shape expected by Calendly's initPopupWidget / initInlineWidget. */
export interface CalendlyUtmObject {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

const UTM_MAX = 255;

function clamp(value: string): string {
  return value.trim().slice(0, UTM_MAX);
}

/**
 * Resolve a Calendly event key, a full https URL, or unknown shorthand into a
 * valid scheduling URL. Unknown/invalid input falls back to the default link so
 * a bad prop (e.g. `url="showing"` passed as a bare slug) can never break the widget.
 */
export function resolveCalendlyUrl(input?: string): string {
  if (!input) return DEFAULT_CALENDLY_URL;
  if (/^https?:\/\//i.test(input)) return input;
  if (input in CALENDLY_EVENTS) return CALENDLY_EVENTS[input as CalendlyEvent];
  return DEFAULT_CALENDLY_URL;
}

/**
 * Build a Calendly URL with attribution. Accepts an event key, full URL, or
 * shorthand and appends the supported UTM query parameters.
 */
export function buildCalendlyUrl(input?: string, utm?: CalendlyUtm): string {
  const base = resolveCalendlyUrl(input);
  if (!utm) return base;

  const url = new URL(base);
  const map: Array<[keyof CalendlyUtm, string]> = [
    ["source", "utm_source"],
    ["medium", "utm_medium"],
    ["campaign", "utm_campaign"],
    ["content", "utm_content"],
    ["term", "utm_term"],
  ];
  for (const [key, param] of map) {
    const value = utm[key];
    if (value) url.searchParams.set(param, clamp(value));
  }
  return url.toString();
}

/** Convert a CalendlyUtm into the camelCase object Calendly's JS embed API expects. */
export function toCalendlyUtmObject(utm?: CalendlyUtm): CalendlyUtmObject | undefined {
  if (!utm) return undefined;
  const obj: CalendlyUtmObject = {};
  if (utm.source) obj.utmSource = clamp(utm.source);
  if (utm.medium) obj.utmMedium = clamp(utm.medium);
  if (utm.campaign) obj.utmCampaign = clamp(utm.campaign);
  if (utm.content) obj.utmContent = clamp(utm.content);
  if (utm.term) obj.utmTerm = clamp(utm.term);
  return Object.keys(obj).length ? obj : undefined;
}

/**
 * Default medium for organic site bookings. Use the page slug as the campaign so
 * Follow Up Boss / Calendly reporting attributes the lead to its landing page.
 */
export const DEFAULT_CALENDLY_MEDIUM = "website";
export const DEFAULT_CALENDLY_SOURCE = "ironmountainranch";
