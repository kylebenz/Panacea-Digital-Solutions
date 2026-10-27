// Guide §10 — About page (verbatim); page H1 becomes the chapter H2.
// "Our commitments" merges the About commitments with guide §6 "Clear
// expectations" (brief 4.1). Per Checkpoint 1 decision D6, the About clause
// "and we do not promise viral reach or guaranteed business outcomes" is
// dropped because the Clear expectations sentence states it in full.
export const about = {
  title: "A Creative Content Partner for Healthcare Businesses",
  intro:
    "Panacea Digital Solutions was built around a simple idea: healthcare businesses should be able to explain their services clearly without having to manage every part of content production themselves.",
  body: "We help organize the creative process—from planning content ideas and writing scripts to producing AI-assisted promotional videos, designing infographic images, managing revisions, and delivering final assets. Our focus is clear communication, defined scope, and a dependable client experience.",
  // V-11: guide §10 says to add only verified founder, experience, location, or history details.
  verifyDetails: "founder, experience, location, or business history — add only verified details, or remove this line",
  commitments: {
    title: "Our commitments",
    items: [
      {
        label: "Clear content",
        text: "We believe effective healthcare content should be understandable, respectful, and accurate.",
      },
      { label: "Your approval", text: "Clients review and approve healthcare-related claims before publication." },
      { label: "Purpose", text: "Our content is created for informational and promotional purposes." },
      {
        label: "No guarantees",
        text: "We do not guarantee virality, reach, leads, appointments, sales, or other business outcomes.",
      },
      {
        label: "Many factors",
        text: "Results depend on many factors, including the offer, audience, distribution, and campaign strategy.",
      },
    ],
  },
  // Guide §5: About page CTA.
  cta: { label: "Work With Us", href: "/#contact" },
} as const;
