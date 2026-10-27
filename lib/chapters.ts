import type { SiteConfigInput } from "@/lib/config-schema";
import { siteConfig } from "@/site.config";

/*
 * Chapter helpers safe for client components (no validation imports).
 * Header nav, rail, footer nav, and mobile menu all derive from this list.
 */
export type ChapterEntry = SiteConfigInput["chapters"][number];

export const chapters: readonly ChapterEntry[] = siteConfig.chapters;
export const navChapters = chapters.filter(
  (chapter): chapter is ChapterEntry & { nav: string } => typeof chapter.nav === "string",
);

export function chapterById(id: string) {
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) throw new Error(`Unknown chapter "${id}"`);
  return chapter;
}

/** `CH 09 · 00:09:00 — PRICING` */
export function chapterTimecode(number: string) {
  return `00:${number}:00`;
}

export function chapterHref(id: string) {
  return `/#${id}`;
}
