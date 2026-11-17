import type { VideoSlot } from "@/lib/work";

/*
 * Work wall (chapter 01). Every slot is an empty placeholder until the video
 * file is added; see lib/work.ts. All titles are fictional Concept Samples,
 * written without clinical or outcome claims.
 */
export const work = {
  title: "Drama samples",
  lede: "Short, scripted stories for healthcare businesses. Videos are being added; each slot below plays its episode once the file is in.",
  cta: { label: "Get started", href: "/#contact" },
  placeholder: "Video coming soon",
  // Three columns, top to bottom, left to right on wide screens.
  columns: [
    [
      {
        slug: "first-visit-nerves",
        title: "First Visit Nerves",
        subtitle: "Pediatric dental practice",
        ratio: "4:5",
        status: "concept",
        media: null,
      },
      {
        slug: "the-front-desk",
        title: "The Front Desk at 8:02",
        subtitle: "Clinic scheduling app",
        ratio: "9:16",
        status: "concept",
        media: null,
      },
      {
        slug: "moving-mom-home",
        title: "Moving Mom Home",
        subtitle: "Home care agency",
        ratio: "1:1",
        status: "concept",
        media: null,
      },
    ],
    [
      {
        slug: "appointment-from-the-couch",
        title: "Appointment from the Couch",
        subtitle: "Telehealth startup",
        ratio: "9:16",
        status: "concept",
        media: null,
      },
      {
        slug: "night-shift-day-off",
        title: "Night Shift, Day Off",
        subtitle: "Home care agency, hiring",
        ratio: "4:5",
        status: "concept",
        media: null,
      },
    ],
    [
      {
        slug: "the-missed-refill",
        title: "The Missed Refill",
        subtitle: "Independent pharmacy",
        ratio: "1:1",
        status: "concept",
        media: null,
      },
      {
        slug: "who-picks-up",
        title: "Who Picks Up the Phone",
        subtitle: "Physical therapy clinic",
        ratio: "9:16",
        status: "concept",
        media: null,
      },
      {
        slug: "the-paperwork-pile",
        title: "The Paperwork Pile",
        subtitle: "Medical billing service",
        ratio: "4:5",
        status: "concept",
        media: null,
      },
    ],
  ] satisfies VideoSlot[][],
} as const;
