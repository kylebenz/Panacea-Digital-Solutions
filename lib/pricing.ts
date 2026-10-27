const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => usd.format(amount);

/** Shareable link that scrolls to the inquiry form with the plan pre-selected. */
export const planHref = (planId: string) => `/?package=${planId}#contact`;
