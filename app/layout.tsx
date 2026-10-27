import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { seo } from "@/content/seo";
import { Analytics } from "@/components/layout/Analytics";
import { SkipLinks } from "@/components/layout/SkipLinks";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnchorHandler } from "@/components/layout/AnchorHandler";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  // Variable weight (350–500 used) plus the optical-size axis.
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  preload: false,
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
