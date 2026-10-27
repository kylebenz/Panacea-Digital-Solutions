import type { StoryArtKind } from "@/content/hero-stage";

/*
 * Portfolio content model (brief §8). Real client work can only be typed
 * with written permission on file; everything else is a Concept Sample and
 * renders the badge. `npm run prelaunch` re-checks this at runtime.
 */

export const topics = {
  "service-introductions": "Service introductions",
  "common-questions": "Common questions",
  "process-explainers": "Process explainers",
} as const;
export type Topic = keyof typeof topics;

export type CaptionCue = { start: number; end: number; text: string };

type VideoMedia = {
  /** Full video file. */
  src: string;
  /** WebVTT captions file (required whenever a video file exists). */
  captions: string;
  poster: string;
  /** Optional short muted loop for desktop hover previews. */
  previewSrc?: string;
  /** True while the file is a generated stand-in for the final video (O-05). */
  placeholder?: boolean;
};

type VideoAsset = {
  type: "video";
  ratio: "9:16";
  fileType: "MP4";
  /** Poster art built in SVG until real files arrive (O-05). */
  art: { motif: StoryArtKind; caption: string };
  /** Caption script; scripts/portfolio-media.ts writes the .vtt from it. */
  script: CaptionCue[];
  media: VideoMedia;
};

type InfographicAsset = {
  type: "infographic";
  ratio: "4:5" | "1:1";
  fileType: "PNG";
  art: { kicker: string; items: string[] };
};

type Base = {
  slug: string;
  title: string;
  /** Who the sample is written for. */
  audience: string;
  /** The kind of healthcare business it was made for. */
  businessType: string;
  goal: string;
  topic: Topic;
} & (VideoAsset | InfographicAsset);

export type PortfolioItem = Base &
  ({ status: "concept" } | { status: "client"; permission: { onFile: true; clientName: string; approvedAt: string } });

export function formatLabel(item: PortfolioItem) {
  return `${item.ratio} · ${item.fileType}`;
}

export const mediaPaths = (slug: string) => ({
  src: `/media/portfolio/${slug}.mp4`,
  captions: `/media/portfolio/${slug}.vtt`,
  poster: `/media/portfolio/${slug}-poster.webp`,
});

/** WebVTT text for a caption script. */
export function toVtt(cues: CaptionCue[]) {
  const ts = (s: number) =>
    `00:00:${String(Math.floor(s)).padStart(2, "0")}.${String(Math.round((s % 1) * 1000)).padStart(3, "0")}`;
  return ["WEBVTT", "", ...cues.flatMap((c, i) => [String(i + 1), `${ts(c.start)} --> ${ts(c.end)}`, c.text, ""])].join(
    "\n",
  );
}
