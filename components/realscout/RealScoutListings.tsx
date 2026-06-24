"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { REALSCOUT_AGENT_ENCODED_ID, REALSCOUT_LISTINGS_PATH } from "@/lib/realscout-config";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

export default function RealScoutListings() {
  useEffect(() => {
    trackEvent({
      name: "realscout_widget_mount",
      params: {
        widget_type: "office-listings",
        page_path: window.location.pathname,
        deferred: false,
      },
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Iron Mountain Ranch MLS Listings
            </h2>
            <p className="text-slate-600 text-lg">
              Gated northwest Las Vegas homes in 89131 &amp; 89143 — updated from the MLS
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href={REALSCOUT_LISTINGS_PATH}>View all MLS listings</Link>
          </Button>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings 
              agent-encoded-id="${REALSCOUT_AGENT_ENCODED_ID}" 
              sort-order="NEWEST" 
              listing-status="For Sale" 
              property-types=",SFR,MF,TC" 
              price-min="350000" 
              price-max="1000000"
            ></realscout-office-listings>`,
          }}
        />
      </div>
    </section>
  );
}
