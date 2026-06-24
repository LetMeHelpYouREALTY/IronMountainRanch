"use client";

import { useEffect, useState } from "react";

type DeferredRealScoutSimpleSearchProps = {
  agentEncodedId: string;
  className?: string;
};

/**
 * Defers RealScout simple-search until after first paint / idle so hero image stays LCP.
 */
export default function DeferredRealScoutSimpleSearch({
  agentEncodedId,
  className = "",
}: DeferredRealScoutSimpleSearchProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mount = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 2000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
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
        className={`mx-auto h-12 max-w-md animate-pulse rounded-lg bg-white/20 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<realscout-simple-search agent-encoded-id="${agentEncodedId}"></realscout-simple-search>`,
      }}
    />
  );
}
