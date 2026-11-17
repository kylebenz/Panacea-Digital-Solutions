import { contact } from "@/content/contact";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { StaticInquiryForm, StaticOutcomes } from "@/components/contact/StaticInquiryForm";

/* 10 · Get started (ink) — a short lead-in, then the Inquiry Flow (7I). */
export function Contact() {
  return (
    <Chapter id="contact" title={contact.title}>
      <div className="mt-12 grid gap-12 lg:grid-cols-[5fr_7fr]">
        <div>
          <p className="text-h3 max-w-[30ch] font-display text-[1.75rem] leading-tight font-medium text-accent">
            {contact.leadIn}
          </p>
          <p className="text-body-l measure mt-6">{contact.leadInBody}</p>
          <p className="measure mt-6 text-fg-muted">{contact.intro}</p>
        </div>
        <div className="card p-5 sm:p-8">
          <Island name="inquiry-flow">
            <StaticOutcomes />
            <StaticInquiryForm />
          </Island>
        </div>
      </div>
    </Chapter>
  );
}
