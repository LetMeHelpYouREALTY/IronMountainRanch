"use client";

import { buildCalendlyUrl, type CalendlyUtmParams } from "@/lib/calendly";
import { useCalendlyReady } from "./useCalendlyReady";
import "./types";

type CalendlyButtonProps = {
  utm?: CalendlyUtmParams;
  text?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function CalendlyButton({
  utm,
  text = "Schedule time with me",
  className = "inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors",
  children,
}: CalendlyButtonProps) {
  const ready = useCalendlyReady();
  const url = buildCalendlyUrl(utm);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      disabled={!ready}
      aria-label={typeof children === "string" ? children : text}
    >
      {children ?? text}
    </button>
  );
}
