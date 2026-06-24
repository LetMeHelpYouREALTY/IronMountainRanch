"use client";

import { useEffect, useState } from "react";

/** Waits for root layout `calendly-widget-js` script — never load widget.js twice. */
export function useCalendlyReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.Calendly) {
      setReady(true);
      return;
    }

    const onLoaded = () => setReady(true);
    window.addEventListener("calendly-loaded", onLoaded);

    const interval = window.setInterval(() => {
      if (window.Calendly) {
        setReady(true);
        window.clearInterval(interval);
      }
    }, 100);

    const timeout = window.setTimeout(() => window.clearInterval(interval), 15000);

    return () => {
      window.removeEventListener("calendly-loaded", onLoaded);
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return ready;
}
