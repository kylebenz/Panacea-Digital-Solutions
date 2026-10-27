import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* The single page plus the legal pages (brief §9). */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/privacy/", "/terms/"].map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.3,
  }));
}
