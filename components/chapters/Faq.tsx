import { faq, faqAnchor } from "@/content/faq";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";
import { FaqAnswer } from "@/components/faq/FaqAnswer";

/*
 * 07 · FAQ — native <details> accordion: works without JavaScript, keyboard
 * and screen-reader friendly, and ships no client code.
 */
export function Faq() {
  return (
    <Chapter id="faq" title={faq.title} align="center">
      <div className="mx-auto mt-12 grid max-w-2xl gap-2.5">
        {faq.items.map((item) => (
          <details key={item.id} id={faqAnchor(item.id)} className="faq card group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-card px-5 py-3.5 text-[0.9375rem] font-semibold [&::-webkit-details-marker]:hidden">
              <h3>{item.question}</h3>
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                className="h-3 w-3 shrink-0 text-accent transition-transform duration-[var(--dur-2)] ease-[var(--ease-cut)] group-open:rotate-45"
                fill="none"
              >
                <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </summary>
            <p className="text-small px-5 pb-5 text-fg-muted">
              <FaqAnswer item={item} />
            </p>
          </details>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-small text-fg-muted">{faq.more}</p>
        <Button href={faq.cta.href} variant="secondary" arrow size="sm">
          {faq.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
