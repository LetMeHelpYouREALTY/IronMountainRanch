"use client";

import { useEffect } from "react";
import { REALSCOUT_AGENT_ENCODED_ID } from "@/lib/realscout-config";
import { trackEvent } from "@/lib/analytics";

type RealScoutSimpleSearchProps = {
  agentEncodedId?: string;
  className?: string;
  /** Set on homepage hero for in-page CTA anchors */
  id?: string;
  deferred?: boolean;
};

export default function RealScoutSimpleSearch({
  agentEncodedId = REALSCOUT_AGENT_ENCODED_ID,
  className = "",
  id,
  deferred = false,
}: RealScoutSimpleSearchProps) {
  useEffect(() => {
    trackEvent({
      name: "realscout_widget_mount",
      params: {
        widget_type: "simple-search",
        page_path: window.location.pathname,
        deferred,
      },
    });
  }, [deferred]);

  return (
    <div
      id={id}
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<realscout-simple-search agent-encoded-id="${agentEncodedId}"></realscout-simple-search>`,
      }}
    />
  );
}
