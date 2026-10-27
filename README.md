# Panacea Digital Solutions — website

Single-page marketing site for Panacea Digital Solutions: AI-assisted healthcare
advertisement videos and healthcare infographic images for U.S. healthcare startups
and small healthcare businesses.

- **Copy, pricing, claims, compliance:** `docs/brand-guide.md` (source: `docs/brand-guide.pdf`).
  The guide wins over everything else.
- **Visuals, interaction, engineering:** `BUILD_BRIEF.md`.
- **Decisions and the `[VERIFY]` register:** `docs/phase-0-plan.md`.
- **Before launch:** `LAUNCH_CHECKLIST.md` and `docs/verify-items.md`.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion,
Radix UI, react-hook-form + zod, Playwright + axe, Lighthouse CI.

---

## Setup

Requires Node 22 or newer.

```sh
npm install
npm run dev            # http://localhost:3000
```

| Command                                                 | What it does                                                    |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| `npm run dev`                                           | Development server                                              |
| `npm run build` / `npm start`                           | Production build / serve it                                     |
| `npm run typecheck` · `npm run lint` · `npm run format` | TypeScript, ESLint, Prettier                                    |
| `npm run check`                                         | typecheck + lint + build                                        |
| `npm run test:e2e`                                      | Playwright end-to-end and axe tests (see below)                 |
| `npm run prelaunch`                                     | Build, then the launch gate (`scripts/prelaunch.ts`)            |
| `npm run lighthouse -- [url] [runs]`                    | Median-of-N Lighthouse against a running server                 |
| `npm run lhci`                                          | Lighthouse CI with the budgets in `lighthouserc.cjs`            |
| `npm run media:portfolio`                               | Regenerates portfolio captions, posters, and placeholder videos |

### Tests

```sh
npm run build && ./scripts/serve.sh                  # port 3100, FORM_WEBHOOK_URL=dry-run
BASE_URL=http://localhost:3100 npx playwright test
```

Two projects run every spec: desktop (1440×900) and mobile (375×812). The suite
covers every anchor link and rail tick, scrollspy, the keyboard-only journey to a
sent inquiry, form success and error paths, plan pre-selection, portfolio filters
and lightbox, reduced motion, structured data, and axe on every route.

Screenshots for visual review (375, 768, 1280, 1440px; full page and per chapter):
`node scripts/qa-shots.mjs http://localhost:3100` → `screenshots/phase-8/` (git-ignored).

---

## Environment variables

| Variable                       | Required               | Purpose                                                                                                                                                                                                                       |
| ------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Yes, in production     | Canonical origin, e.g. `https://example.com` (no trailing slash). Drives canonical URLs, sitemap, Open Graph, JSON-LD.                                                                                                        |
| `FORM_WEBHOOK_URL`             | Yes, in production     | Where validated inquiries are POSTed as JSON (a CRM inbound webhook or email service). Unset → the form reports an error and nothing is lost silently. `dry-run` accepts submissions without forwarding (local testing only). |
| `SITE_ENV`                     | Outside Netlify/Vercel | `production` allows crawling. Netlify (`CONTEXT`) and Vercel (`VERCEL_ENV`) are detected automatically, so deploy previews are never indexed.                                                                                 |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional               | Enables cookieless Plausible analytics.                                                                                                                                                                                       |
| `NEXT_PUBLIC_PLAUSIBLE_SRC`    | Optional               | Self-hosted Plausible script URL.                                                                                                                                                                                             |
| `NEXT_PUBLIC_GA4_ID`           | Optional               | Enables GA4 **only after** the visitor accepts the consent banner (the banner appears only when this is set).                                                                                                                 |

The inquiry form never sends field values to analytics — only step and submit
events. The route handler never logs field values.

---

## Editing content

Components never hardcode copy. Everything editable is plain data.

### Copy — `content/*.ts`

One file per chapter (`hero.ts`, `pricing.ts`, `faq.ts`, `contact.ts`, …), plus
`global.ts` (skip links, nav labels), `footer.ts`, `legal.ts`, and `seo.ts`
(title, description, structured data text). Guide copy is verbatim; keep it that
way. When the guide changes, change the matching file and run `npm run prelaunch`,
which also lints for hype words, emoji, outcome claims, and "web design".

### Pricing — `site.config.ts` → `plans`

```ts
{ id: "growth", name: "Growth", priceMonthly: 199, videos: 10, infographics: 10, revisionsPerItem: 1, ctaLabel: "Choose Growth" }
```

Price cards, per-item cost, the inquiry form's package list, plan buttons
(`/?package=growth#contact`), and structured data all read from here. Do not type
prices anywhere else. `featuredPlanClaim` stays `null` unless a claim such as
"most popular" is verified.

### Promotion flag — `site.config.ts` → `promo`

Off by default. To turn it on, every field must be filled or the build fails:

```ts
promo: {
  enabled: true,
  regularPrices: { starter: 198, growth: 398, scale: 1098 }, // the real, verified regular prices
  startDate: "2026-11-01",
  endDate: "2026-11-30",
  terms: "…",
}
```

