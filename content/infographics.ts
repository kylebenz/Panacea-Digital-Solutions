// Guide §8 — Healthcare Infographics page (verbatim); page H1 becomes the chapter H2.
// `sample` and each principle's `inSample` line are microcopy for the 7F concept.
export const infographics = {
  title: "Healthcare Infographic Images for Clearer Communication",
  intro:
    "Panacea Digital Solutions creates informative infographic images that help healthcare businesses present service information in a clear, organized visual format. Infographics can support service introductions, frequently asked questions, process explanations, and general awareness content.",
  uses: ["Service introductions", "Frequently asked questions", "Process explanations", "General awareness content"],

  principles: {
    title: "Infographic content principles",
    intro: "Select a numbered point on the concept sample to see where each principle shows up.",
    items: [
      {
        id: "central-idea",
        principle: "Keep each image focused on one central idea.",
        inSample: "One question, asked in the title: what to ask before choosing. Everything else supports it.",
      },
      {
        id: "hierarchy",
        principle: "Use readable text and a clear visual hierarchy.",
        inSample:
          "Title, then four numbered questions, then the contact line. Large type, short lines, one reading order.",
      },
      {
        id: "verified",
        principle: "Verify facts and have the client approve healthcare-related claims.",
        inSample: "The approval line stays until your team has checked and signed off every statement.",
      },
      {
        id: "licensed",
        principle: "Use licensed visual assets and brand elements.",
        inSample:
          "Illustrations are drawn for the piece or come from licensed sources, alongside your own logo and colors.",
      },
      {
        id: "dimensions",
        principle: "Prepare files in the agreed dimensions and formats.",
        inSample: "This concept is set at 1080 × 1350 px, a 4:5 portrait size. Final sizes are agreed with you.",
      },
    ],
  },

  sample: {
    label: "Concept infographic: Questions to ask before choosing a home care provider",
    kicker: "For families · Home care",
    title: "Questions to ask before choosing a home care provider",
    questions: [
      "What services are included in a visit?",
      "How are visits scheduled and changed?",
      "Who do we call with questions?",
      "How are caregivers introduced to the family?",
    ],
    footerName: "[Your business name]",
    footerContact: "[Your phone or website]",
    approval: "Reviewed and approved by [Your business name]",
    size: "1080 × 1350 px",
  },

  cta: {
    lead: "Want clearer visual content for your healthcare business?",
    body: "View our monthly packages or send us an inquiry.",
    primary: { label: "Get Started", href: "/#contact" },
    pricing: { label: "View our monthly packages", href: "/#pricing" },
    portfolio: { label: "See sample infographics", href: "/#portfolio" },
  },
} as const;
