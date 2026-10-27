import type { StoryArtKind } from "@/content/hero-stage";

/*
 * 7C · Script-to-Screen — all 12 combinations, pre-authored (no runtime AI).
 * Illustrative concepts only: placeholders in [brackets], process and service
 * language, no clinical claims, no outcome claims.
 */

export const businessTypes = [
  { id: "home-care", label: "Home care provider" },
  { id: "clinic", label: "Small clinic" },
  { id: "wellness", label: "Wellness business" },
  { id: "startup", label: "Healthcare startup" },
] as const;

export const goals = [
  { id: "introduce", label: "Introduce a service" },
  { id: "question", label: "Answer a common question" },
  { id: "inquiry", label: "Invite an inquiry" },
] as const;

export type BusinessTypeId = (typeof businessTypes)[number]["id"];
export type GoalId = (typeof goals)[number]["id"];

export type DemoFrame = { art: StoryArtKind; note: string };

export type DemoConcept = {
  script: { hook: string; message: string; cta: string };
  /** Four frames: hook, message, message, call to action. */
  frames: [DemoFrame, DemoFrame, DemoFrame, DemoFrame];
  outline: { title: string; blocks: string[] };
};

export const demoCopy = {
  title: "See how a short ad comes together",
  lede: "Pick a type of healthcare business and a goal. The panel shows how one brief becomes a 15-second script, a four-frame storyboard, and a matching infographic outline.",
  businessLabel: "Business type",
  goalLabel: "Goal",
  views: { script: "Script", storyboard: "Storyboard", outline: "Infographic outline" },
  segments: [
    { key: "hook", label: "Hook", time: "0–3s" },
    { key: "message", label: "Message", time: "3–12s" },
    { key: "cta", label: "Call to action", time: "12–15s" },
  ],
  frameLabel: "Frame",
  illustrative: "Illustrative",
  // Brief 7C — panel footer and CTA (verbatim).
  footer:
    "Illustrative concept. Every real script is built from your verified service details and approved by you before publication.",
  cta: { label: "Discuss Your Content", href: "/#contact" },
} as const;

const endCard = (detail: string): DemoFrame => ({
  art: "message",
  note: `End card: logo, ${detail}, call to action in captions`,
});

