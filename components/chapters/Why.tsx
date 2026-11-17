import { why } from "@/content/why";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";

/* 02 · Why drama works (ink band). */
export function Why() {
  return (
    <Chapter id="why" title={why.title} lede={<p>{why.body}</p>}>
      <p className="text-h3 mt-6 max-w-[40ch]">{why.kicker}</p>
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {why.steps.map((step, i) => (
          <li key={step.title} className="card p-6">
            <p className="text-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="text-h3 mt-2">{step.title}</h3>
            <p className="text-small mt-2 text-fg-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-fg-muted">{why.note}</p>
        <Button href={why.cta.href} arrow className="self-start sm:self-auto">
          {why.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
