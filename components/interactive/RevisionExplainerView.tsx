import { pricing } from "@/content/pricing";
import { VerifyMark } from "@/components/primitives/VerifyMark";

type Side = "included" | "separate";

/* One side of the revision explainer: guide definition + examples ([VERIFY]). */
export function RevisionSide({ side }: { side: Side }) {
  const data = pricing.revision[side];
  return (
    <div className={side === "included" ? "border-l-2 border-teal pl-5" : "border-l-2 border-remedy pl-5"}>
      <p className="text-h3">{data.label}</p>
      <p className="measure mt-2 text-fg-muted">{data.definition}</p>
      <p className="text-mono mt-5 text-fg-muted">
        {pricing.revision.examplesLabel} <VerifyMark>{data.verify}</VerifyMark>
      </p>
      <ul className="mt-3 grid gap-2">
        {data.examples.map((example) => (
          <li key={example} className="flex items-baseline gap-3">
            <span aria-hidden="true" className="text-mono text-fg-muted">
              {side === "included" ? "+" : "×"}
            </span>
            {example}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Static (no-JS / pre-hydration): both sides side by side. */
export function RevisionStatic() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <RevisionSide side="included" />
      <RevisionSide side="separate" />
    </div>
  );
}
