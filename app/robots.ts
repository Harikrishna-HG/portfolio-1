import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Robots configuration. Allows all crawlers and points them at the sitemap.
 * `app/sitemap.ts` must be kept in sync if more pages are added.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
