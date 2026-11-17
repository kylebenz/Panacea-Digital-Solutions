// Chapter 09 — the fit check before the form.
export const fit = {
  title: "Please don’t sign up if this isn’t you.",
  yes: {
    title: "Get started if",
    items: [
      "You run a healthcare startup or a small healthcare business in the U.S.",
      "You want short video content every month without filming anything.",
      "You’re comfortable with AI-generated characters, voices, and scenes.",
      "You can review drafts and send one clear round of changes per video.",
    ],
  },
  no: {
    title: "Skip it if",
    items: [
      "You need live footage of your real staff, patients, or location.",
      "You want us to write medical advice or clinical claims for you.",
      "You want someone to promise views, leads, or new patients.",
      "You want someone to post for you or run your ad campaigns.",
    ],
  },
  cta: { label: "Get started", href: "/#contact" },
} as const;
