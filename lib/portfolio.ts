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

type VideoMedia = {
  /** Full video file. Captions are required whenever a file exists. */
  src: string;
  captions: string;
  poster: string;
  /** Optional short muted loop for desktop hover previews. */
  previewSrc?: string;
};

type VideoAsset = {
  type: "video";
  ratio: "9:16";
  fileType: "MP4";
  /** Poster art built in SVG until real files arrive (O-05). */
  art: { motif: StoryArtKind; caption: string };
  media?: VideoMedia;
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
