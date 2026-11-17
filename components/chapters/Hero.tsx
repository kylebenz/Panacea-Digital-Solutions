import { hero } from "@/content/hero";
import { Button } from "@/components/primitives/Button";

/* The phone in the hero: an empty video slot until the featured drama is added. */
function HeroPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[17.5rem] lg:mr-6 lg:ml-auto">
      <figure
        role="img"
        aria-label={hero.phone.label}
        className="relative rounded-phone bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgb(11_29_38/0.55),0_0_0_1px_var(--color-line-on-ink)]"
      >
        <div className="video-placeholder relative aspect-[9/16] overflow-hidden rounded-screen text-paper">
          <span aria-hidden="true" className="absolute top-3 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-paper/12 shadow-[inset_0_0_0_1px_rgb(245_242_236/0.35)]">
              <svg viewBox="0 0 12 14" className="ml-1 h-5 w-4" fill="currentColor" aria-hidden="true">
                <path d="M0 0v14l12-7z" />
              </svg>
            </span>
            <span className="text-mono text-paper-dim">Video coming soon</span>
          </div>
          <div className="absolute inset-x-4 bottom-5 text-[0.75rem] leading-snug">
            <p className="font-semibold">{hero.phone.handle}</p>
            <p className="text-paper-dim">{hero.phone.tag}</p>
          </div>
        </div>
      </figure>
      <div className="absolute top-10 -left-6 rounded-sm bg-[#fff] px-3 py-2 shadow-[0_14px_30px_-14px_rgb(11_29_38/0.45)] sm:-left-12">
        <p className="text-[1.0625rem] leading-tight font-bold text-ink">{hero.phone.chip}</p>
        <p className="text-[0.6875rem] text-ink-2">{hero.phone.chipSub}</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      data-chapter=""
      data-tone="paper"
      aria-labelledby="top-title"
      className="chapter pt-10 pb-20 sm:pt-16 lg:pt-20 lg:pb-28"
    >
      <div className="page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-[0.75rem] font-semibold text-teal-deep">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
            {hero.eyebrow}
          </p>
          <h1 id="top-title" tabIndex={-1} data-chapter-heading="" className="text-display-xl mt-6 max-w-[16ch]">
            {hero.title.lead} <span className="text-teal">{hero.title.accent}</span>
          </h1>
          <p className="measure mt-7 max-w-[52ch] text-fg-muted">{hero.body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <p className="text-small mt-8 flex items-center gap-3 text-fg-muted">
            <span aria-hidden="true" className="flex -space-x-2">
              {["bg-teal", "bg-teal-mid", "bg-cyan", "bg-mint"].map((c) => (
                <span key={c} className={`h-6 w-6 rounded-full border-2 border-paper ${c}`} />
              ))}
            </span>
            {hero.note}
          </p>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}
