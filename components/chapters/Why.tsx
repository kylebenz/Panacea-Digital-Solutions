import { why } from "@/content/why";
import { Chapter } from "@/components/layout/Chapter";

/*
 * 01 · The guide's paragraph set as one large editorial statement. The five
 * stages it names are annotated in the diagram language — hairline
 * underline plus a numbered superscript — and repeated as a measured ruler.
 */
export function Why() {
  const steps = why.parts.filter((part) => "step" in part);
  return (
    <Chapter id="why" title={why.title} layout="split">
      <p className="text-statement reveal-mask">
        {why.parts.map((part, i) => {
          if (!("step" in part)) return <span key={i}>{part.text}</span>;
          const n = steps.indexOf(part) + 1;
          return (
            <span key={i} className="underline decoration-verdigris decoration-1 underline-offset-[0.2em]">
              {part.text}
              <sup
                aria-hidden="true"
                className="ml-0.5 align-super font-mono text-[0.75rem] font-medium tracking-normal text-verdigris"
              >
                {String(n).padStart(2, "0")}
              </sup>
            </span>
          );
        })}
      </p>

      <ol className="mt-14 grid grid-cols-5 border-t border-rule-strong" aria-hidden="true">
        {steps.map((part, i) => (
          <li key={part.step} className="relative pt-4">
            <span className="absolute -top-px left-0 h-3 w-px bg-rule-strong" />
            <span className="text-mono block text-verdigris">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-mono mt-1 block text-fg">{part.step}</span>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}
