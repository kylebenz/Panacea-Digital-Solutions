import { contact } from "@/content/contact";
import { cn } from "@/lib/cn";

/* Pieces shared by the static (no-JS) form and the interactive inquiry flow. */

export function PhiNotice({ id, compact = false }: { id?: string; compact?: boolean }) {
  return (
    <div
      id={id}
      role="note"
      className={cn("border-l-2 border-remedy bg-ink-raised/60", compact ? "py-3 pr-3 pl-4" : "py-4 pr-4 pl-5")}
    >
      <p className="text-mono text-fg-muted">{contact.phiLabel}</p>
      <p className={cn("mt-1.5", compact ? "text-small" : "")}>{contact.phiNotice}</p>
    </div>
  );
}

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div>
      <p className="text-mono flex items-center justify-between text-fg-muted">
        <span>
          <span className="text-fg">{contact.stepLabel(step + 1, total)}</span> · {contact.steps[step].title}
        </span>
      </p>
      <ol className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden="true">
        {contact.steps.map((s, i) => (
          <li key={s.id} className="grid gap-1.5">
            <span
              className={cn(
                "block h-[3px] rounded-full transition-colors duration-[var(--dur-2)]",
                i < step ? "bg-accent" : i === step ? "bg-brand-gradient" : "bg-rule-strong",
              )}
            />
            <span className={cn("text-mono text-[0.625rem]", i === step ? "text-fg" : "text-fg-muted")}>{s.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Visually hidden honeypot. Real visitors never see or fill it. */
export function Honeypot({ name }: { name: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={name} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export const radioClass =
  "relative flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xs px-3 shadow-[inset_0_0_0_1px_var(--tone-line-strong)] has-[:checked]:bg-fg has-[:checked]:text-bg has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent";
