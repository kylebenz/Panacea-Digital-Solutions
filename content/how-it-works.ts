// Chapter 03 — the monthly cycle.
export const howItWorks = {
  title: "How it runs every month.",
  steps: [
    {
      title: "Brief",
      text: "You tell us about your business, your services, your audience, and anything we must or must not say.",
    },
    {
      title: "Story ideas",
      text: "We pitch drama concepts and episode hooks for the month. You pick the ones we make.",
    },
    {
      title: "Scripting",
      text: "We write each script: characters, scenes, dialogue, and on-screen text, built around details you approve.",
    },
    {
      title: "AI production",
      text: "We produce the scenes with AI-generated characters, voices, and settings. No filming, no actors, no shoot day.",
    },
    {
      title: "Editing",
      text: "Captions, music, sound, and pacing, cut for short-form vertical feeds.",
    },
    {
      title: "Review and delivery",
      text: "You review each draft and send one round of changes. Then we deliver the final video files.",
    },
  ],
  cta: { label: "Get started", href: "/#contact" },
} as const;
