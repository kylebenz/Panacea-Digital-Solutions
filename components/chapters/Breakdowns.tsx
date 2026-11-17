import { breakdowns } from "@/content/breakdowns";
import { work } from "@/content/work";
import { cn } from "@/lib/cn";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";
import { VideoSlot } from "@/components/video/VideoSlot";

type Item = (typeof breakdowns.items)[number];

function Panel({ item, dark }: { item: Item; dark: boolean }) {
  return (
    <article
      data-tone={dark ? "ink" : undefined}
      aria-labelledby={`breakdown-${item.id}`}
      className={cn("rounded-[20px] p-6 sm:p-10", !dark && "card")}
    >
      <header className="flex flex-wrap items-center gap-4">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal font-mono text-[0.8125rem] font-semibold text-paper"
        >
          {item.initials}
        </span>
        <div className="min-w-[12rem] flex-1">
          <p className="text-mono text-fg-muted">{item.kicker}</p>
          <h3 id={`breakdown-${item.id}`} className="font-display text-[1.625rem] leading-tight font-medium">
            {item.name}
          </h3>
          <p className="text-small text-fg-muted">{item.meta}</p>
        </div>
        <div className="basis-full sm:basis-auto">
          <ConceptBadge />
        </div>
      </header>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow">{item.briefLabel}</p>
          <p className="text-small mt-2">{item.brief}</p>
        </div>
        <div>
          <p className="eyebrow">{item.madeLabel}</p>
          <p className="text-small mt-2">{item.made}</p>
        </div>
      </div>

      <p className="mt-12 font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-none font-medium tracking-tight text-fg-muted uppercase">
        {item.scriptLabel}
      </p>
      <ol className="mx-auto mt-5 max-w-xl overflow-hidden rounded-card bg-[#fff] text-ink shadow-[0_0_0_1px_var(--color-line)]">
        {item.script.map((beat, i) => (
          <li key={beat.scene} className="grid gap-1 border-b border-[var(--color-line)] px-5 py-3 last:border-b-0">
            <p className="text-mono text-ink-2">
              {String(i + 1).padStart(2, "0")} · {beat.scene}
            </p>
            <p className="text-small">{beat.line}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-center text-[0.9375rem] font-semibold text-accent">
        {item.arrow} <span aria-hidden="true">↓</span>
      </p>

      <p className="mt-6 font-display text-[clamp(1.375rem,2.4vw,1.875rem)] leading-none font-medium tracking-tight text-accent uppercase">
        {item.episodesLabel}
      </p>
      <ul className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        {item.episodes.map((slot) => (
          <li key={slot.slug}>
            <VideoSlot slot={slot} placeholderLabel="Coming soon" size="sm" />
          </li>
        ))}
      </ul>

      {"extra" in item && item.extra ? (
        <div className="card mt-10 grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,12rem)_1fr]">
          <VideoSlot
            slot={{
              slug: `${item.id}-extra`,
              title: item.extra.title,
              subtitle: item.name,
              status: "concept",
              media: null,
            }}
            placeholderLabel={work.placeholder}
            caption={false}
            size="sm"
            className="mx-auto w-full max-w-[12rem]"
          />
          <div>
            <p className="eyebrow">{item.extra.kicker}</p>
            <p className="text-h3 mt-2 font-display text-[1.5rem] font-medium">{item.extra.title}</p>
            <p className="text-small mt-3 text-fg-muted">{item.extra.text}</p>
          </div>
        </div>
      ) : null}

      <figure className="mt-10 border-l-2 border-accent pl-4">
        <blockquote className="text-h3">{item.opening}</blockquote>
        <figcaption className="text-small mt-1 text-fg-muted">{item.openingLabel}</figcaption>
      </figure>
      <div className="mt-6">
        <Button href={breakdowns.cta.href} arrow size="sm">
          {breakdowns.cta.label}
        </Button>
      </div>
    </article>
  );
}

/* 04 · Breakdowns — two Concept Sample walk-throughs, light then dark. */
export function Breakdowns() {
  return (
    <Chapter id="breakdowns" title={breakdowns.title} lede={<p>{breakdowns.lede}</p>}>
      <div className="mt-14 grid gap-10">
        {breakdowns.items.map((item, i) => (
          <Panel key={item.id} item={item} dark={i % 2 === 1} />
        ))}
      </div>
    </Chapter>
  );
}
