"use client";

import Script from "next/script";
import "./types";
import {
  buildCalendlyUrl,
  toCalendlyUtmObject,
  type CalendlyUtm,
} from "@/lib/calendly";

interface CalendlyButtonProps {
  /** Calendly event key ("showing" | "consultation"), full URL, or shorthand. */
  url?: string;
  /** UTM attribution carried through to Calendly / Follow Up Boss. */
  utm?: CalendlyUtm;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CalendlyButton({
  url,
  utm,
  text = "Schedule time with me",
  className = "inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors",
  children,
}: CalendlyButtonProps) {
  const popupUrl = buildCalendlyUrl(url, utm);
  const utmObject = toCalendlyUtmObject(utm);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: popupUrl, utm: utmObject });
    }
  };

  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <a href={popupUrl} onClick={handleClick} className={className}>
        {children || text}
      </a>
    </>
  );
}
