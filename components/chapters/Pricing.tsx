import { pricing } from "@/content/pricing";
import type { Plan } from "@/lib/config-schema";
import { formatPrice, perItemCost, planHref } from "@/lib/pricing";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { Button } from "@/components/primitives/Button";
import { VerifyMark } from "@/components/primitives/VerifyMark";
import { RevisionStatic } from "@/components/interactive/RevisionExplainerView";

/*
 * 09 · Monthly packages — Package Comparator (7H). Everything numeric is read
 * from site.config.ts. Deliverables are drawn as tiles (9:16 for videos,
 * squares for infographics) so the difference in volume reads at a glance.
 * Growth is the visually featured middle option; no "most popular" claim
 * unless site.featuredPlanClaim is verified and set.
 */

function Tiles({ count, kind }: { count: number; kind: "video" | "square" }) {
  return (
    // Fixed 15-per-row grid, so 30 reads as two tidy rows of 15.
    <span
      className={cn(
        "grid w-max gap-[3px]",
        kind === "video" ? "grid-cols-[repeat(15,8px)]" : "grid-cols-[repeat(15,10px)]",
      )}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "block rounded-[1px]",
            kind === "video"
              ? "h-[14px] w-[8px] bg-current"
              : "h-[10px] w-[10px] shadow-[inset_0_0_0_1.5px_currentColor]",
          )}
        />
      ))}
    </span>
  );
}

function PlanCard({ plan, index, featured }: { plan: Plan; index: number; featured: boolean }) {
  const promo = site.promo.enabled ? site.promo : null;
  return (
    <article
      data-tone={featured ? "ink" : undefined}
      aria-labelledby={`plan-${plan.id}`}
      className={cn("flex flex-col p-6 sm:p-8", featured ? "lg:-my-6 lg:py-14" : "border border-rule-strong bg-bg")}
    >
      <p className="text-mono flex justify-between text-fg-muted">
        <span>{pricing.planKicker(index + 1)}</span>
        {featured && site.featuredPlanClaim ? <span className="text-fg">{site.featuredPlanClaim}</span> : null}
      </p>
      <h3 id={`plan-${plan.id}`} className="text-display-m mt-3">
        {plan.name}
      </h3>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-none tabular-nums">
          {formatPrice(plan.priceMonthly)}
        </span>
        <span className="text-fg-muted">{pricing.perMonth}</span>
      </p>
      {promo ? (
        <p className="text-small mt-2 text-fg-muted">
          {pricing.promo.regular(formatPrice(promo.regularPrices[plan.id]))}. {promo.terms}{" "}
          {pricing.promo.window(promo.startDate, promo.endDate)}
        </p>
      ) : null}

      <ul className="mt-8 grid gap-5 border-t border-rule pt-6">
        <li className="grid gap-2">
          <Tiles count={plan.videos} kind="video" />
          <span>{pricing.videosLine(plan.videos)}</span>
        </li>
        <li className="grid gap-2">
          <Tiles count={plan.infographics} kind="square" />
          <span>{pricing.infographicsLine(plan.infographics)}</span>
        </li>
        <li className="border-t border-rule pt-4">{pricing.revisionLine}</li>
      </ul>

      <p className="text-mono mt-6 text-fg-muted" title={pricing.perItemNote}>
        {pricing.perItem(perItemCost(plan))}
      </p>

      <div className="mt-auto pt-8">
        <Button href={planHref(plan.id)} variant={featured ? "primary" : "secondary"} arrow className="w-full">
          {plan.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

export function Pricing() {
  return (
    <Chapter id="pricing" title={pricing.title} lede={<p>{pricing.intro}</p>}>
      <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-0">
        {site.plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} index={i} featured={plan.id === "growth"} />
        ))}
      </div>
      <p className="text-small measure mt-6 text-fg-muted">{pricing.perItemNote}</p>

      <div className="grid-12 mt-24 gap-y-10 border-t border-rule pt-16">
        <div className="col-span-12 lg:col-span-4">
          <h3 className="text-display-m">{pricing.revision.title}</h3>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Island name="revision-explainer">
            <RevisionStatic />
          </Island>
        </div>
      </div>

      <div className="grid-12 mt-24 gap-y-8 border-t border-rule pt-16">
        <div className="col-span-12 lg:col-span-4">
          <h3 className="text-display-m">{pricing.terms.title}</h3>
          <p className="text-small mt-3 text-fg-muted">{pricing.terms.intro}</p>
        </div>
        <ol className="col-span-12 border-t border-rule-strong lg:col-span-8">
          {pricing.terms.items.map((item, i) => (
            <li
              key={item.label}
              className="grid gap-x-4 gap-y-1 border-b border-rule py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:items-baseline"
            >
              <span className="text-mono text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
              <VerifyMark>{item.verify}</VerifyMark>
            </li>
          ))}
        </ol>
      </div>
    </Chapter>
  );
}