export const concepts: Record<BusinessTypeId, Record<GoalId, DemoConcept>> = {
  "home-care": {
    introduce: {
      script: {
        hook: "Looking for help at home for someone you care about?",
        message:
          "[Your business name] offers in-home support in [Your city or service area]. Here’s what a visit can include and how scheduling works.",
        cta: "Send us a message to talk through your needs.",
      },
      frames: [
        { art: "house", note: "Exterior at dusk, one warm window; hook as on-screen text" },
        { art: "talk", note: "Two speech bubbles: the family’s question, your answer" },
        { art: "calendar", note: "Week view with visit times highlighted" },
        endCard("[Your booking link]"),
      ],
      outline: {
        title: "What in-home support from [Your business name] includes",
        blocks: [
          "Services offered: [List of your services]",
          "Where we work: [Your city or service area]",
          "How visits are scheduled",
          "How to get in touch",
        ],
      },
    },
    question: {
      script: {
        hook: "“Can visits fit around our family’s schedule?”",
        message: "A question families often ask. Here’s how [Your business name] plans visit times with you.",
        cta: "Have a different question? Send it to us.",
      },
      frames: [
        { art: "question", note: "The question types itself on screen" },
        { art: "calendar", note: "Calendar fills in with preferred times" },
        { art: "path", note: "Three steps to a visit plan, drawn as a path" },
        endCard("[Your phone or website]"),
      ],
      outline: {
        title: "How visit scheduling works",
        blocks: [
          "You share the times that suit your family",
          "We confirm a visit plan with you",
          "How to request a change",
          "Contact: [Your phone or website]",
        ],
      },
    },
    inquiry: {
      script: {
        hook: "Thinking about home care, but not sure where to start?",
        message:
          "Starting a conversation is simple. Tell us a little about your situation and we’ll explain the options [Your business name] offers.",
        cta: "Send an inquiry at [Your booking link].",
      },
      frames: [
        { art: "house", note: "Slow push toward the front door" },
        { art: "talk", note: "Short exchange in speech bubbles" },
        { art: "path", note: "First message → conversation → first visit" },
        endCard("[Your booking link]"),
      ],
      outline: {
        title: "Getting started with [Your business name]",
        blocks: ["Send an inquiry", "Talk through your needs", "Plan a first visit"],
      },
    },
  },

  clinic: {
    introduce: {
      script: {
        hook: "New to [Your business name]?",
        message: "Here’s where to find us in [Your city or service area], how to book, and which services we offer.",
        cta: "Book a first appointment at [Your booking link].",
      },
      frames: [
        { art: "house", note: "Building exterior with the sign in frame" },
        { art: "app", note: "List of services builds line by line" },
        { art: "calendar", note: "Booking calendar with an open slot" },
        endCard("[Your booking link]"),
      ],
      outline: {
        title: "Visiting [Your business name] for the first time",
        blocks: ["Where we are: [Your address]", "Services: [List of your services]", "Booking: [Your booking link]"],
      },
    },
    question: {
      script: {
        hook: "“What should I bring to my first appointment?”",
        message:
          "A short list helps your visit start smoothly: photo ID, insurance details if you have them, and any forms we sent you.",
        cta: "More questions? Call us at [Your phone number].",
      },
      frames: [
        { art: "question", note: "The question as on-screen text" },
        { art: "app", note: "Checklist items tick in one by one" },
        { art: "calendar", note: "Appointment day highlighted" },
        endCard("[Your phone number]"),
      ],
      outline: {
        title: "What to bring to your first appointment",
        blocks: ["Photo ID", "Insurance card, if you have one", "Completed intake forms", "Your questions"],
      },
    },
    inquiry: {
      script: {
        hook: "Ready to book, or have a question first?",
        message:
          "You can request an appointment online or send a quick message. Our team will follow up about available times.",
        cta: "Request a time at [Your booking link].",
      },
      frames: [
        { art: "question", note: "Two options appear side by side" },
        { art: "calendar", note: "Online request: pick a preferred day" },
        { art: "talk", note: "Message option: a short note and a reply" },
        endCard("[Your booking link]"),
      ],
      outline: {
        title: "Two ways to reach [Your business name]",
        blocks: [
          "Request an appointment online",
          "Send a message with your question",
          "What happens after you reach out",
        ],
      },
    },
  },

  wellness: {
    introduce: {
      script: {
        hook: "Curious what a session at [Your business name] looks like?",
        message: "Here’s what to expect: how sessions are booked, how long they last, and what to bring.",
        cta: "See the schedule at [Your booking link].",
      },
      frames: [
        { art: "house", note: "Studio exterior, morning light" },
        { art: "calendar", note: "Session times on a weekly schedule" },
        { art: "app", note: "What to bring, as a short list" },
        endCard("[Your booking link]"),
      ],
      outline: {
        title: "What to expect at [Your business name]",
        blocks: ["How to book a session", "Session length: [Session length]", "What to bring", "Where to find us"],
      },
    },
    question: {
      script: {
        hook: "“Do I need experience before my first class?”",
        message:
          "Here’s how [Your business name] introduces new clients to each class, and who to ask if you’re unsure.",
        cta: "Ask us anything at [Your phone or website].",
      },
      frames: [
        { art: "question", note: "The question as on-screen text" },
        { art: "path", note: "Arrive, check in, start the class" },
        { art: "talk", note: "A question to the instructor, answered" },
        endCard("[Your phone or website]"),
      ],
      outline: {
        title: "Your first class at [Your business name]",
        blocks: [
          "Arrive a few minutes early",
          "Tell the instructor it’s your first class",
          "Ask which options suit you",
        ],
      },
    },
    inquiry: {
      script: {
        hook: "Have a question before you book?",
        message: "Send us a short message. We’ll follow up about schedules, pricing, and which option might fit.",
        cta: "Message us at [Your booking link].",
      },
      frames: [
        { art: "question", note: "Question mark builds in a speech bubble" },
        { art: "talk", note: "Your message and the reply" },
        { art: "calendar", note: "Schedule options appear" },
        endCard("[Your booking link]"),
      ],
      outline: {
        title: "Before you book",
        blocks: ["Check the class schedule", "Send us your questions", "Choose a time that works"],
      },
    },
  },

  startup: {
    introduce: {
      script: {
        hook: "Coordinating care across a busy family calendar?",
        message: "[Your app name] brings schedules and reminders into one place. Here’s how it works in three screens.",
        cta: "Learn more at [Your website].",
      },
      frames: [
        { art: "calendar", note: "Crowded calendar, hook as on-screen text" },
        { art: "app", note: "Screen one: one shared schedule" },
        { art: "path", note: "Screens two and three, connected" },
        endCard("[Your website]"),
      ],
      outline: {
        title: "How [Your app name] works",
        blocks: ["Add the people involved", "Share one schedule", "Get reminders before each visit"],
      },
    },
    question: {
      script: {
        hook: "“How does setup work?”",
        message: "Getting started takes a few steps. Here’s what you’ll see on day one with [Your app name].",
        cta: "Read the setup guide at [Your website].",
      },
      frames: [
        { art: "question", note: "The question as on-screen text" },
        { art: "app", note: "Account screen, fields filling in" },
        { art: "path", note: "Invite family, add first schedule" },
        endCard("[Your website]"),
      ],
      outline: {
        title: "Setting up [Your app name]",
        blocks: ["Create an account", "Invite family members", "Add your first schedule"],
      },
    },
    inquiry: {
      script: {
        hook: "Working on care coordination at your organization?",
        message: "If you’d like to see [Your app name] in action, request a walkthrough with our team.",
        cta: "Request a walkthrough at [Your website].",
      },
      frames: [
        { art: "house", note: "Organization exterior, hook on screen" },
        { art: "app", note: "Product screens in sequence" },
        { art: "talk", note: "Request → confirmation in speech bubbles" },
        endCard("[Your website]"),
      ],
      outline: {
        title: "Request a walkthrough",
        blocks: ["Tell us about your team", "Pick a time", "See the product with our team"],
      },
    },
  },
};
