// Guide §6 — "Healthcare content, made simpler" (verbatim).
// `parts` splits the same sentence so the five stages it names can be annotated;
// joined, the parts equal `body` exactly.
export const why = {
  title: "Healthcare content, made simpler",
  body: "Creating consistent content takes time. Panacea helps simplify the process by developing content ideas, writing scripts, producing AI-assisted advertisement videos, designing infographics, and delivering finished assets for your review. Our monthly packages are designed for healthcare businesses that want a more organized way to communicate what they offer.",
  parts: [
    { text: "Creating consistent content takes time. Panacea helps simplify the process by " },
    { text: "developing content ideas", step: "Plan" },
    { text: ", " },
    { text: "writing scripts", step: "Write" },
    { text: ", " },
    { text: "producing AI-assisted advertisement videos", step: "Produce" },
    { text: ", " },
    { text: "designing infographics", step: "Design" },
    { text: ", and " },
    { text: "delivering finished assets for your review", step: "Deliver" },
    {
      text: ". Our monthly packages are designed for healthcare businesses that want a more organized way to communicate what they offer.",
    },
  ],
} as const;

if (why.parts.map((p) => p.text).join("") !== why.body) {
  throw new Error("content/why.ts: parts must reproduce the guide copy exactly");
}
