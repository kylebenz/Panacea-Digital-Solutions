# Panacea Digital Solutions — working rules

Single-page marketing site for Panacea Digital Solutions (AI-assisted healthcare
advertisement videos and healthcare infographic images for U.S. healthcare
startups and small healthcare businesses).

- **Spec:** `BUILD_BRIEF.md` (visual identity, interaction, architecture, engineering).
- **Source of truth for copy, metadata, pricing, claims, compliance:**
  `docs/brand-guide.pdf` (Markdown copy: `docs/brand-guide.md`). If the two conflict,
  follow the guide and flag it to the user.
- **Approved plan and decisions (Checkpoint 1):** `docs/phase-0-plan.md`.
- Next.js 16 conventions differ from older versions — see `AGENTS.md` and
  `node_modules/next/dist/docs/`.

## Guardrails (brief §1) — violating any of these is a failed build

1. **Scope.** Panacea sells two services only: AI-assisted healthcare ad videos and
   healthcare infographic images. Web design must not appear as a service anywhere —
   nav, copy, schema, footer, metadata.
2. **No outcome promises.** Never guarantee virality, reach, leads, appointments, sales,
   patients, revenue, medical outcomes, rankings, or timelines.
3. **No fabricated trust signals.** No fake testimonials, reviews, or ratings; no client
   logos or "trusted by" strips; no customer counts, years of experience, awards, or
   invented statistics; no case studies or campaign results.
4. **Portfolio honesty.** Fictional or speculative work carries a visible
   **"Concept Sample"** label. Real client work appears only with written permission,
   enforced by the `PortfolioItem` discriminated union (`status: 'client'` requires
   `permission: { onFile: true; clientName; approvedAt }`).
5. **Pricing.** Starter $99/mo (4 videos + 4 infographics), Growth $199/mo (10 + 10),
   Scale $549/mo (30 + 30); every plan includes 1 revision per content item. Prices come
   only from `site.config.ts`. **The "50% off" promotion stays OFF** — no crossed-out
   prices, countdown timers, or invented urgency until regular prices, promo dates, and
   terms are confirmed. No countdown component may exist.
6. **Not a healthcare provider.** No medical-advice language; no clinical keywords used
   as if Panacea provides care; no invented clinical claims in any sample or demo.
7. **No PHI.** The contact form says clearly not to submit patient names, medical
   records, PHI, or sensitive patient details. Never send form contents to analytics.
8. **SEO integrity.** No keyword stuffing, hidden text, doorway pages, location pages, or
   misleading structured data. Never `Review` or `AggregateRating`; no `LocalBusiness`.
9. **AI transparency.** Never present AI-generated people as real clients, patients, or
   staff.

Also banned (brief §3.7): stock doctor/handshake imagery; purple/blue AI gradients, orbs,
mesh blobs; glassmorphism; generic three-column icon-card grids as a primary layout;
animated stat counters; logo strips; testimonial carousels; chatbot widgets; custom
cursors; emoji; lorem ipsum; hype words (*revolutionize, unlock, elevate, supercharge,
game-changing, cutting-edge, seamless, world-class, skyrocket*); exclamation marks in
headings; caduceus, Rod of Asclepius, red cross, pills, or stethoscopes.

## Never invent facts

When information is missing, render a visible `<VerifyMark>` (`[VERIFY: …]`) and add it
to the register in `docs/phase-0-plan.md` §5. `npm run prelaunch` fails while any remain.

## Where things live

- `site.config.ts` — plain data: business facts, plans, promo flag, chapter list
  (order, ids, labels, tone). Validated by `lib/config-schema.ts` via `lib/site.ts`
  (server only) so zod never ships to the client.
- `lib/chapters.ts` — client-safe chapter helpers; header nav, chapter rail, footer nav,
  and mobile menu are all generated from the one chapter list.
- `content/*.ts` — one typed copy file per chapter. Components never hardcode copy.
  Guide copy is verbatim; only microcopy (labels, states, errors, alt text, captions,
  demo content) is written here, in a plain, specific, calm voice.
- `components/chapters/*` — one self-contained component per chapter (split-ready).
- `components/primitives/*`, `components/layout/*`, `components/brand/*`.
- `app/styleguide/` — dev-only style guide (noindex, disallowed in robots).

## Engineering standards

- After every phase: `npm run typecheck`, `npm run lint`, `npm run build`, then commit.
- Launch gate: `npm run prelaunch` (build + checks in `scripts/prelaunch.ts`). It fails on any
  `[VERIFY`, invalid promo, unpermitted client work, H1 count, chapter ids/order, broken in-page
  links, build slates, hype words, emoji, "web design", bad metadata or structured data, and
  warns on claim words. `PRELAUNCH_ALLOW_VERIFY=1` downgrades known `[VERIFY]` items to warnings.
- e2e: `npm run build && ./scripts/serve.sh` (port 3100, `FORM_WEBHOOK_URL=dry-run`), then
  `BASE_URL=http://localhost:3100 npx playwright test`.
- Visual QA: `node scripts/qa-shots.mjs` (375/768/1280/1440, full page + per chapter). Lighthouse:
  `npm run lighthouse` (median of N) or `npm run lhci` (budgets in `lighthouserc.cjs`; build with
  `SITE_ENV=production`).
- Fonts are trimmed, self-hosted files in `app/fonts/` (`next/font/local`); regenerate per
  `app/fonts/README.md` if a new weight is needed.
- Accessibility: WCAG 2.2 AA, axe zero violations; brand-teal focus rings (aqua on ink) with offset;
  24px minimum targets; anchor jumps focus the chapter heading (`tabindex="-1"`).
- Motion: `--ease-cut` easing, 180–600ms, stagger ≤ 60ms, wipes/mask reveals (not
  fade-ups), only the hero stage loops; `prefers-reduced-motion` → static final states.
- Performance: hydrate interactive chapters on approach (dynamic `import()` +
  IntersectionObserver, ~600px rootMargin); keep Radix, Motion, and zod out of
  first-load JS; no `<video>` above the fold.
- JS budget (agreed at Checkpoint 2): the Next.js 16 + React 19 framework floor is
  ~165 KB gz; **our own first-load JS must stay ≤ 30 KB gz on top of it**. Lighthouse
  Performance ≥ 95, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms remain the hard gates.
