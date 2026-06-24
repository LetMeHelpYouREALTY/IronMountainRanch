"use client";

import { useEffect, useState } from "react";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";
import { REALSCOUT_AGENT_ENCODED_ID } from "@/lib/realscout-config";

type DeferredRealScoutSimpleSearchProps = {
  agentEncodedId?: string;
  className?: string;
  id?: string;
};

/**
 * Defers RealScout simple-search until after first paint / idle so hero image stays LCP.
 */
export default function DeferredRealScoutSimpleSearch({
  agentEncodedId = REALSCOUT_AGENT_ENCODED_ID,
  className = "",
  id = "imr-search",
}: DeferredRealScoutSimpleSearchProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(mount, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timer = window.setTimeout(mount, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) {
    return (
      <div
        id={id}
        className={`mx-auto h-12 max-w-md animate-pulse rounded-lg bg-white/20 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <RealScoutSimpleSearch
      id={id}
      agentEncodedId={agentEncodedId}
      className={className}
      deferred
    />
  );
}
