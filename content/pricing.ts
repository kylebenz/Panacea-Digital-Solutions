// Guide §9 — Pricing page (verbatim where quoted); page H1 becomes the chapter H2.
// Prices and counts are never written here: they come from site.config.ts.
export const pricing = {
  title: "Monthly Healthcare Content Packages",
  intro:
    "Choose a monthly content package based on how many promotional assets your healthcare business needs. Every package includes AI-assisted advertisement videos, infographic images, and one revision per content item.",
  perMonth: "/ month",
  // Guide §9 table wording.
  videosLine: (n: number) => `${n} AI advertisement videos`,
  infographicsLine: (n: number) => `${n} infographic images`,
  revisionLine: "1 revision per content item",
  perItem: (amount: string) => `≈ ${amount} per content item`,
  perItemNote: "Monthly price divided by the number of videos and infographics.",
  tilesLabel: { videos: "Videos", infographics: "Infographics" },
  planKicker: (n: number) => `Package ${String(n).padStart(2, "0")}`,

  revision: {
    title: "What one revision covers",
    toggleLabel: "Revision explainer",
    included: {
      label: "Included in your revision",
      // Guide §12, first sentence of "What does one revision mean?"
      definition:
        "One revision is one consolidated set of reasonable changes to a draft within the original approved direction.",
      examples: [
        "Adjusting on-screen text wording",
        "Tightening captions",
        "Reordering points within the approved direction",
      ],
      verify: "confirm these examples of included changes",
    },
    separate: {
      label: "Needs a separate quote",
      // Guide §12, second sentence.
      definition:
        "New concepts, substantial changes after approval, or additional versions may require a separate quote.",
      examples: ["New concepts", "Substantial changes after approval", "Additional versions"],
      verify: "confirm these examples of separately quoted work",
    },
    examplesLabel: "Examples",
  },

  terms: {
    title: "Package terms",
    intro: "These details are being confirmed and will be listed here before launch.",
    // Guide §9 "Pricing terms to explain on the page".
    items: [
      {
        label: "Video length, formats, captions, voiceover, and AI-avatar options",
        verify: "standard video specifications",
      },
      { label: "What one revision includes and what counts as extra work", verify: "extra-work definition" },
      { label: "When the monthly cycle begins and the delivery schedule", verify: "cycle start and delivery schedule" },
      { label: "Payment, renewal, cancellation, and unused deliverables", verify: "payment and cancellation terms" },
      { label: "Excluded third-party costs and special production requests", verify: "exclusions" },
    ],
  },

  promo: {
    regular: (amount: string) => `Regular price ${amount}`,
    window: (start: string, end: string) => `Offer runs ${start} to ${end}.`,
  },
} as const;
