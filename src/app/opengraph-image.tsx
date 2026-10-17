import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { messaging } from "@/config/messaging";

export const alt = "Inferra Software: Complex ideas. Engineered into reality.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ eyebrow: "Software engineering & product development", title: messaging.slogan, subtitle: messaging.supportingHeadline });
}
