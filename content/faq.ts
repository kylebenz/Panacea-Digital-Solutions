import { siteConfig } from "@/site.config";

// FAQ. Answers adapted from guide §12 for the AI video drama service;
// guarantee, revision, client-input, specialty, and patient-story answers are
// verbatim. `links` marks phrases inside an answer that link in-page.
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: Array<{ text: string; href: string }>;
};

const [starter, growth, scale] = siteConfig.plans;

export const faq = {
  title: "Questions, answered.",
  more: "Something else on your mind?",
  cta: { label: "Ask a question", href: "/#contact" },
  items: [
    {
      id: "what-do-you-create",
      question: "What does Panacea Digital Solutions create?",
      answer:
        "Short, AI-assisted drama videos for healthcare businesses: scripted stories with AI-generated characters that explain your services. Our process includes story planning, scriptwriting, production, editing, revision, and delivery.",
    },
    {
      id: "who-are-your-services-for",
      question: "Who are your services for?",
      answer:
        "Our initial focus is healthcare startups and small healthcare businesses that need promotional content to explain their services and build awareness.",
    },
    {
      id: "do-i-have-to-film",
      question: "Do I have to film anything?",
      answer:
        "No. Every scene, character, and voice is produced with AI. You provide information and feedback; there is no shoot day.",
    },
    {
      id: "are-the-people-real",
      question: "Are the people in the videos real?",
      answer:
        "No. The characters are AI-generated, and we never present them as your real staff, patients, or clients.",
    },
    {
      id: "how-many-videos",
      question: "How many videos do I get?",
      answer: `Starter includes ${starter.videos} video dramas a month, Growth includes ${growth.videos}, and Scale includes ${scale.videos}. Every video includes one revision. See the pricing section for current package details.`,
      links: [{ text: "pricing section", href: "/#pricing" }],
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
        "We use AI tools to generate characters, voices, scenes, and settings. Outputs are reviewed for clarity, quality, and potential misleading implications. Specific tools and methods can vary by project.",
    },
    {
      id: "how-do-i-get-started",
      question: "How do I get started?",
      answer:
        "Review the monthly packages and send an inquiry describing your business, service, audience, and the story you want to tell.",
      links: [
        { text: "Review the monthly packages", href: "/#pricing" },
        { text: "send an inquiry", href: "/#contact" },
      ],
    },
  ] satisfies FaqItem[],
} as const;

export const faqAnchor = (id: string) => `faq-${id}`;
