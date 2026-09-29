import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SENAN Travel — Réservation de bus",
    short_name: "SENAN Travel",
    description:
      "Réservez votre trajet, gérez vos tickets et vos reçus, où que vous soyez au Bénin.",
    start_url: "/reservations",
    scope: "/reservations",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#00B4D8",
    lang: "fr",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
