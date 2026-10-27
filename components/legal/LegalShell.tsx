import { legal } from "@/content/legal";
import { Button } from "@/components/primitives/Button";
import { VerifyMark } from "@/components/primitives/VerifyMark";

/* Shell for /privacy/ and /terms/ until reviewed text is supplied. */
export function LegalShell({ page }: { page: "privacy" | "terms" }) {
  const copy = legal[page];
  return (
    <article data-tone="paper" className="page py-20 lg:py-28">
      <p className="text-mono text-fg-muted">Panacea Digital Solutions · Legal</p>
      <h1 className="text-display-xl mt-6 max-w-[16ch]">{copy.title}</h1>
      <p className="text-mono mt-6 text-fg-muted">
        {legal.lastUpdated}: <VerifyMark>date</VerifyMark>
      </p>
      <p className="text-body-l measure mt-10">
        <VerifyMark>{copy.verify}</VerifyMark>
      </p>
      <h2 className="text-mono mt-14 text-fg-muted">{legal.outlineLabel}</h2>
      <ol className="measure mt-4 border-t border-rule-strong">
        {copy.outline.map((item, i) => (
          <li key={item} className="grid grid-cols-[2.5rem_1fr] border-b border-rule py-3">
            <span className="text-mono text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      <div className="mt-14">
        <Button href="/" variant="secondary">
          {legal.back}
        </Button>
      </div>
    </article>
  );
}
