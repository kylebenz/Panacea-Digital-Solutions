import type { ReactNode } from "react";
import { whoWeHelp } from "@/content/who-we-help";
import { Button } from "@/components/primitives/Button";

/* Who we help · static list (no-JS / pre-hydration): every audience and its line. */
export function AudienceList() {
  return (
    <dl className="grid gap-6 sm:grid-cols-2">
      {whoWeHelp.audiences.map((a) => (
        <div key={a.id} className="border-t border-rule-strong pt-4">
          <dt className="text-mono">{a.name}</dt>
          <dd className="mt-2 text-fg-muted">
            {a.line}{" "}
            <a href={a.link.href} className="text-fg underline">
              {a.link.label}
            </a>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function AudienceResponse({ id, children }: { id: string; children?: ReactNode }) {
  const a = whoWeHelp.audiences.find((x) => x.id === id)!;
  return (
    <div className="relative border-l-2 border-accent pl-6">
      <p className="text-mono text-fg-muted">{a.name}</p>
      <p className="text-display-m mt-3 max-w-[30ch]">{a.line}</p>
      <Button href={a.link.href} variant="ghost" arrow className="mt-5 -ml-1">
        {a.link.label}
      </Button>
      {children}
    </div>
  );
}
