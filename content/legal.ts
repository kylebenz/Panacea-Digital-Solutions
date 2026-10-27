// Brief 4.3 — legal page shells. Real policies need qualified review (V-02, V-03).
const review = "requires qualified review for the actual business and jurisdiction";

export const legal = {
  privacy: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Panacea Digital",
    description: "How Panacea Digital Solutions handles information submitted through this website.",
    verify: review,
    // Topics the finished policy is expected to cover (guide §15, §19; brief §2, §7).
    outline: [
      "What the inquiry form collects, and that it must not be used for patient information",
      "How inquiries are forwarded and stored, and for how long",
      "Analytics in use and any consent choices",
      "How to ask about, correct, or delete your information",
      "How to contact us about privacy",
    ],
  },
  terms: {
    title: "Terms of Service",
    metaTitle: "Terms of Service | Panacea Digital",
    description: "Terms for using the Panacea Digital Solutions website and services.",
    verify: review,
    outline: [
      "Monthly packages: deliverables, revisions, and delivery schedule",
      "Payment, renewal, and cancellation",
      "Client responsibilities, approvals, and healthcare-related claims",
      "Use of AI-assisted tools and licensed assets",
      "Limitations: no guaranteed outcomes",
    ],
  },
  outlineLabel: "This page will cover",
  lastUpdated: "Last updated",
  back: "Back to the main page",
} as const;
