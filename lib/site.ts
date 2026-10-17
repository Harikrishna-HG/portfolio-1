/**
 * Canonical site details used for metadata, the sitemap, robots, and the
 * generated social-sharing image. Override the URL for previews/deployments
 * with the `NEXT_PUBLIC_SITE_URL` environment variable.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://harikrishnagautam.com.np";

export const siteName = "Harikrishna Gautam Portfolio";

export const siteDomain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
