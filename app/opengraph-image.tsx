import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import {
  buildOgImageResponse,
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
} from "@/lib/og-image-card";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);

  return buildOgImageResponse({
    headline: config.heroHeadline,
    subheadline: config.heroSubheadline,
    badge: config.ctaBadge,
  });
}

/** Static alt for file convention; domain-specific headline is in the rendered image */
export const alt =
  "Iron Mountain Ranch homes for sale in northwest Las Vegas (89131) — Homes by Dr. Jan Duffy";
