/**
 * GA4 event helpers + measurement ID for Iron Mountain Ranch.
 * @see docs/conversion-touchpoints-realscout.md
 */

/** Iron Mountain Ranch GA4 property (www.ironmountainranchlasvegas.com). */
export const GA_MEASUREMENT_ID = "G-7Z86DE17G8";

export type ConversionIntent = "buyer" | "seller" | "general";

export type AnalyticsEvent =
  | {
      name: "cta_click";
      params: {
        cta_name: string;
        cta_destination: string;
        intent: ConversionIntent;
        proximity: "hero" | "nav" | "midpage" | "footer" | "widget";
      };
    }
  | {
      name: "realscout_widget_mount";
      params: {
        widget_type: "simple-search" | "office-listings" | "home-value";
        page_path: string;
        deferred: boolean;
      };
    }
  | {
      name: "conversion_funnel_step";
      params: {
        step: string;
        intent: ConversionIntent;
        required: boolean;
      };
    };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event.name, event.params);
}

export function trackCtaClick(
  ctaName: string,
  destination: string,
  intent: ConversionIntent,
  proximity: "hero" | "nav" | "midpage" | "footer" | "widget"
): void {
  trackEvent({
    name: "cta_click",
    params: { cta_name: ctaName, cta_destination: destination, intent, proximity },
  });
}
