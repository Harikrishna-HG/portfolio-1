import { profile } from "@/lib/data";
import { ogImageContentType, ogImageSize, renderPortfolioOgImage } from "@/lib/og";

export const alt = `${profile.name} — Portfolio`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderPortfolioOgImage();
}
