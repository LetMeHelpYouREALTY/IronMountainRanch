"use client";

import { useEffect, useRef, useState } from "react";
import RealScoutListings from "@/components/realscout/RealScoutListings";

/**
 * Mount office listings only when near the viewport — avoids ~890 KiB CloudFront
 * photos + RealScout API work competing with hero LCP on first paint.
 */
export default function DeferredRealScoutListings() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? (
        <RealScoutListings />
      ) : (
        <section className="py-16 md:py-24 bg-slate-50" aria-busy="true">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-slate-600 text-lg">
              Discover exceptional homes in Las Vegas and Henderson
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
