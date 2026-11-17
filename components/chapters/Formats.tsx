import { formats } from "@/content/formats";
import { cn } from "@/lib/cn";
import { Chapter } from "@/components/layout/Chapter";

/* 06 · Organic, paid, or both — three options, the middle one recommended. */
export function Formats() {
  return (
    <Chapter id="formats" title={formats.title} lede={<p>{formats.lede}</p>}>
      <ul className="mt-12 grid items-stretch gap-4 md:grid-cols-3">
        {formats.options.map((option) => {
          const featured = "featured" in option && option.featured;
          return (
            <li
              key={option.id}
              data-tone={featured ? "ink" : undefined}
              className={cn(
                "relative rounded-card p-6",
                featured ? "shadow-[0_30px_60px_-30px_rgb(11_29_38/0.6)] md:-my-3 md:py-9" : "card",
              )}
            >
              {featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-teal px-3 py-1 font-mono text-[0.625rem] font-semibold tracking-[0.12em] text-paper uppercase">
                  {formats.recommended}
                </span>
              ) : null}
              <h3 className="text-h3">{option.title}</h3>
              <p className="text-small mt-2 text-fg-muted">{option.text}</p>
            </li>
          );
        })}
      </ul>
    </Chapter>
  );
}
