"use client";

import { useEffect, useRef } from "react";
import { buildCalendlyUrl, CALENDLY_BADGE } from "@/lib/calendly";
import { useCalendlyReady } from "./useCalendlyReady";
import "./types";

/** Floating badge — script loads once in root layout (`calendly-widget-js`). */
export default function CalendlyBadge() {
  const ready = useCalendlyReady();
  const initialized = useRef(false);

  useEffect(() => {
    if (!ready || !window.Calendly || initialized.current) return;
    initialized.current = true;

    window.Calendly.initBadgeWidget({
      url: buildCalendlyUrl({ utmSource: "ironmountainranchlasvegas.com", utmContent: "floating-badge" }),
      text: CALENDLY_BADGE.text,
      color: CALENDLY_BADGE.color,
      textColor: CALENDLY_BADGE.textColor,
      branding: CALENDLY_BADGE.branding,
    });
  }, [ready]);

  return null;
}
