import Header from "./components/Header";
import Footer from "./components/Footer";
import SiteChrome from "./components/SiteChrome";
import RegisterSW from "./components/RegisterSW";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Roboto_Serif } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const roboto = Roboto_Serif({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SENAN Travel — Réservez votre bus au Bénin",
  description:
    "Réservez votre prochain trajet en bus partout au Bénin depuis votre téléphone : paiement sécurisé, ticket digital instantané.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SENAN Travel",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#00B4D8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RegisterSW />
        <SiteChrome>
          <Header />
        </SiteChrome>
        {children}
        <SiteChrome>
          <Footer />
        </SiteChrome>
      </body>
    </html>
  );
}
