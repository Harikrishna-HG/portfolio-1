import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";
import { siteDomain } from "@/lib/site";

export const ogImageSize = { width: 1200, height: 630 } as const;

export const ogImageContentType = "image/png";

/**
 * Renders the social-sharing card used by `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx`. It is generated at build time from existing profile
 * data, so no image asset is needed.
 */
export function renderPortfolioOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          backgroundColor: "#0f0f10",
          color: "#f5f5f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{ display: "flex", width: 44, height: 3, backgroundColor: "#f5f5f5" }}
          />
          <div
            style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#a3a3a3" }}
          >
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#c9c9c9" }}>
            {profile.title.en}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#8a8a8a" }}>
          {siteDomain}
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
