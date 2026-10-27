import { about } from "@/content/about";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";
import { VerifyMark } from "@/components/primitives/VerifyMark";

/* 10 · About — guide copy and the "Our commitments" ledger (absorbs Clear expectations). */
export function About() {
  return (
    <Chapter id="about" title={about.title} layout="split">
      <p className="text-statement reveal-mask">{about.intro}</p>
      <p className="text-body-l measure mt-8 text-fg-muted">{about.body}</p>
      <p className="text-small mt-6">
        <VerifyMark>{about.verifyDetails}</VerifyMark>
      </p>

      <div className="mt-16">
        <h3 className="text-display-m">{about.commitments.title}</h3>
        <ol className="mt-6 border-t border-rule-strong">
          {about.commitments.items.map((item, i) => (
            <li
              key={item.label}
              className="reveal-wipe grid gap-x-4 gap-y-1 border-b border-rule py-4 sm:grid-cols-[2.5rem_9rem_1fr] sm:items-baseline"
            >
              <span className="text-mono text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-mono">{item.label}</span>
              <span className="text-body-l">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12">
        <Button href={about.cta.href} arrow>
          {about.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
