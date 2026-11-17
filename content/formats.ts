// Chapter 06 — where the dramas will run. Advice, not a claim.
export const formats = {
  title: "Where will your dramas run?",
  lede: "We shape each video for the place it will be posted.",
  recommended: "Recommended",
  options: [
    {
      id: "organic",
      title: "Organic",
      text: "Episodes for your own profiles. Recurring characters give people a reason to come back for the next one. It takes steady posting.",
    },
    {
      id: "both",
      title: "Both",
      text: "Run one episode as an ad, and the rest of the series is waiting on your profile when people look you up.",
      featured: true,
    },
    {
      id: "paid",
      title: "Paid ads",
      text: "Tighter cuts with a clear call to action, for campaigns you or your agency run. We make the videos; buying and managing the ads stays with you.",
    },
  ],
} as const;
