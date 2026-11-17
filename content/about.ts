// Chapter 05. Adapted from guide §10 for the AI video drama service.
export const about = {
  title: "A drama studio built for healthcare businesses.",
  body: [
    "Panacea Digital Solutions was built around a simple idea: healthcare businesses should be able to explain their services clearly without having to manage every part of content production themselves.",
    "We do it through short drama. We plan the stories, write the scripts, produce the scenes with AI, edit, manage revisions, and deliver the final videos. Our focus is clear communication, defined scope, and a dependable client experience.",
  ],
  // V-11: guide §10 says to add only verified founder, experience, location, or history details.
  verifyDetails: "founder, experience, location, or business history — add only verified details, or remove this line",
  // Facts drawn from site.config.ts; no invented statistics.
  facts: {
    videos: (min: number, max: number) => ({ value: `${min}–${max}`, label: "videos a month" }),
    revision: { value: "1", label: "revision per video" },
    cast: { value: "100%", label: "AI-generated cast" },
  },
} as const;
