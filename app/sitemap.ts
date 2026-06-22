import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { subCommunities } from "@/lib/iron-mountain-ranch";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  const corePages = [
    { url: baseUrl, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/buy`, priority: 0.95, changeFrequency: "daily" as const },
    { url: `${baseUrl}/sell`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/sub-communities`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/market-report`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/contact`, priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const villagePages = subCommunities.map((v) => ({
    url: `${baseUrl}/sub-communities/${v.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  }));

  const allPages = [...corePages, ...villagePages];

  return allPages.map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
