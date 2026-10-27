import { z } from "zod";
import { contact } from "@/content/contact";

/*
 * Inquiry schema shared by the client form (react-hook-form) and the route
 * handler, so both validate the same rules. Imported only by the lazily
 * loaded form island and the server, never by first-load code.
 */
const e = contact.errors;

/** Accept "example.com" by assuming https://. */
const optionalUrl = z.preprocess(
  (v) => {
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) return "";
    return /^https?:\/\//i.test(s) ? s : `https://${s}`;
  },
  z.union([z.literal(""), z.url({ error: e.website }).max(300)]),
);

export const inquirySchema = z
  .object({
    name: z.string().trim().min(1, e.name).max(120),
    email: z.email({ error: e.email }).max(200),
    contactMethod: z.enum(["email", "phone", "video"], { error: e.contactMethod }),
    phone: z.string().trim().max(40).default(""),
    businessName: z.string().trim().min(1, e.businessName).max(160),
    website: optionalUrl,
    specialty: z.string().trim().min(1, e.specialty).max(160),
    package: z.enum(["", "starter", "growth", "scale"]).default(""),
    message: z.string().trim().min(20, e.message).max(4000),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "phone" && data.phone.replace(/\D/g, "").length < 7) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: e.phone });
    }
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

/** Fields validated before leaving each step. */
export const stepFields = [
  ["name", "email", "contactMethod", "phone"],
  ["businessName", "website", "specialty"],
  ["package", "message"],
] as const satisfies ReadonlyArray<ReadonlyArray<keyof InquiryInput>>;

/** Spam traps: a honeypot field and a minimum time on the form. */
export const HONEYPOT_FIELD = "company_url";
export const MIN_FILL_MS = 3000;

export const planIds = ["starter", "growth", "scale"] as const;
export const isPlanId = (v: string | null): v is (typeof planIds)[number] =>
  !!v && (planIds as readonly string[]).includes(v);
