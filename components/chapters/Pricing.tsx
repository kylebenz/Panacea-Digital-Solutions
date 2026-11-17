import { pricing } from "@/content/pricing";
import type { Plan } from "@/lib/config-schema";
import { formatPrice, planHref } from "@/lib/pricing";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";
import { VerifyMark } from "@/components/primitives/VerifyMark";

/*
 * 08 · Pricing. Everything numeric is read from site.config.ts. Growth is
 * the featured middle card. When the promo is on, each card carries a red
 * "% off" tag and states its regular price in plain text (no crossed-out
 * prices, no countdowns).
 */

/** Red sale tag: a price-tag icon and "50% OFF". */
function SaleBadge({ percent }: { percent: number }) {
  return (
    <span className="sale-badge">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" fill="none">
        <path
          d="M8.6 1.5H14a.5.5 0 0 1 .5.5v5.4a1 1 0 0 1-.3.7l-6.6 6.6a1 1 0 0 1-1.4 0L1.3 9.8a1 1 0 0 1 0-1.4l6.6-6.6a1 1 0 0 1 .7-.3Z"
          fill="currentColor"
        />
        <circle cx="11.25" cy="4.75" r="1.25" fill="var(--color-sale)" />
      </svg>
      {pricing.promo.badge(percent)}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 text-accent" fill="none">
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
  const promo = site.promo.enabled ? site.promo : null;
  const features = [
    { text: pricing.videosLine(plan.videos), strong: true },
    ...pricing.features.map((text) => ({ text, strong: false })),
    { text: pricing.revisionLine, strong: true },
  ];
  return (
    <article
      data-tone={featured ? "ink" : undefined}
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex flex-col rounded-card p-6 sm:p-7",
        featured ? "shadow-[0_30px_60px_-30px_rgb(11_29_38/0.6)] lg:-my-5 lg:py-11" : "card bg-[#fff]",
      )}
    >
      {featured ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-3 py-1 font-mono text-[0.625rem] font-semibold tracking-[0.12em] whitespace-nowrap text-paper uppercase">
          {pricing.recommended}
        </span>
      ) : null}
      <div className="text-center">
        <h3 id={`plan-${plan.id}`} className="text-h3">
          {plan.name}
        </h3>
        <p className="eyebrow mt-1">{pricing.kickers[plan.id]}</p>
        <p className="mt-4 flex items-baseline justify-center gap-1">
          <span className="font-display text-[2.75rem] leading-none font-medium tabular-nums">
            {formatPrice(plan.priceMonthly)}
          </span>
          <span className="text-fg-muted">{pricing.perMonth}</span>
        </p>
        {promo ? (
          <div className="mt-3 flex flex-col items-center gap-2">
            <SaleBadge percent={promo.percentOff} />
            <p className="text-small text-fg-muted">
              {pricing.promo.regular(formatPrice(promo.regularPrices[plan.id]))}
            </p>
          </div>
        ) : null}
      </div>
      <Button
        href={planHref(plan.id)}
        variant={featured ? "primary" : "secondary"}
        arrow={featured}
        className="mt-6 w-full"
      >
        {plan.ctaLabel}
      </Button>
      <ul className="mt-6 grid gap-3 border-t border-rule pt-6">
        {features.map((feature) => (
          <li
            key={feature.text}
            className={cn("text-small flex gap-2.5", feature.strong ? "font-semibold" : "text-fg-muted")}
          >
            <Check />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Lines under the cards: the offer with its dates and terms, then package terms (or [VERIFY]). */
function Notes() {
  const promo = site.promo;
  return (
    <div className="text-small mt-12 grid justify-items-center gap-3 text-center text-fg-muted">
      {promo.enabled ? (
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-sale" aria-hidden="true" />
          <span className="text-fg">{pricing.promo.note(promo.percentOff)}</span>
          {promo.startDate && promo.endDate ? (
            <span>{pricing.promo.window(promo.startDate, promo.endDate)}</span>
          ) : (
            <VerifyMark>{pricing.promo.verifyDates}</VerifyMark>
          )}
          {promo.terms ? <span>{promo.terms}</span> : <VerifyMark>{pricing.promo.verifyTerms}</VerifyMark>}
        </p>
      ) : null}
      <p>
        {pricing.terms}: <VerifyMark>{pricing.verifyTerms}</VerifyMark>
      </p>
    </div>
  );
}

export function Pricing() {
  return (
    <Chapter id="pricing" title={pricing.title} lede={<p>{pricing.intro}</p>} align="center">
      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-4">
        {site.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} featured={plan.id === "growth"} />
        ))}
      </div>
      <Notes />
    </Chapter>
  );
}
