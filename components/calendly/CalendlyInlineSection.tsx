import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import type { CalendlyUtmParams } from "@/lib/calendly";
import { Calendar } from "lucide-react";

type CalendlyInlineSectionProps = {
  utm?: CalendlyUtmParams;
  title?: string;
  subtitle?: string;
  height?: string;
  id?: string;
  variant?: "default" | "dark";
};

/**
 * Reusable inline Calendly block — mounted in Footer (every page) and key landing sections.
 */
export default function CalendlyInlineSection({
  utm,
  title = "Schedule an In-Person Real Estate Consultation",
  subtitle = "Meet with Dr. Jan Duffy at Berkshire Hathaway HomeServices — buyer tours, seller pricing, and Iron Mountain Ranch village guidance.",
  height = "700px",
  id = "schedule-consultation",
  variant = "default",
}: CalendlyInlineSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={isDark ? "bg-slate-900 py-12 md:py-16" : "bg-white py-12 md:py-16 border-t border-slate-200"}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`text-center mb-8 ${isDark ? "text-white" : ""}`}>
          <Calendar className={`h-10 w-10 mx-auto mb-3 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
          <h2
            id={`${id}-heading`}
            className={`text-2xl md:text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {title}
          </h2>
          <p className={isDark ? "text-slate-300 max-w-2xl mx-auto" : "text-slate-600 max-w-2xl mx-auto"}>
            {subtitle}
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <CalendlyWidget utm={utm} height={height} />
        </div>
      </div>
    </section>
  );
}
