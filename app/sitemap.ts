import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Sitemap. The portfolio is a single page, so the index contains one entry.
 * If per-project pages are ever added, append an entry per project here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
