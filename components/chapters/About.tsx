import { about } from "@/content/about";
import { site } from "@/lib/site";
import { Chapter } from "@/components/layout/Chapter";
import { VerifyMark } from "@/components/primitives/VerifyMark";

/* 05 · About — heading left, story and plain facts right. */
export function About() {
  const counts = site.plans.map((plan) => plan.videos);
  const facts = [about.facts.videos(Math.min(...counts), Math.max(...counts)), about.facts.revision, about.facts.cast];
  return (
    <Chapter id="about" title={about.title} layout="split">
      <div className="grid content-start gap-4 lg:pt-8">
        {about.body.map((paragraph) => (
          <p key={paragraph} className="text-fg-muted">
            {paragraph}
          </p>
        ))}
        <p className="text-small">
          <VerifyMark>{about.verifyDetails}</VerifyMark>
        </p>
        <ul className="mt-2 flex flex-wrap gap-3">
          {facts.map((fact) => (
            <li key={fact.label} className="card bg-[#fff] px-4 py-3">
              <p className="font-display text-[1.375rem] leading-none font-medium text-accent">{fact.value}</p>
              <p className="mt-1 text-[0.75rem] text-fg-muted">{fact.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  );
}
