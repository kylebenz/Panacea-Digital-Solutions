import { faq } from "@/content/faq";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { Button } from "@/components/primitives/Button";
import { FaqStatic } from "@/components/faq/FaqStatic";

/* 11 · Frequently Asked Questions — accordion with live filter and per-question anchors. */
export function Faq() {
  return (
    <Chapter id="faq" title={faq.title}>
      <div className="mt-12">
        <Island name="faq">
          <FaqStatic />
        </Island>
      </div>
      <div className="mt-12">
        <Button href={faq.cta.href} variant="secondary" arrow>
          {faq.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
