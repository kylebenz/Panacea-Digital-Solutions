import type { SiteConfigInput } from "@/lib/config-schema";

/*
 * Single source of truth for business facts, plans, the promo flag, and the
 * chapter list. The header nav, chapter rail, footer nav, and mobile menu are
 * all generated from `chapters`.
 *
 * This file is plain data so client components can read it without shipping
 * zod. lib/site.ts validates it against lib/config-schema.ts at build time:
 * an invalid config (for example promo prices that don't match the plans) fails
 * the build.
 */
export const siteConfig = {
  name: "Panacea Digital Solutions",
  shortName: "Panacea Digital",
  tagline: "Healthcare stories. Thoughtfully told.",
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
      revisionsPerItem: 1,
      ctaLabel: "Choose Starter",
    },
    {
      id: "growth",
      name: "Growth",
      priceMonthly: 199,
      videos: 10,
      revisionsPerItem: 1,
      ctaLabel: "Choose Growth",
    },
    {
      id: "scale",
      name: "Scale",
      priceMonthly: 549,
      videos: 30,
      revisionsPerItem: 1,
      ctaLabel: "Choose Scale",
    },
  ],

  featuredPlanClaim: null,

  // Introductory offer: the guide (§9) states the current prices are 50% off,
  // so the regular prices are twice the plan prices. Dates and terms are not
  // confirmed yet (V-13) and render as [VERIFY] marks until filled in.
  promo: {
    enabled: true,
    percentOff: 50,
    regularPrices: { starter: 198, growth: 398, scale: 1098 },
    startDate: null,
    endDate: null,
    terms: null,
  },

  // Page order follows the agreed layout: hero, work wall, why, process,
  // breakdowns, about, formats, FAQ, pricing, fit check, inquiry form.
  chapters: [
    { id: "top", number: "00", label: "Opening", tone: "paper" },
    { id: "work", number: "01", label: "The work", nav: "Work", tone: "paper" },
    { id: "why", number: "02", label: "Why drama works", tone: "ink" },
    { id: "how-it-works", number: "03", label: "How it works", nav: "How it works", tone: "paper-2" },
    { id: "breakdowns", number: "04", label: "Breakdowns", nav: "Breakdowns", tone: "paper" },
    { id: "about", number: "05", label: "About us", tone: "paper-2" },
    { id: "formats", number: "06", label: "Organic, paid, or both", tone: "paper" },
    { id: "faq", number: "07", label: "FAQ", tone: "paper" },
    { id: "pricing", number: "08", label: "Pricing", nav: "Pricing", tone: "paper-2" },
    { id: "fit", number: "09", label: "Before you start", tone: "paper" },
    { id: "contact", number: "10", label: "Get started", tone: "ink" },
  ],
} as const satisfies SiteConfigInput;
