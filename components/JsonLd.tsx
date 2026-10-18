import { profile, skills } from "@/lib/data";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

/**
 * JSON-LD structured data for search engines (Google, Bing).
 * Rendered once in the root layout; `Person` and `WebSite` are linked
 * via `@id` so engines can associate the site with the person.
 * `knowsAbout` is derived from the skills data to stay in sync automatically.
 */
export default function JsonLd() {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const knowsAbout = Array.from(
    new Set(skills.flatMap((group) => group.keywords)),
  );

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: siteUrl,
        image: `${siteUrl}/profile.jpeg`,
        jobTitle: "Software Developer",
        email: profile.email,
        description: profile.subtitle.en,
        address: {
          "@type": "PostalAddress",
          addressCountry: "NP",
        },
        sameAs: [
          profile.github,
          profile.linkedin,
          profile.twitter,
          profile.website,
        ].filter(Boolean),
        knowsAbout,
        knowsLanguage: ["English", "Nepali", "Hindi"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Far Western University",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        description: siteDescription,
        url: siteUrl,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
