import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Libre_Caslon_Text } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TrustBar } from "@/components/layout/TrustBar";
import { Analytics } from "@/components/shared/Analytics";
import { JsonLd } from "@/components/shared/JsonLd";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import "./globals.css";

/**
 * Fonts, Section 3.2. All three are self-hosted by next/font at build time, so
 * there is no third-party font request and no render-blocking stylesheet.
 * next/font also emits a size-adjusted local fallback, which is what keeps the
 * swap from shifting layout (Section 3.4).
 */
const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-caslon",
});

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Indian Agricultural & Spice Exporter`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  // The favicon comes from src/app/icon.svg by file convention.
};

export const viewport: Viewport = {
  themeColor: "#0E3B36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${caslon.variable} ${archivo.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ivory-50">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <TrustBar />
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <TrustBar variant="prefooter" />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