The pricing cards then show the regular price, terms, and dates as plain text.
There are no countdown timers or crossed-out prices, and none should be added.

### Portfolio — `content/portfolio-items.ts`

Each item is a `PortfolioItem`. Fictional work uses `status: "concept"` and always
shows the **Concept Sample** badge. Real client work must carry written
permission, or TypeScript and `npm run prelaunch` both reject it:

```ts
{ status: "client", permission: { onFile: true, clientName: "…", approvedAt: "2026-11-01" }, … }
```

Video media lives in `public/media/portfolio/<slug>.{mp4,vtt}` and
`<slug>-poster.webp`. To replace a placeholder: drop in the real `.mp4` and its
`.vtt` captions, set `media.placeholder: false`, and keep the `script` cues in sync
with the captions (the lightbox shows them as a transcript).
`npm run media:portfolio` regenerates captions and posters from content.

### Chapter order — `site.config.ts` → `chapters`

```ts
{ id: "pricing", number: "09", label: "Pricing", nav: "Pricing", tone: "paper" }
```

The header nav (items with `nav`), chapter rail, footer nav, and mobile menu are
all generated from this list. To reorder, move entries, renumber them, and move
the matching chapter component in `app/page.tsx`; `npm run prelaunch` fails if the
page order and the config disagree. Keep `id`s stable — they are public URLs
(`/#pricing`).

### Business facts — `site.config.ts` → `contact`

`email` and `legalName` are `null` until confirmed, which renders visible
`[VERIFY: …]` marks. Fill them in and the marks disappear.

---

## Deploying to Netlify

1. Create a site from this repository. Netlify detects Next.js and applies its
   Next.js runtime automatically; `netlify.toml` sets the build command and Node 22.
2. Set the environment variables above for the **Production** context
   (`NEXT_PUBLIC_SITE_URL`, `FORM_WEBHOOK_URL`, analytics if wanted).
3. Deploy. Deploy previews and branch deploys are automatically `Disallow: /` in
   `robots.txt`; only the production context is crawlable.
4. Add the custom domain and enable HTTPS (Netlify provisions the certificate).
   Redirect the non-preferred host (`www` or apex) to the canonical one.
5. On the first production deploy, confirm the inquiry form end to end
   (a real submission reaching the webhook) and that `/robots.txt` and
   `/sitemap.xml` show the production domain.

This build uses Next.js 16 features (Cache Components / partial prerendering).
Check the first deploy preview carefully: every page should load, the inquiry
route should respond, and the response headers should show the page served
from cache. If the host's runtime does not yet support a feature, Vercel is the
fallback (O-10).

## Google Search Console and the sitemap

1. In Search Console, add a **Domain** property for the production domain and
   verify it with the DNS TXT record.
2. Submit `https://<domain>/sitemap.xml`. It lists `/`, `/privacy/`, and `/terms/`;
   the style guide is excluded and `noindex`.
3. Use **URL Inspection** on the home page; request indexing once.
4. Review **Pages**, **Core Web Vitals**, and **Performance → Search results**
   monthly (guide §18). Keyword themes in the guide are unvalidated (O-11);
   use the real queries here to adjust copy, never to stuff keywords.

## The single-page SEO trade-off

The brief asks for one long page; the guide (§5) recommends separate pages for
each service, pricing, portfolio, about, FAQ, and contact. The site follows the
brief, which costs some search reach:

- **One URL, one title, one meta description.** Separate service pages could each
  target their own query ("AI healthcare ad videos", "healthcare infographics").
  Here the home page title carries both themes, and each chapter uses its own
  descriptive H2 from the guide's page H1s.
- **Fragments are not indexed separately.** `/#pricing` is the same document as
  `/` to Google; chapter anchors help people, not ranking.
- **What protects us:** one H1, a logical heading outline, all copy in the
  server HTML (closed FAQ answers use `hidden="until-found"`, so they are
  indexable and findable), accurate `Organization`/`Service`/`FAQPage` structured
  data that matches visible text, and no hidden or doorway content.
- **The way out is planned.** Each chapter is a self-contained component reading
  its own `content/*.ts` file, so a chapter can become its own route (e.g.
  `/pricing/`) without rewriting it. If Search Console shows demand for a
  service query the home page can't win, split that chapter first, give it the
  guide's page-specific title and description, and add it to the sitemap.

## Project layout

```
app/                    routes: / (page.tsx), /privacy, /terms, /styleguide (dev only), api/inquiry
  fonts/                trimmed, self-hosted web fonts (see app/fonts/README.md)
components/chapters/    one component per chapter
components/interactive/ client islands, hydrated on approach (components/islands/Island.tsx)
components/{layout,primitives,brand,stage,samples,contact,faq,seo,legal}/
content/                all copy, one typed file per chapter
lib/                    config schema, chapters, pricing, portfolio types, inquiry schema, wayfinding
site.config.ts          business facts, plans, promo flag, chapter list
scripts/                prelaunch gate, Lighthouse, screenshots, portfolio media
tests/e2e/              Playwright specs
```
