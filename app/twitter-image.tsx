import { profile } from "@/lib/data";
import { ogImageContentType, ogImageSize, renderPortfolioOgImage } from "@/lib/og";

export const alt = `${profile.name} — Software Developer Portfolio`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TwitterImage() {
  return renderPortfolioOgImage();
}
