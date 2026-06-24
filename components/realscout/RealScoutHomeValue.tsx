"use client";

import { useEffect } from "react";
import { REALSCOUT_AGENT_ENCODED_ID } from "@/lib/realscout-config";
import { trackEvent } from "@/lib/analytics";

type RealScoutHomeValueProps = {
  agentEncodedId?: string;
  className?: string;
  id?: string;
};

/**
 * Seller primary conversion — address entry inside RealScout (→ FUB via native sync).
 */
export default function RealScoutHomeValue({
  agentEncodedId = REALSCOUT_AGENT_ENCODED_ID,
  className = "",
  id = "imr-home-value",
}: RealScoutHomeValueProps) {
  useEffect(() => {
    trackEvent({
      name: "realscout_widget_mount",
      params: {
        widget_type: "home-value",
        page_path: window.location.pathname,
        deferred: false,
      },
    });
  }, []);

  return (
    <div
      id={id}
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<realscout-home-value agent-encoded-id="${agentEncodedId}"></realscout-home-value>`,
      }}
    />
  );
}
