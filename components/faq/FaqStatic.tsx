import { faq, faqAnchor } from "@/content/faq";
import { FaqAnswer } from "./FaqAnswer";

/* No-JS / pre-hydration FAQ: every question open, each with its own anchor. */
export function FaqStatic() {
  return (
    <div className="border-t border-rule-strong">
      {faq.items.map((item, i) => (
        <div
          key={item.id}
          id={faqAnchor(item.id)}
          className="faq-item grid gap-2 border-b border-rule py-6 md:grid-cols-[3rem_1fr]"
        >
          <span className="text-mono pt-1 text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-h3">{item.question}</h3>
            <p className="measure mt-2 text-fg-muted">
              <FaqAnswer item={item} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
