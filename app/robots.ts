import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/*
 * Production allows crawling except the dev style guide. Every other
 * environment (Netlify deploy previews, branch deploys, local) blocks all
 * crawling. Netlify sets CONTEXT; Vercel sets VERCEL_ENV.
 */
function isProduction() {
  if (process.env.CONTEXT) return process.env.CONTEXT === "production";
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === "production";
  return process.env.SITE_ENV === "production";
}

export default function robots(): MetadataRoute.Robots {
  if (!isProduction()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
