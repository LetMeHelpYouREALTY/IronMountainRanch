"use client";

import Script from "next/script";
import CalendlyBadge from "./CalendlyBadge";

/** Loads Calendly once per page; badge + inline widgets reuse window.Calendly. */
export default function CalendlyRoot() {
  return (
    <>
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event("calendly-loaded"));
        }}
      />
      <CalendlyBadge />
    </>
  );
}
