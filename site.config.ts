import type { SiteConfigInput } from "@/lib/config-schema";

/*
 * Single source of truth for business facts, plans, the promo flag, and the
 * chapter list. The header nav, chapter rail, footer nav, and mobile menu are
 * all generated from `chapters`.
 *
 * This file is plain data so client components can read it without shipping
 * zod. lib/site.ts validates it against lib/config-schema.ts at build time:
 * an invalid config (for example an enabled promo with missing fields) fails
 * the build.
 */
export const siteConfig = {
  name: "Panacea Digital Solutions",
  shortName: "Panacea Digital",
  tagline: "Healthcare Content. Thoughtfully Created.",
  // O-01: production domain to be confirmed.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    email: null,
    legalName: null,
  },

  plans: [
    {
      id: "starter",
      name: "Starter",
      priceMonthly: 99,
      videos: 4,
      infographics: 4,
      revisionsPerItem: 1,
      ctaLabel: "Choose Starter",
    },
    {
      id: "growth",
      name: "Growth",
      priceMonthly: 199,
      videos: 10,
      infographics: 10,
      revisionsPerItem: 1,
      ctaLabel: "Choose Growth",
    },
    {
      id: "scale",
      name: "Scale",
      priceMonthly: 549,
      videos: 30,
      infographics: 30,
      revisionsPerItem: 1,
      ctaLabel: "Choose Scale",
    },
  ],

  featuredPlanClaim: null,

  promo: {
    enabled: false,
    regularPrices: null,
    startDate: null,
    endDate: null,
    terms: null,
  },

  chapters: [
    { id: "top", number: "00", label: "Opening", tone: "paper" },
    { id: "why", number: "01", label: "Why", tone: "paper-2" },
    { id: "services", number: "02", label: "Services", tone: "paper" },
    { id: "ad-videos", number: "03", label: "Ad videos", nav: "Videos", tone: "ink" },
    { id: "infographics", number: "04", label: "Infographics", nav: "Infographics", tone: "paper", grid: true },
    { id: "demo", number: "05", label: "Script demo", tone: "paper-2" },
    { id: "process", number: "06", label: "Process", tone: "ink" },
    { id: "portfolio", number: "07", label: "Samples", nav: "Samples", tone: "paper" },
    { id: "who-we-help", number: "08", label: "Who we help", tone: "paper-2" },
    { id: "pricing", number: "09", label: "Pricing", nav: "Pricing", tone: "paper" },
    { id: "about", number: "10", label: "About", nav: "About", tone: "paper-2" },
    { id: "faq", number: "11", label: "FAQ", nav: "FAQ", tone: "paper" },
    { id: "contact", number: "12", label: "Contact", tone: "ink" },
  ],
} as const satisfies SiteConfigInput;
