import { contact } from "@/content/contact";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { StaticInquiryForm, StaticOutcomes } from "@/components/contact/StaticInquiryForm";

/* 12 · Contact (ink) — the guide's final CTA as a lead-in, then the Inquiry Flow (7I). */
export function Contact() {
  return (
    <Chapter id="contact" title={contact.title}>
      <div className="grid-12 mt-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <p className="text-display-m max-w-[20ch] text-accent">{contact.leadIn}</p>
          <p className="text-body-l measure mt-6">{contact.leadInBody}</p>
          <p className="measure mt-6 text-fg-muted">{contact.intro}</p>
        </div>
        <div className="col-span-12 border border-rule-strong p-5 sm:p-8 lg:col-span-7">
          <Island name="inquiry-flow">
            <StaticOutcomes />
            <StaticInquiryForm />
          </Island>
        </div>
      </div>
    </Chapter>
  );
}
