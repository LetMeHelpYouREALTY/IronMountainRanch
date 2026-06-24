/** Default sitemap priority / changeFrequency by route prefix */
export const ROUTE_SEO_DEFAULTS: Record<
  string,
  { priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }
> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/buy": { priority: 0.95, changeFrequency: "daily" },
  "/sell": { priority: 0.95, changeFrequency: "weekly" },
  "/sub-communities": { priority: 0.95, changeFrequency: "weekly" },
  "/market-report": { priority: 0.9, changeFrequency: "weekly" },
  "/contact": { priority: 0.9, changeFrequency: "monthly" },
  "/google-business": { priority: 0.85, changeFrequency: "monthly" },
  "/las-vegas-zip-code-map": { priority: 0.85, changeFrequency: "monthly" },
  "/faq": { priority: 0.8, changeFrequency: "monthly" },
};

export function getRouteSeoDefaults(path: string) {
  if (ROUTE_SEO_DEFAULTS[path]) return ROUTE_SEO_DEFAULTS[path];
  if (path.startsWith("/sub-communities/")) {
    return { priority: 0.85, changeFrequency: "weekly" as const };
  }
  if (path.startsWith("/neighborhoods/")) {
    return { priority: 0.75, changeFrequency: "weekly" as const };
  }
  if (path.startsWith("/55-plus-communities")) {
    return { priority: 0.7, changeFrequency: "monthly" as const };
  }
  return { priority: 0.65, changeFrequency: "monthly" as const };
}
