import type { VideoSlot } from "@/lib/work";

/*
 * Chapter 04 — two Concept Sample breakdowns. Both businesses are fictional;
 * no results, quotes, or clinical claims. The "opening line" is a line of
 * the sample script, not a testimonial.
 */
type Breakdown = {
  id: string;
  kicker: string;
  name: string;
  initials: string;
  meta: string;
  briefLabel: string;
  brief: string;
  madeLabel: string;
  made: string;
  scriptLabel: string;
  script: Array<{ scene: string; line: string }>;
  arrow: string;
  episodesLabel: string;
  episodes: VideoSlot[];
  openingLabel: string;
  opening: string;
  extra?: { kicker: string; title: string; text: string; phoneLabel: string };
};

const episodes = (prefix: string, titles: string[]): VideoSlot[] =>
  titles.map((title, i) => ({
    slug: `${prefix}-ep-${i + 1}`,
    title,
    subtitle: `Episode ${i + 1}`,
    ratio: "9:16",
    status: "concept",
    media: null,
  }));

export const breakdowns = {
  title: "How a drama comes together.",
  lede: "Two concept samples, from the brief to the episodes. Both businesses are fictional.",
  cta: { label: "Get started", href: "/#contact" },
  items: [
    {
      id: "lakeside",
      kicker: "Breakdown 01",
      name: "Lakeside Kids Dental",
      initials: "LK",
      meta: "Fictional pediatric dental practice · Concept Sample",
      briefLabel: "The brief",
      brief:
        "The practice wants nervous parents to know what a first visit looks like: who they meet, how long it takes, and what to bring, and nothing clinical.",
      madeLabel: "What we made",
      made: "A four-episode series following a dad and his six-year-old from the parking lot to the waiting room to the end of the visit. Each episode answers one question parents ask, and ends with a plain way to book.",
      scriptLabel: "The script",
      script: [
        { scene: "INT. CAR — MORNING", line: "MAYA (6) grips her seatbelt. Her dad checks the address twice." },
        { scene: "INT. WAITING ROOM", line: "A front-desk team member kneels to Maya's height and says hello first." },
        {
          scene: "INT. EXAM ROOM",
          line: "On-screen text: “A first visit is mostly saying hello.” (client-approved wording)",
        },
        { scene: "EXT. PARKING LOT", line: "Maya waves goodbye. End card: practice name and how to book." },
      ],
      arrow: "Script to screen",
      episodesLabel: "The episodes",
      episodes: episodes("lakeside", ["The Seatbelt", "Hello First", "The Big Chair", "Same Time Next Year"]),
      openingLabel: "Opening line of episode 1",
      opening: "“Dad, is it going to be loud?”",
    },
    {
      id: "harbor-lane",
      kicker: "Breakdown 02",
      name: "Harbor Lane Home Care",
      initials: "HL",
      meta: "Fictional home care agency · Concept Sample",
      briefLabel: "The brief",
      brief:
        "The agency wants adult children to understand how a first in-home consultation works, and that they can ask questions before deciding anything.",
      madeLabel: "What we made",
      made: "A four-part story about a daughter arranging help for her father after he moves back into his own home. The agency's process shows up as the plot moves forward, not as a sales pitch.",
      scriptLabel: "The script",
      script: [
        {
          scene: "INT. KITCHEN — NIGHT",
          line: "DANA finds three unopened letters and a note in her father's handwriting.",
        },
        {
          scene: "INT. DANA'S CAR",
          line: "She calls the agency. A coordinator asks what a normal day looks like for him.",
        },
        { scene: "INT. LIVING ROOM", line: "The consultation: questions, a schedule on paper, no pressure to sign." },
        {
          scene: "INT. KITCHEN — MORNING",
          line: "Her father makes coffee for two. End card: agency name and how to ask a question.",
        },
      ],
      arrow: "Script to screen",
      episodesLabel: "The episodes",
      episodes: episodes("harbor-lane", ["Three Letters", "The Call", "Just Questions", "Coffee for Two"]),
      openingLabel: "Opening line of episode 1",
      opening: "“Dad, when did you last open your mail?”",
      extra: {
        kicker: "Before we write",
        title: "One viewer, one message, one next step.",
        text: "Every series starts with three agreed answers: who the viewer is, what they should understand by the end, and the single action you want them to take. That brief stays fixed through every episode, so the story never drifts from what you actually offer.",
        phoneLabel: "Video placeholder: a behind-the-episode cut will play here.",
      },
    },
  ] satisfies Breakdown[],
} as const;
