// Guide §12 — FAQ (verbatim). `links` marks phrases inside an answer that link
// in-page (guide §16: FAQ → Pricing / Contact). Per Checkpoint 1 decision D5,
// "pricing page" stays verbatim and links to #pricing.
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: Array<{ text: string; href: string }>;
};

export const faq = {
  title: "Frequently Asked Questions",
  filterLabel: "Filter questions",
  filterPlaceholder: "Try “revision” or “AI”",
  count: (shown: number, total: number) => `Showing ${shown} of ${total} questions`,
  empty: "No questions match. Try another word, or ask us directly.",
  copyLink: (q: string) => `Copy link to “${q}”`,
  copied: "Link copied",
  // Guide §5: FAQ page CTA.
  cta: { label: "Ask a Question", href: "/#contact" },
  items: [
    {
      id: "what-do-you-create",
      question: "What does Panacea Digital Solutions create?",
      answer:
        "We create AI-assisted short-form advertisement videos and infographic images for healthcare businesses. Our process includes content planning, scriptwriting, production, editing, revision, and delivery.",
    },
    {
      id: "who-are-your-services-for",
      question: "Who are your services for?",
      answer:
        "Our initial focus is healthcare startups and small healthcare businesses that need promotional content to explain their services and build awareness.",
    },
    {
      id: "whats-in-the-packages",
      question: "What is included in the monthly packages?",
      answer:
        "Each package includes the stated number of AI-assisted advertisement videos and infographic images, with one revision per content item. Check the pricing page for the current package details.",
      links: [{ text: "pricing page", href: "/#pricing" }],
    },
    {
      id: "do-you-guarantee-results",
      question: "Do you guarantee virality or leads?",
      answer: "No. We do not guarantee virality, reach, leads, appointments, sales, or other business outcomes.",
    },
    {
      id: "what-does-one-revision-mean",
      question: "What does one revision mean?",
      answer:
        "One revision is one consolidated set of reasonable changes to a draft within the original approved direction. New concepts, substantial changes after approval, or additional versions may require a separate quote.",
    },
    {
      id: "what-does-the-client-provide",
      question: "What does the client need to provide?",
      answer:
        "Clients should provide accurate business and service details, brand assets, any required disclaimers, and timely feedback. We will confirm the specific inputs during onboarding.",
    },
    {
      id: "any-healthcare-specialty",
      question: "Can you create content for any healthcare specialty?",
      answer:
        "Suitability depends on the service, claims, assets, and review requirements. We confirm scope before accepting a project and do not invent clinical claims.",
    },
    {
      id: "patient-stories-or-images",
      question: "Can you use patient stories or images?",
      answer:
        "Only where the client has appropriate authority and permissions and the workflow meets applicable requirements. Do not send patient information through an ordinary inquiry form.",
    },
    {
      id: "how-do-you-use-ai",
      question: "How do you use AI?",
      answer:
        "AI-assisted tools may be used during creative production. Outputs are reviewed for clarity, quality, and potential misleading implications. Specific tools and methods can vary by project.",
    },
    {
      id: "how-do-i-get-started",
      question: "How do I get started?",
      answer:
        "Review the monthly packages and send an inquiry describing your business, service, audience, and content needs.",
      links: [
        { text: "Review the monthly packages", href: "/#pricing" },
        { text: "send an inquiry", href: "/#contact" },
      ],
    },
  ] satisfies FaqItem[],
} as const;

export const faqAnchor = (id: string) => `faq-${id}`;
