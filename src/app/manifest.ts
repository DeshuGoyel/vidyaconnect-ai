import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VidyaConnect AI",
    short_name: "VidyaConnect",
    description: "Apni Gali Ka Best Teacher",
    start_url: "/home",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0A0F",
    theme_color: "#FF6B00",
    icons: [
      { src: "/icons/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
