// Guide §6 — "How it works" (verbatim). Each step is the guide's line split at
// its colon: `title` + ": " + `body` reproduces the guide text exactly.
export const process = {
  title: "How it works",
  tabsLabel: "How it works, step by step",
  hint: "Scroll, or choose a clip, to move the playhead.",
  steps: [
    { title: "Plan the content", body: "we learn about your business, audience, services, and goals." },
    {
      title: "Write and create",
      body: "we develop content ideas and scripts, then produce video and infographic drafts.",
    },
    {
      title: "Review and revise",
      body: "you review the drafts and provide one consolidated revision request per content item.",
    },
    {
      title: "Deliver the files",
      body: "we hand over the agreed final assets according to the confirmed schedule.",
    },
  ],
} as const;

export const processLines = process.steps.map((s) => `${s.title}: ${s.body}`);
