import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TrustBar } from "@/components/layout/TrustBar";
import { Analytics } from "@/components/shared/Analytics";
import { JsonLd } from "@/components/shared/JsonLd";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import "./globals.css";

/**
 * Fonts. All are self-hosted by next/font at build time, so
 * there is no third-party font request and no render-blocking stylesheet.
 * next/font also emits a size-adjusted local fallback, which is what keeps the
 * swap from shifting layout.
 *
 * Section 3.2 of the brief specified a display serif. The client found that the
 * cream-plus-serif combination read as a generic AI-design template, so the
 * site now runs on one grotesk, with weight, width and tracking separating
 * display from body.
 */
const archivo = Archivo({
  subsets: ["latin"],
  // The width axis is what gives headings their presence now that the display
  // serif is gone: the same family, set wider and heavier for display.
  axes: ["wdth"],
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
  themeColor: "#0B1A18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexMono.variable} h-full`}
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
