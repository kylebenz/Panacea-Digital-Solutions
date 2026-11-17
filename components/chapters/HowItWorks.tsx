import { howItWorks } from "@/content/how-it-works";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";

/* 03 · How it works — the monthly cycle in six numbered cards. */
export function HowItWorks() {
  return (
    <Chapter id="how-it-works" title={howItWorks.title}>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="card bg-[#fff] p-6">
            <p className="text-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="text-h3 mt-2">{step.title}</h3>
            <p className="text-small mt-2 text-fg-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex justify-center">
        <Button href={howItWorks.cta.href} arrow>
          {howItWorks.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
