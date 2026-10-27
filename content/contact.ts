// Guide §6 final CTA and §13 Contact page (verbatim); form labels are the
// guide's suggested fields. Step names, hints, errors, and states are microcopy.
export const contact = {
  title: "Tell Us About Your Healthcare Content Needs",
  leadIn: "Help people understand the healthcare services you provide.",
  leadInBody:
    "Tell us about your business and the content you need. We’ll help you review the available monthly packages and decide on a suitable next step.",
  intro:
    "Tell us a little about your healthcare business and what you want your content to communicate. We’ll review your inquiry and follow up about the next step.",
  // Guide §13 form note (verbatim). Shown at the top of the form and beside the message field.
  phiNotice:
    "Please do not submit patient names, medical records, protected health information, or other sensitive patient details through this form.",
  phiLabel: "Before you write",
  submit: "Send Inquiry",
  sending: "Sending…",
  next: "Continue",
  back: "Back",
  stepLabel: (n: number, total: number) => `Step ${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
  steps: [
    { id: "you", title: "You" },
    { id: "business", title: "Business" },
    { id: "content", title: "Content" },
  ],
  fields: {
    name: { label: "Name" },
    email: { label: "Business email", hint: "We’ll reply to this address." },
    contactMethod: {
      label: "Preferred contact method",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone call" },
        { value: "video", label: "Video call" },
      ],
    },
    phone: { label: "Phone number", hint: "Only if you chose a phone call." },
    businessName: { label: "Healthcare business name" },
    website: { label: "Website or social profile" },
    specialty: {
      label: "Healthcare specialty or service type",
      hint: "For example: home care, physical therapy, telehealth app.",
    },
    package: { label: "Package of interest", notSure: "Not sure yet" },
    message: { label: "What services or message do you want to promote?" },
  },
  errors: {
    name: "Enter your name.",
    email: "Enter an email address in the format name@business.com.",
    contactMethod: "Choose how you’d like us to contact you.",
    phone: "Enter a phone number, or choose another contact method.",
    businessName: "Enter your healthcare business name.",
    website: "Enter a full web address, like https://example.com, or leave this blank.",
    specialty: "Tell us your specialty or service type.",
    message: "Tell us a little about what you want to promote (at least 20 characters).",
    summary: (n: number) => (n === 1 ? "1 field needs attention." : `${n} fields need attention.`),
  },
  success: {
    title: "Thank you. Your inquiry is on its way.",
    body: "We’ll review your inquiry and follow up about the next step using the contact method you chose. You don’t need to do anything else for now.",
  },
  failure: {
    title: "Your inquiry wasn’t sent.",
    body: "Something went wrong on our side. Your answers are still here, so please try again in a moment.",
    retry: "Try again",
  },
  noJsMissing: {
    title: "A few details were missing.",
    body: "Please go back to the form, fill in every field marked as required, and send it again.",
  },
} as const;
