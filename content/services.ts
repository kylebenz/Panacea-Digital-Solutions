// Guide §6 — "Content services" (verbatim) plus guide §16 internal-link anchors.
export const services = {
  title: "Content services",
  video: {
    kicker: "Production",
    title: "AI-assisted healthcare advertisement videos",
    body: "Introduce your healthcare services with short-form promotional videos built around your audience, key message, and call to action. We help plan the concept, develop the script, produce and edit the video, and prepare the agreed final files.",
    // Guide §16: Home → AI Ad Videos, anchor "AI-assisted healthcare advertisement videos".
    link: { label: "More on AI-assisted healthcare advertisement videos", href: "/#ad-videos" },
    segments: ["Hook", "Message", "Call to action"],
  },
  infographic: {
    kicker: "Diagram",
    title: "Healthcare infographic images",
    body: "Make service information easier to scan with clear, visually organized infographic images. Use them to introduce services, answer common questions, highlight key steps, or support educational and awareness content.",
    // Guide §16: Home → Infographics, anchor "healthcare infographic images".
    link: { label: "More on healthcare infographic images", href: "/#infographics" },
    callouts: ["Title", "Key steps", "Call to action"],
  },
  // Guide §16: Home → Pricing, anchor "view monthly content packages".
  pricingLink: { label: "View monthly content packages", href: "/#pricing" },
} as const;
