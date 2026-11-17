/*
 * Video slots for the work wall and the breakdowns (guardrail 4). Every slot
 * starts as an empty placeholder. To add a finished video, drop the files in
 * public/media/work/ and fill in `media` for that slot.
 *
 * Fictional or speculative work is a Concept Sample and always shows the
 * badge. Real client work can only be typed with written permission on file;
 * `npm run prelaunch` re-checks this at runtime.
 */

export type VideoMedia = {
  /** e.g. "/media/work/first-visit-nerves.mp4" */
  src: string;
  /** WebVTT captions, e.g. "/media/work/first-visit-nerves.vtt". */
  captions: string;
  /** Still frame shown before playback, e.g. "/media/work/first-visit-nerves.webp". */
  poster: string;
};

type SlotBase = {
  slug: string;
  title: string;
  /** Second line under the title, e.g. the kind of business. */
  subtitle: string;
  /** Aspect ratio of the frame. Vertical by default. */
  ratio?: "9:16" | "4:5" | "1:1";
  /** null until the video is added. */
  media: VideoMedia | null;
};

export type VideoSlot = SlotBase &
  ({ status: "concept" } | { status: "client"; permission: { onFile: true; clientName: string; approvedAt: string } });
