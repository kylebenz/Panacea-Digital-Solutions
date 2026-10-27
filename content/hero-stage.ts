/*
 * 7A · Storyboard Assembly — microcopy for the hero stage. A fictional
 * 15-second concept ad for a generic home care business ("Sample Home Care"),
 * shown with an "Illustrative" tag. Process language only: no clinical or
 * outcome claims.
 */
export type StoryArtKind = "house" | "talk" | "path" | "message" | "calendar" | "app" | "question";

export type StoryFrame = {
  segment: "Hook" | "Message" | "Call to action";
  /** Seconds on the 15-second timeline. */
  start: number;
  end: number;
  caption: string;
  art: StoryArtKind;
  shotNote: string;
};

export const heroStage = {
  tag: "Illustrative",
  label: "Illustrative storyboard for a 15-second concept ad, with a matching infographic",
  pause: "Pause storyboard",
  play: "Play storyboard",
  brand: "Sample Home Care",
  durationSeconds: 15,
  frames: [
    {
      segment: "Hook",
      start: 0,
      end: 3,
      caption: "Planning home care for someone you love?",
      art: "house",
      shotNote: "Slow push in on a lit window",
    },
    {
      segment: "Message",
      start: 3,
      end: 8,
      caption: "We start by listening to what your family needs.",
      art: "talk",
      shotNote: "Two speech bubbles build in turn",
    },
    {
      segment: "Message",
      start: 8,
      end: 12,
      caption: "Three steps, from first message to first visit.",
      art: "path",
      shotNote: "Path draws through three numbered stops",
    },
    {
      segment: "Call to action",
      start: 12,
      end: 15,
      caption: "Send us a message to learn more.",
      art: "message",
      shotNote: "End card with brand and contact prompt",
    },
  ] satisfies StoryFrame[],
  card: {
    kicker: "Infographic · 4:5",
    title: "Getting started with home care",
    steps: ["Send an inquiry", "Talk through your needs", "Plan a first visit"],
    /** Seconds at which the title and each step build in. */
    buildAt: [1, 3, 5.5, 8],
  },
} as const;
