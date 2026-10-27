// Guide §6 — Hero section (verbatim).
export const hero = {
  eyebrow: "AI-assisted healthcare content",
  title: "AI Healthcare Advertisement Videos and Infographics",
  body: "Panacea Digital Solutions helps healthcare startups and small healthcare businesses explain their services through short promotional videos and informative infographic images. We handle content planning, scriptwriting, creative production, editing, and delivery in one clear process.",
  // The same copy as two paragraphs, so the H1 stays the largest text block
  // (the LCP element) on narrow screens. Joined with a space they equal `body`.
  bodyParagraphs: [
    "Panacea Digital Solutions helps healthcare startups and small healthcare businesses explain their services through short promotional videos and informative infographic images.",
    "We handle content planning, scriptwriting, creative production, editing, and delivery in one clear process.",
  ],
  primaryCta: { label: "Get Started", href: "/#contact" },
  secondaryCta: { label: "View Sample Work", href: "/#portfolio" },
} as const;

if (hero.bodyParagraphs.join(" ") !== hero.body) {
  throw new Error("content/hero.ts: bodyParagraphs must reproduce the guide copy exactly");
}
