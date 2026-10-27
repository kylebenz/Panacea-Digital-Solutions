import { process } from "@/content/process";

/*
 * 7D · static form: a vertical stepper (mobile, reduced motion, no-JS, and
 * the pre-hydration render). Guide copy verbatim, title and body joined by
 * the guide's colon.
 */
export function ProcessList() {
  return (
    <ol className="relative mt-14 grid gap-0">
      {process.steps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[2.75rem_1fr] gap-x-4 pb-10 last:pb-0">
          {i < process.steps.length - 1 ? (
            <span aria-hidden="true" className="absolute top-10 bottom-1 left-[1.3rem] w-px bg-rule-strong" />
          ) : null}
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-full font-mono text-[0.8125rem] font-semibold shadow-[inset_0_0_0_1.5px_currentColor]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-1.5">
            <p className="text-mono text-fg-muted">
              Step {String(i + 1).padStart(2, "0")} / {String(process.steps.length).padStart(2, "0")}
            </p>
            <h3 className="text-display-m mt-2">{step.title}:</h3>
            <p className="text-body-l measure mt-2 text-fg-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
