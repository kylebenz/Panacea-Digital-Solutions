import { z } from "zod";

export const planIds = ["starter", "growth", "scale"] as const;
export type PlanId = (typeof planIds)[number];

export const tones = ["paper", "paper-2", "ink"] as const;
export type Tone = (typeof tones)[number];

const planSchema = z.object({
  id: z.enum(planIds),
  name: z.string().min(1),
  priceMonthly: z.number().positive(),
  videos: z.number().int().positive(),
  infographics: z.number().int().positive(),
  revisionsPerItem: z.literal(1),
  ctaLabel: z.string().min(1),
});

/*
 * The "50% off" promotion stays off until regular prices, dates, and terms
 * are confirmed. Enabling it with any field missing fails the build, because
 * lib/site.ts parses site.config.ts with this schema during prerendering.
 */
const promoSchema = z.discriminatedUnion("enabled", [
  z.object({
    enabled: z.literal(false),
    regularPrices: z.record(z.enum(planIds), z.number().positive()).nullable(),
    startDate: z.iso.date().nullable(),
    endDate: z.iso.date().nullable(),
    terms: z.string().min(1).nullable(),
  }),
  z.object({
    enabled: z.literal(true),
    regularPrices: z.record(z.enum(planIds), z.number().positive()),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    terms: z.string().min(1),
  }),
]);

const chapterSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  number: z.string().regex(/^\d{2}$/),
  /** Short name used by the rail, mobile header, and mobile menu. */
  label: z.string().min(1),
  /** Present only for chapters that appear in the header nav. */
  nav: z.string().min(1).optional(),
  tone: z.enum(tones),
  /** Faint 12-column hairline grid behind "diagram language" chapters. */
  grid: z.boolean().optional(),
});

export const siteConfigSchema = z
  .object({
    name: z.string().min(1),
    shortName: z.string().min(1),
    tagline: z.string().min(1),
    url: z.url(),
    contact: z.object({
      /** null renders a visible [VERIFY] placeholder (V-01). */
      email: z.email().nullable(),
      /** Legal entity for the copyright line; null renders [VERIFY] (V-12). */
      legalName: z.string().min(1).nullable(),
    }),
    plans: z.array(planSchema).length(3),
    /** Shown only once verified (O-03). */
    featuredPlanClaim: z.string().min(1).nullable(),
    promo: promoSchema,
    chapters: z.array(chapterSchema).min(1),
  })
  .superRefine((config, ctx) => {
    const ids = new Set<string>();
    config.chapters.forEach((chapter, index) => {
      if (ids.has(chapter.id)) {
        ctx.addIssue({ code: "custom", message: `Duplicate chapter id "${chapter.id}"` });
      }
      ids.add(chapter.id);
      const expected = String(index).padStart(2, "0");
      if (chapter.number !== expected) {
        ctx.addIssue({
          code: "custom",
          message: `Chapter "${chapter.id}" is numbered ${chapter.number}; expected ${expected}`,
        });
      }
    });
    const planOrder = config.plans.map((plan) => plan.id).join(",");
    if (planOrder !== planIds.join(",")) {
      ctx.addIssue({ code: "custom", message: `Plans must be ordered ${planIds.join(", ")}` });
    }
  });

export type SiteConfigInput = z.input<typeof siteConfigSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Chapter = SiteConfig["chapters"][number];
export type Plan = SiteConfig["plans"][number];
