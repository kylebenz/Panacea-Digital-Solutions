import type { Plan } from "@/lib/config-schema";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (amount: number) => usd.format(amount);

/** Per-item cost, always computed from config: $99 / 8 → "$12.38". */
export function perItemCost(plan: Pick<Plan, "priceMonthly" | "videos" | "infographics">) {
  return usdCents.format(plan.priceMonthly / (plan.videos + plan.infographics));
}

/** Shareable link that scrolls to the inquiry form with the plan pre-selected. */
export const planHref = (planId: string) => `/?package=${planId}#contact`;
