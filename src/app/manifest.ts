import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { messaging } from "@/config/messaging";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: messaging.positioning,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0718",
    theme_color: "#0A0718",
    icons: [
      { src: "/brand/inferra-app-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/inferra-app-icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/inferra-mark.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
