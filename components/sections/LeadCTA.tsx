import Link from "next/link";
import { Search, CalendarCheck, Phone } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import { buildCalendlyUrl, type CalendlyUtm } from "@/lib/calendly";

interface LeadCTAProps {
  /** Primary heading. */
  heading?: string;
  /** Supporting line under the heading. */
  subheading?: string;
  /** Internal search route (RealScout-powered Buy page is the primary lead path). */
  searchUrl?: string;
  searchLabel?: string;
  /** Calendly event key ("showing" | "consultation"). */
  calendlyEvent?: string;
  /** Calendly button label. */
  scheduleLabel?: string;
  /** UTM attribution for the scheduling link (campaign should identify the page). */
  calendlyUtm?: CalendlyUtm;
  className?: string;
}

/**
 * Three-channel lead conversion block: Search (RealScout) + Schedule (Calendly) + Call.
 * Server component — the Calendly link is a plain anchor carrying UTM query params, so
 * attribution flows to Calendly / Follow Up Boss without shipping the popup script.
 */
export default function LeadCTA({
  heading = "Ready to Make Your Move in Iron Mountain Ranch?",
  subheading = "Search live listings, book a private tour, or talk with Dr. Jan Duffy directly — no pressure, just expert local guidance.",
  searchUrl = "/buy",
  searchLabel = "Search Listings",
  calendlyEvent = "showing",
  scheduleLabel = "Schedule a Tour",
  calendlyUtm,
  className = "",
}: LeadCTAProps) {
  const scheduleUrl = buildCalendlyUrl(calendlyEvent, {
    source: "ironmountainranch",
    medium: "website",
    ...calendlyUtm,
  });

  const cardBase =
    "flex flex-col items-center justify-center gap-2 rounded-xl px-6 py-5 text-center font-semibold transition-colors";

  return (
    <section className={`bg-blue-600 text-white ${className}`}>
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-lg text-blue-100">{subheading}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          <Link
            href={searchUrl}
            className={`${cardBase} bg-white text-blue-700 hover:bg-blue-50`}
          >
            <Search className="h-6 w-6" />
            {searchLabel}
            <span className="text-xs font-normal text-blue-500">
              MLS-powered home search
            </span>
          </Link>

          <a
            href={scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardBase} bg-blue-800 text-white hover:bg-blue-900`}
          >
            <CalendarCheck className="h-6 w-6" />
            {scheduleLabel}
            <span className="text-xs font-normal text-blue-200">
              Book a time that works for you
            </span>
          </a>

          <a
            href={agentInfo.phoneTel}
            className={`${cardBase} bg-blue-800 text-white hover:bg-blue-900`}
          >
            <Phone className="h-6 w-6" />
            Call {agentInfo.phoneFormatted}
            <span className="text-xs font-normal text-blue-200">
              Dr. Jan answers her own phone
            </span>
          </a>
        </div>

        <p className="mt-8 text-center text-blue-200 text-sm">
          {agentInfo.name} · License {agentInfo.license} · {agentInfo.brokerage}
        </p>
      </div>
    </section>
  );
}
