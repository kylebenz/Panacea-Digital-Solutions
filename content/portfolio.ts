// Guide §11 — Portfolio page (verbatim); page H1 becomes the chapter H2.
// Filter labels, card labels, and lightbox text are microcopy.
export const portfolio = {
  title: "Healthcare Advertisement Video and Infographic Samples",
  intro:
    "Explore examples of short-form promotional videos and infographic images for healthcare-related businesses. Each sample demonstrates a possible way to introduce a service, answer a common question, or make information easier to understand.",
  conceptNote:
    "Every sample here is a Concept Sample: fictional work made to show format and approach, not a client campaign.",
  filters: {
    typeLabel: "Format",
    types: [
      { id: "all", label: "All" },
      { id: "video", label: "Videos" },
      { id: "infographic", label: "Infographics" },
    ],
    topicLabel: "Topic",
    allTopics: "All topics",
  },
  count: (shown: number, total: number) => `Showing ${shown} of ${total} samples`,
  empty: "No samples match these filters.",
  reset: "Show all samples",
  card: {
    audience: "For",
    goal: "Goal",
    madeFor: "Made for",
    format: "Format",
    // Starts with the visible hover label ("Play" / "View") so the accessible
    // name contains the visible text.
    open: (verb: "Play" | "View", title: string) => `${verb} ${title}`,
  },
  lightbox: {
    close: "Close",
    transcript: "Transcript",
    placeholder: "Placeholder file. The final video will replace it.",
    captionsLabel: "English captions",
    videoLabel: (title: string) => `${title} (concept video)`,
  },
  // Guide §5: portfolio page CTA.
  cta: { label: "Request Similar Content", href: "/#contact" },
} as const;
