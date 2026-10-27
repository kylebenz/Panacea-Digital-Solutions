import { cn } from "@/lib/cn";

/*
 * The Panacea mark (supplied logo): a gradient "P" with pixel squares.
 * Raster with transparency, extracted from assets/brand/panacea-logo-source.webp
 * (see assets/brand/README.md). Decorative by default; pass `title` when the
 * mark stands alone.
 */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static asset; next/image would add client JS
    <img
      src="/brand/panacea-mark-96.webp"
      srcSet="/brand/panacea-mark-64.webp 52w, /brand/panacea-mark-96.webp 79w, /brand/panacea-mark-144.webp 118w"
      sizes="40px"
      width={79}
      height={96}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      decoding="async"
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}
