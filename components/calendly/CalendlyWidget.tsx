"use client";

import { useEffect, useRef } from "react";
import { buildCalendlyUrl, type CalendlyUtmParams } from "@/lib/calendly";
import { useCalendlyReady } from "./useCalendlyReady";
import "./types";

type CalendlyWidgetProps = {
  utm?: CalendlyUtmParams;
  minWidth?: string;
  height?: string;
  className?: string;
  id?: string;
};

export default function CalendlyWidget({
  utm,
  minWidth = "320px",
  height = "700px",
  className = "",
  id,
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const ready = useCalendlyReady();
  const url = buildCalendlyUrl(utm);

  useEffect(() => {
    if (!ready || !widgetRef.current || !window.Calendly) return;

    widgetRef.current.innerHTML = "";
    const widgetDiv = document.createElement("div");
    widgetDiv.className = "calendly-inline-widget";
    widgetDiv.setAttribute("data-url", url);
    widgetDiv.style.minWidth = minWidth;
    widgetDiv.style.height = height;
    widgetDiv.style.width = "100%";

    widgetRef.current.appendChild(widgetDiv);
    window.Calendly.initInlineWidget({ url, parentElement: widgetDiv });
  }, [ready, url, minWidth, height]);

  return (
    <div
      id={id}
      ref={widgetRef}
      className={className}
      style={{ minWidth, height, width: "100%" }}
      aria-label="Schedule an in-person real estate consultation with Dr. Jan Duffy"
    />
  );
}
