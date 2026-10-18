/**
 * Canonical site details used for metadata, the sitemap, robots, and the
 * generated social-sharing image. Override the URL for previews/deployments
 * with the `NEXT_PUBLIC_SITE_URL` environment variable.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://harikrishnagautam.com.np";

export const siteName = "Harikrishna Gautam Portfolio";

/** Primary SEO title — also used for Open Graph and Twitter cards. */
export const siteTitle = "Harikrishna Gautam — Full Stack Software Developer in Nepal";

/** Primary meta description — also used for Open Graph and Twitter cards. */
export const siteDescription =
  "Harikrishna Gautam is a full stack software developer in Nepal building web apps with React, Next.js, .NET, SQL Server and AWS, focused on secure development.";

export const siteDomain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
