import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type FieldShellProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

/** Label, hint, control, and an error line announced via aria-describedby. */
export function FieldShell({ id, label, hint, error, optional, className, children }: FieldShellProps) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? (
          <span className="ml-2 font-mono text-[0.6875rem] font-medium tracking-[0.08em] text-fg-muted uppercase">
            Optional
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedBy(id: string, { hint, error }: { hint?: unknown; error?: unknown }) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

type Preview = { preview?: "hover" | "focus" };

export function TextInput({ className, preview, ...props }: InputHTMLAttributes<HTMLInputElement> & Preview) {
  return <input className={cn("field-control", className)} data-preview={preview} {...props} />;
}

export function TextArea({ className, preview, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & Preview) {
  return <textarea className={cn("field-control", className)} data-preview={preview} {...props} />;
}

export function Select({ className, preview, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & Preview) {
  return (
    <select className={cn("field-control", className)} data-preview={preview} {...props}>
      {children}
    </select>
  );
}
