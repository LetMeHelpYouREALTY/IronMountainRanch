"use client";

import { useEffect, useRef } from "react";
import {
  resolveCalendlyUrl,
  toCalendlyUtmObject,
  type CalendlyUtm,
} from "@/lib/calendly";

interface CalendlyWidgetProps {
  /** Calendly event key ("showing" | "consultation"), full URL, or shorthand. */
  url?: string;
  /** UTM attribution carried through to Calendly / Follow Up Boss. */
  utm?: CalendlyUtm;
  minWidth?: string;
  height?: string;
}

export default function CalendlyWidget({
  url,
  utm,
  minWidth = "320px",
  height = "700px",
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scheduleUrl = resolveCalendlyUrl(url);
    const utmObject = toCalendlyUtmObject(utm);

    const initWidget = () => {
      if (typeof window !== "undefined" && window.Calendly && widgetRef.current) {
        widgetRef.current.innerHTML = "";

        const widgetDiv = document.createElement("div");
        widgetDiv.className = "calendly-inline-widget";
        widgetDiv.setAttribute("data-url", scheduleUrl);
        widgetDiv.style.minWidth = minWidth;
        widgetDiv.style.height = height;
        widgetDiv.style.width = "100%";

        widgetRef.current.appendChild(widgetDiv);

        window.Calendly.initInlineWidget({
          url: scheduleUrl,
          parentElement: widgetDiv,
          utm: utmObject,
        });
      }
    };

    if (window.Calendly) {
      initWidget();
    } else {
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          initWidget();
        }
      }, 100);

      const timeout = setTimeout(() => clearInterval(checkCalendly), 10000);
      return () => {
        clearInterval(checkCalendly);
        clearTimeout(timeout);
      };
    }
  }, [url, utm, minWidth, height]);

  return <div ref={widgetRef} style={{ minWidth, height, width: "100%" }} />;
}
