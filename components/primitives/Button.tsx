import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Preview = "hover" | "active" | "focus";

type CommonProps = {
  variant?: Variant;
  size?: "md" | "sm";
  loading?: boolean;
  loadingLabel?: string;
  arrow?: boolean;
  /** Styleguide only: render a pseudo-state statically for review. */
  preview?: Preview;
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export type ButtonProps = LinkProps | NativeButtonProps;

function Arrow() {
  return (
    <svg className="btn-arrow h-3 w-3.5 shrink-0" viewBox="0 0 14 12" aria-hidden="true" fill="none">
      <path d="M0 6h12M7.5 1.5 12 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    loadingLabel,
    arrow = false,
    preview,
    children,
    className,
    ...rest
  } = props;

  const classes = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
  const content = (
    <>
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
      {arrow ? <Arrow /> : null}
    </>
  );

  if (typeof rest.href === "string") {
    const anchorProps = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <a {...anchorProps} className={classes} data-preview={preview} aria-busy={loading || undefined}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button
      type="button"
      {...buttonProps}
      className={classes}
      data-preview={preview}
      aria-busy={loading || undefined}
      aria-disabled={loading || buttonProps.disabled || undefined}
      onClick={loading ? undefined : buttonProps.onClick}
    >
      {content}
    </button>
  );
}
