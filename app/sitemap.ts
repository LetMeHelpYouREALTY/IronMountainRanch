import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getRouteSeoDefaults } from "@/lib/seo-weekly/priorities";
import marketingRoutes from "@/lib/seo-weekly/marketing-routes.generated.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return marketingRoutes.routes.map((routePath) => {
    const { priority, changeFrequency } = getRouteSeoDefaults(routePath);
    const url = routePath === "/" ? baseUrl : `${baseUrl}${routePath}`;

    return {
      url,
      lastModified,
      changeFrequency,
      priority,
    };
  });
}
