import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { seo } from "@/content/seo";
import { Analytics } from "@/components/layout/Analytics";
import { SkipLinks } from "@/components/layout/SkipLinks";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnchorHandler } from "@/components/layout/AnchorHandler";
import "./globals.css";

/*
 * Self-hosted, trimmed copies of the Google Fonts files (latin subset; see
 * app/fonts/README.md). Only the axis ranges and OpenType features the
 * design uses are kept, which takes the above-the-fold font weight from
 * ~128 KB to ~96 KB.
 */
const fraunces = localFont({
  // Variable: wght 350–500, opsz 12–80 (font-optical-sizing: auto).
  src: [{ path: "./fonts/fraunces-latin.woff2", weight: "350 500", style: "normal" }],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--font-fraunces",
});

const instrumentSans = localFont({
  src: [{ path: "./fonts/instrument-sans-latin.woff2", weight: "400 600", style: "normal" }],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-instrument",
});

const jetbrainsMono = localFont({
  src: [{ path: "./fonts/jetbrains-mono-latin.woff2", weight: "500 600", style: "normal" }],
  display: "swap",
  // Arial is the closest metric base next/font offers; labels are short.
  adjustFontFallback: "Arial",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Guide §6 / brief §9 (verbatim).
  title: seo.title,
  description: seo.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SkipLinks />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <AnchorHandler />
        <Analytics />
      </body>
    </html>
  );
}
