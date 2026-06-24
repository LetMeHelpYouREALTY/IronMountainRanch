import type { Metadata } from "next";
import type { DomainConfig } from "./domain-config";
import { siteConfig } from "./site-config";
import { absoluteUrl } from "./site-url";
import { getDefaultOgImageAlt, OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "./og-image-card";

/** Default document title — avoids duplicating neighborhood in the title template */
export function buildDefaultSiteTitle(config: DomainConfig): string {
  return `${config.heroHeadline} | Homes by Dr. Jan Duffy`;
}

/** Shared Open Graph + Twitter image metadata (PNG 1200×630 via app/opengraph-image.tsx) */
export function buildSocialImageMetadata(config: DomainConfig): Pick<
  Metadata,
  "openGraph" | "twitter"
> {
  const ogImagePath = "/opengraph-image";
  const ogImageUrl = absoluteUrl(ogImagePath);
  const imageAlt = getDefaultOgImageAlt(config.heroHeadline);

  return {
    openGraph: {
      images: [
        {
          url: ogImagePath,
          secureUrl: ogImageUrl,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: imageAlt,
          type: OG_IMAGE_CONTENT_TYPE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [
        {
          url: ogImageUrl,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: imageAlt,
        },
      ],
    },
  };
}

export function buildRootOpenGraph(
  config: DomainConfig,
  siteUrl: string
): NonNullable<Metadata["openGraph"]> {
  const social = buildSocialImageMetadata(config);
  return {
    title: config.heroHeadline,
    description: config.description,
    type: "website",
    url: siteUrl,
    siteName: siteConfig.fullName,
    locale: "en_US",
    ...social.openGraph,
  };
}

export function buildRootTwitter(config: DomainConfig): NonNullable<Metadata["twitter"]> {
  const social = buildSocialImageMetadata(config);
  return {
    card: "summary_large_image",
    title: config.heroHeadline,
    description: config.description,
    ...social.twitter,
  };
}
