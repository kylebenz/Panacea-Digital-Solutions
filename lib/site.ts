import "server-only";
import { siteConfigSchema } from "@/lib/config-schema";
import { siteConfig as raw } from "@/site.config";

/*
 * Validated site config for server components. Importing this anywhere in
 * the server tree (the root layout does) runs the zod schema during
 * prerendering, so an invalid config fails `next build`.
 */
export const site = siteConfigSchema.parse(raw);
