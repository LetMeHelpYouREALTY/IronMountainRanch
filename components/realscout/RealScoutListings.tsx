"use client";

import { Button } from "@/components/ui/button";

export interface RealScoutListingsProps {
  /** Section heading. */
  title?: string;
  /** Section subheading. */
  subtitle?: string;
  /** RealScout encoded agent id. */
  agentEncodedId?: string;
  /** Lower bound of the office-listings price band. */
  priceMin?: number;
  /** Upper bound of the office-listings price band. */
  priceMax?: number;
  /** Comma-prefixed RealScout property type list. */
  propertyTypes?: string;
  /** RealScout sort order. */
  sortOrder?: string;
  /** Listing status filter. */
  listingStatus?: string;
  /** "View all" link target (RealScout-hosted search). */
  viewAllUrl?: string;
  /** Background utility classes for the section. */
  className?: string;
}

const DEFAULT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

export default function RealScoutListings({
  title = "Featured Properties",
  subtitle = "Discover exceptional homes in Las Vegas and Henderson",
  agentEncodedId = DEFAULT_AGENT_ENCODED_ID,
  priceMin = 500000,
  priceMax = 800000,
  propertyTypes = ",SFR,MF,TC",
  sortOrder = "NEWEST",
  listingStatus = "For Sale",
  viewAllUrl = "https://drjanduffy.realscout.com/",
  className = "bg-slate-50",
}: RealScoutListingsProps) {
  // RealScout custom element registered by realscout-web-components.umd.js (loaded in root layout).
  const widgetHtml = `<realscout-office-listings
    agent-encoded-id="${agentEncodedId}"
    sort-order="${sortOrder}"
    listing-status="${listingStatus}"
    property-types="${propertyTypes}"
    price-min="${priceMin}"
    price-max="${priceMax}"
  ></realscout-office-listings>`;

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {title}
            </h2>
            <p className="text-slate-600 text-lg">{subtitle}</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a href={viewAllUrl} target="_blank" rel="noopener noreferrer">
              View All Properties
            </a>
          </Button>
        </div>

        {/* RealScout Widget - using dangerouslySetInnerHTML per rules */}
        <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />
      </div>
    </section>
  );
}
