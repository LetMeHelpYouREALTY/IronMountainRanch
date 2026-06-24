"use client";

import { useEffect } from "react";
import Script from "next/script";
import "./types";
import {
  buildCalendlyUrl,
  toCalendlyUtmObject,
  type CalendlyUtm,
} from "@/lib/calendly";

interface CalendlyBadgeProps {
  /** Calendly event key ("showing" | "consultation"), full URL, or shorthand. */
  url?: string;
  /** UTM attribution carried through to Calendly / Follow Up Boss. */
  utm?: CalendlyUtm;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

export default function CalendlyBadge({
  url,
  utm,
  text = "Schedule time with me",
  color = "#0069ff",
  textColor = "#ffffff",
  branding = true,
}: CalendlyBadgeProps) {
  const badgeUrl = buildCalendlyUrl(url, utm);
  const utmObject = toCalendlyUtmObject(utm);

  useEffect(() => {
    // Initialize badge widget when Calendly script is loaded
    const initBadge = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: badgeUrl,
          text,
          color,
          textColor,
          branding,
          utm: utmObject,
        });
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      initBadge();
    } else {
      // Wait for script to load
      window.addEventListener("calendly-loaded", initBadge);
    }

    return () => {
      window.removeEventListener("calendly-loaded", initBadge);
    };
  }, [badgeUrl, utmObject, text, color, textColor, branding]);

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Calendly) {
            window.Calendly.initBadgeWidget({
              url: badgeUrl,
              text,
              color,
              textColor,
              branding,
              utm: utmObject,
            });
          }
        }}
      />
    </>
  );
}
