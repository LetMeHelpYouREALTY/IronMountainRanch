import type { Metadata } from "next";
import { getDomainConfig } from "@/lib/domain-config";
import { buildSocialImageMetadata } from "@/lib/metadata-social";
import { absoluteUrl } from "@/lib/site-url";

const SITE_DOMAIN = "ironmountainranchlasvegas.com";

export type PageMetadataInput = {
  title: string;
  description: string;
  /** App Router path, e.g. `/buy` or `/` */
  path: string;
  keywords?: string[];
};

/**
 * One function for page-level metadata — canonical, OG/Twitter images, and URL.
 * Child `openGraph` blocks without images were overriding the root layout; use this instead.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const config = getDomainConfig(SITE_DOMAIN);
  const social = buildSocialImageMetadata(config);
  const canonical = input.path === "" ? "/" : input.path.startsWith("/") ? input.path : `/${input.path}`;
  const pageUrl = absoluteUrl(canonical === "/" ? "" : canonical);

  return {
    title: input.title,
    description: input.description,
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    alternates: { canonical },
    openGraph: {
      title: input.title,
      description: input.description,
      url: pageUrl,
      type: "website",
      ...social.openGraph,
    },
    twitter: {
      title: input.title,
      description: input.description,
      ...social.twitter,
    },
  };
}
