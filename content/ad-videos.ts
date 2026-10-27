// Guide §7 — AI Advertisement Videos page (verbatim); page H1 becomes the chapter H2.
// `anatomy` is microcopy for the 7E player (brief), describing ad structure only.
export const adVideos = {
  title: "AI-Assisted Advertisement Videos for Healthcare Businesses",
  intro:
    "Panacea Digital Solutions creates short-form AI-assisted advertisement videos for healthcare businesses that want to explain their services and build awareness. We manage the creative process from initial planning and scriptwriting through video production, editing, review, and final delivery.",

  included: {
    title: "What is included",
    items: [
      { label: "Concept", text: "Content concepts aligned with your business and audience." },
      { label: "Script", text: "Scriptwriting and messaging development." },
      { label: "Production", text: "AI-assisted visual production and video editing." },
      { label: "Review", text: "A draft review process with one revision per content item." },
      { label: "Delivery", text: "Final files in the agreed formats and delivery schedule." },
    ],
  },

  anatomy: {
    title: "Anatomy of a short ad",
    intro: "The ad from the top of the page, taken apart. Drag the playhead or use the arrow keys to step through it.",
    sliderLabel: "Ad timeline playhead",
    illustrative: "Illustrative",
    segments: [
      {
        id: "hook",
        name: "Hook",
        start: 0,
        end: 3,
        note: "The first seconds name the situation your audience is in, in plain words, so the right people recognize themselves.",
      },
      {
        id: "message",
        name: "Message",
        start: 3,
        end: 12,
        note: "One service, explained simply: what it is, who it is for, and how getting started works. One idea per scene.",
      },
      {
        id: "cta",
        name: "Call to action",
        start: 12,
        end: 15,
        note: "A single next step, shown on screen and in the captions, with your business name.",
      },
    ],
    captions: {
      name: "Captions throughout",
      note: "Burned-in captions carry every line, for viewers watching with the sound off.",
    },
  },

  supports: {
    title: "What this service is designed to support",
    body: "Videos can introduce a business, explain a service, answer common questions, share general educational information, or direct viewers to an inquiry or booking step.",
    caveat: "The content and claims must be appropriate to the client's service and reviewed before publication.",
    // The five uses named in the sentence above, for the tag row.
    uses: [
      "Introduce a business",
      "Explain a service",
      "Answer common questions",
      "Share general educational information",
      "Direct viewers to an inquiry or booking step",
    ],
  },

  cta: {
    lead: "Need consistent promotional videos for your healthcare business?",
    body: "Explore our monthly content packages or contact us to discuss your requirements.",
    primary: { label: "Discuss Your Content", href: "/#contact" },
    // Guide §16: service pages → Pricing / Portfolio anchors.
    pricing: { label: "Compare content packages", href: "/#pricing" },
    portfolio: { label: "View sample videos and infographics", href: "/#portfolio" },
  },
} as const;
