// Pricing. Prices and counts are never written here: they come from site.config.ts.
export const pricing = {
  title: "Pick your monthly volume.",
  intro: "Every package is done for you, from story idea to final video, with one revision per video.",
  catalogName: "Monthly AI video drama packages",
  perMonth: "/mo",
  kickers: { starter: "Try the format", growth: "Build a series", scale: "Daily volume" } as Record<string, string>,
  recommended: "Recommended",
  videosLine: (n: number) => `${n} AI video dramas a month`,
  features: [
    "Story ideas and episode hooks",
    "Scripts written for you",
    "AI-generated characters, voices, and scenes",
    "Captions, music, and editing",
  ],
  revisionLine: "1 revision per video",

  // V-04–V-08: package terms still being confirmed.
  terms: "Package terms",
  verifyTerms: "video length, delivery schedule, payment, cancellation, and exclusions",

  // Guide §9 promotion note: current prices are 50% off. The regular price is
  // stated in plain text; no crossed-out prices, no countdowns, no urgency.
  promo: {
    badge: (percent: number) => `${percent}% off`,
    regular: (amount: string) => `Regular price ${amount}/mo`,
    note: (percent: number) => `Current offer: ${percent}% off every package.`,
    window: (start: string, end: string) => `Offer runs ${start} to ${end}.`,
    verifyDates: "offer start and end dates",
    verifyTerms: "offer terms",
  },
} as const;
