"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCtaClick, type ConversionIntent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  ctaName: string;
  intent?: ConversionIntent;
  proximity?: "hero" | "nav" | "midpage" | "footer" | "widget";
};

export function TrackedLink({
  ctaName,
  intent = "general",
  proximity = "midpage",
  onClick,
  href,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        trackCtaClick(ctaName, String(href), intent, proximity);
        onClick?.(e);
      }}
    />
  );
}

type TrackedAnchorProps = ComponentProps<"a"> & {
  ctaName: string;
  intent?: ConversionIntent;
  proximity?: "hero" | "nav" | "midpage" | "footer" | "widget";
};

export function TrackedAnchor({
  ctaName,
  intent = "general",
  proximity = "midpage",
  onClick,
  href,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        trackCtaClick(ctaName, href ?? "", intent, proximity);
        onClick?.(e);
      }}
    />
  );
}
