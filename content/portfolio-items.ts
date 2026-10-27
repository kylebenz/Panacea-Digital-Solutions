import type { PortfolioItem } from "@/lib/portfolio";

/*
 * Concept Samples (brief 7G). Fictional work: each renders the "Concept
 * Sample" badge. No clinical or outcome claims; process and service
 * language only.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: "introducing-a-home-care-service",
    status: "concept",
    type: "video",
    ratio: "9:16",
    fileType: "MP4",
    title: "Introducing a home care service",
    audience: "Families exploring home care",
    businessType: "Home care provider",
    goal: "Introduce a service",
    topic: "service-introductions",
    art: { motif: "house", caption: "Planning home care for someone you love?" },
  },
  {
    slug: "questions-before-choosing-home-care",
    status: "concept",
    type: "infographic",
    ratio: "4:5",
    fileType: "PNG",
    title: "Questions to ask before choosing a home care provider",
    audience: "Families comparing home care providers",
    businessType: "Home care provider",
    goal: "Answer common questions",
    topic: "common-questions",
    art: {
      kicker: "Before you choose",
      items: [
        "What services are included?",
        "How are visits scheduled?",
        "Who do we call with questions?",
        "Who plans schedule changes?",
      ],
    },
  },
  {
    slug: "do-you-accept-new-clients",
    status: "concept",
    type: "video",
    ratio: "9:16",
    fileType: "MP4",
    title: "“Do you accept new clients?”",
    audience: "People considering a wellness business",
    businessType: "Wellness business",
    goal: "Answer a common question",
    topic: "common-questions",
    art: { motif: "question", caption: "A quick answer to a question we hear often." },
  },
  {
    slug: "what-to-bring-to-your-first-appointment",
    status: "concept",
    type: "infographic",
    ratio: "1:1",
    fileType: "PNG",
    title: "What to bring to your first appointment",
    audience: "New patients of a small clinic",
    businessType: "Small clinic",
    goal: "Help visitors prepare",
    topic: "common-questions",
    art: {
      kicker: "First visit checklist",
      items: ["Photo ID", "Insurance card, if you have one", "Completed intake forms", "Your questions"],
    },
  },
  {
    slug: "how-to-book-a-first-appointment",
    status: "concept",
    type: "video",
    ratio: "9:16",
    fileType: "MP4",
    title: "How to book a first appointment",
    audience: "New patients of a small clinic",
    businessType: "Small clinic",
    goal: "Explain a process",
    topic: "process-explainers",
    art: { motif: "calendar", caption: "Booking your first visit takes three steps." },
  },
  {
    slug: "how-a-care-scheduling-app-works",
    status: "concept",
    type: "video",
    ratio: "9:16",
    fileType: "MP4",
    title: "How a care-scheduling app works",
    audience: "Families coordinating visits",
    businessType: "Healthcare startup",
    goal: "Introduce a service",
    topic: "service-introductions",
    art: { motif: "app", caption: "See every scheduled visit in one place." },
  },
  {
    slug: "our-intake-process-in-four-steps",
    status: "concept",
    type: "infographic",
    ratio: "4:5",
    fileType: "PNG",
    title: "Our intake process in four steps",
    audience: "New clients of a small clinic",
    businessType: "Small clinic",
    goal: "Explain a process",
    topic: "process-explainers",
    art: {
      kicker: "Getting started",
      items: ["Send an inquiry", "Complete a short form", "Confirm a time", "Meet the team"],
    },
  },
];

/** Shown in the sample strip near the top of the page (guide §17). */
export const stripSlugs = [
  "introducing-a-home-care-service",
  "questions-before-choosing-home-care",
  "do-you-accept-new-clients",
  "what-to-bring-to-your-first-appointment",
] as const;
