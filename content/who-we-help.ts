// Guide §6 — "Who we help" (verbatim), split into its two sentences so the
// suitability caveat can sit under the chips. Joined with a space they equal
// the guide paragraph. Audience names are from guide §3; each `line` is
// visitor-facing microcopy derived from the guide's "website response"
// column (approved at Checkpoint 1, D4).
export const whoWeHelp = {
  title: "Who we help",
  body: "Our content services are designed for healthcare startups, small clinics, home care providers, wellness businesses, and other healthcare organizations that need clear promotional content. Project suitability depends on the service, claims, assets, and review requirements involved.",
  intro:
    "Our content services are designed for healthcare startups, small clinics, home care providers, wellness businesses, and other healthcare organizations that need clear promotional content.",
  caveat: "Project suitability depends on the service, claims, assets, and review requirements involved.",
  chipsLabel: "Choose the description closest to you",
  audiences: [
    {
      id: "founders",
      name: "Healthcare startup founders",
      line: "See how the monthly packages work, what each one includes, and how to get started.",
      link: { label: "Compare the monthly packages", href: "/#pricing" },
    },
    {
      id: "clinics",
      name: "Small clinics and practices",
      line: "Browse sample videos and infographics, then see how the content process works from brief to delivery.",
      link: { label: "Browse sample work", href: "/#portfolio" },
    },
    {
      id: "home-care",
      name: "Home care providers",
      line: "See concept samples written for home care in respectful, accurate, plain service language.",
      link: { label: "See home care concept samples", href: "/#portfolio" },
    },
    {
      id: "managers",
      name: "Healthcare marketing managers",
      line: "Review the workflow, deliverables, revision terms, and how communication works during each monthly cycle.",
      link: { label: "Follow the four-step process", href: "/#process" },
    },
    {
      id: "new-brands",
      name: "New healthcare brands",
      line: "Compare sample formats and packages side by side, then send an inquiry when you are ready.",
      link: { label: "Send an inquiry", href: "/#contact" },
    },
  ],
} as const;

if (`${whoWeHelp.intro} ${whoWeHelp.caveat}` !== whoWeHelp.body) {
  throw new Error("content/who-we-help.ts: intro + caveat must reproduce the guide copy exactly");
}
