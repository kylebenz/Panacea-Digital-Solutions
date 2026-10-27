# Phase 0 — Read & Plan (Checkpoint 1)

Prepared from `BUILD_BRIEF.md` and `docs/brand-guide.pdf` (converted from the
"Panacea_Digital_Solutions_SEO_Website_Brand_Guide.docx" in the project Drive
folder; `.docx` original and a Markdown extraction sit beside it).

Nothing in this document is built yet. Items marked **DECISION** need a yes/no
(or an alternative) before Phase 1 starts.

---

## 1. Conflicts and judgement calls (please read first)

| # | Topic | What the sources say | Proposal | Status |
|---|---|---|---|---|
| D1 | **Chapter rhythm** | Brief 4.2 places Who we help (07) → Portfolio (08) → Pricing (09) with 07 and 08 both on `paper`, and Portfolio (dense) directly beside Pricing (dense). Brief 3.2 forbids both. | Swap Portfolio and Who we help (Portfolio becomes 07, Who we help 08) and rebalance backgrounds (see §2). Narrative also improves: *how it works → what it looks like → who it's for → what it costs*. Anchors are unchanged. | **DECISION** |
| D2 | **`--remedy` value** | Brief value `#E2603A` is 2.83:1 on `paper-2` — fails the 3:1 non-text minimum for playheads/active states in `paper-2` chapters. | Shift to `#E0552D` (visually near-identical): 3.07:1 on paper-2, 3.38:1 on paper, and ink text on it stays AA (4.72:1). | **DECISION** |
| D3 | **Extra tokens** | Brief's set has no text/stroke colours for dark chapters. `--verdigris` on ink is 2.30:1 (fails); `--line` (ink 12%) is ~1.3:1, fine for hairlines but not form borders (WCAG 1.4.11). | Add `--paper-dim`, `--verdigris-bright`, `--ink-raised`, `--line-strong`, `--line-strong-on-ink` (§4). | **DECISION** |
| D4 | **"Who we help" chips** | Brief: chips reveal the guide's "website response" line. But that column (guide §3) is written as instructions to the site builder ("Use respectful, accurate sample content and clear service language"), not visitor copy. | Chip label = guide audience name (verbatim). Revealed line = short visitor-facing microcopy derived from the response, plus a descriptive anchor to the chapter that delivers it (e.g. *Startup founders → "See the monthly packages and how to start" → #pricing*). The guide's "Who we help" paragraph and suitability caveat stay verbatim. | **DECISION** |
| D5 | **FAQ wording "pricing page"** | Guide FAQ: "Check the pricing page for the current package details." On one page there is no pricing page. | Guide wins on copy, so default is verbatim with "pricing page" linked to `#pricing`. Alternative: change one word to "pricing section". | **DECISION** |
| D6 | **About + "Clear expectations" merge** | Brief says merge into one "Our commitments" ledger. Overlap is near-identical, not exact: About ends "…and we do not promise viral reach or guaranteed business outcomes"; Clear expectations says "We do not guarantee virality, reach, leads, appointments, sales, or other business outcomes." | Keep every guide sentence verbatim; drop only the About clause "and we do not promise viral reach or guaranteed business outcomes" because the fuller sentence carries it. | **DECISION** |
| D7 | **Demo placeholder** | Brief suggests `[Your agency name]`. Panacea's clients are healthcare businesses, not agencies. | Use `[Your business name]`, `[Your service]`, `[Your city or service area]`, `[Your booking link]`. | **DECISION** |
| D8 | **Timecode example** | Brief 3.1 example "CH 04 · 00:04:00 — PRICING" doesn't match its own table (Pricing is 09). | Derive from chapter number: `CH 09 · 00:09:00 — PRICING`. | FYI |
| D9 | **"Actual sample work near the top"** (guide §17) | No real client work exists yet. | Sample strip shows 3–4 Concept Samples, each visibly labelled "Concept Sample". | FYI |
| D10 | **Revision definition appears twice** | Guide FAQ "What does one revision mean?" and the pricing revision explainer (brief 7H) use the same definition. | Keep both: FAQ stays verbatim for FAQPage schema; the explainer quotes it as its first line. | FYI |
| D11 | **Brand assets** | No `docs/brand/` folder exists; the guide defines no visual identity. (The guide document itself is typeset in teal/navy — that's document styling, not a declared palette.) | Use the brief's "Clinical Edit" direction and placeholder wordmark/monogram. | FYI |
| D12 | **Preferred contact method** | Guide lists the field but not its options. | Options: Email / Phone call / Video call. If Phone call is picked, an optional phone field appears in step 1. | **DECISION** |

---

## 2. Final chapter list (proposed, with D1 applied)

Timecodes follow `CH NN · 00:NN:00 — LABEL`. "Density" drives the rhythm rule:
*breath* = mostly reading, *medium* = one focused interaction, *dense* = several controls or a lot to scan.

| # | Anchor | H2 (verbatim from guide unless noted) | Background | Density | Content |
|---|---|---|---|---|---|
| 00 | `#top` | **H1:** AI Healthcare Advertisement Videos and Infographics | paper | medium | Eyebrow "AI-ASSISTED HEALTHCARE CONTENT"; hero paragraph; **Get Started** → `#contact`, **View Sample Work** → `#portfolio`; Storyboard Assembly (7A) |
| — | — | *(sample strip, no heading number)* | paper | breath | 3–4 Concept Samples in a filmstrip row; "View sample videos and infographics" → `#portfolio` |
| 01 | `#why` | Healthcare content, made simpler | paper-2 | breath | Guide paragraph set as a large Fraunces editorial statement |
| 02 | `#services` | Content services | paper | medium | Two contrasting panels — dark *production* panel (H3 "AI-assisted healthcare advertisement videos") and light *diagram* panel (H3 "Healthcare infographic images"); each links to its deep chapter; "compare content packages" → `#pricing` |
| 03 | `#ad-videos` | AI-Assisted Advertisement Videos for Healthcare Businesses | **ink** | medium | Intro copy; H3 "What is included" as a production checklist (slate-style); Anatomy of a Short Ad (7E); H3 "What this service is designed to support"; guide CTA line → "Discuss Your Content" (`#contact`) + "explore our monthly content packages" (`#pricing`) |
| 04 | `#infographics` | Healthcare Infographic Images for Clearer Communication | paper + hairline grid | medium | Intro copy; Infographic Anatomy (7F) with H3 "Infographic content principles"; use cases (service introductions · FAQs · process explanations · awareness) as tag chips; guide CTA line → `#pricing` / `#contact` |
| 05 | `#demo` | See how a short ad comes together *(new microcopy)* | paper-2 | dense | Script-to-Screen (7C); footer disclaimer; "Discuss Your Content" → `#contact` |
| 06 | `#process` | How it works | **ink** | breath→medium | Process Timeline (7D), guide's four steps verbatim |
| 07 | `#portfolio` | Healthcare Advertisement Video and Infographic Samples | paper | dense | Guide intro; Portfolio Explorer (7G); "Request Similar Content" → `#contact` |
| 08 | `#who-we-help` | Who we help | paper-2 | breath | Guide paragraph; five audience chips (D4); suitability caveat |
| 09 | `#pricing` | Monthly Healthcare Content Packages | paper | dense | Guide intro; Package Comparator (7H) with deliverable tiles and computed per-item cost; revision explainer; package terms (each `[VERIFY]`) |
| 10 | `#about` | A Creative Content Partner for Healthcare Businesses | paper-2 | breath | About copy; H3 "Our commitments" ledger absorbing Clear expectations (D6); "Work With Us" → `#contact` |
| 11 | `#faq` | Frequently Asked Questions | paper | medium | 10 guide Q&As; live filter; per-question anchors (`#faq-what-does-one-revision-mean` etc.); "Ask a Question" → `#contact` |
| 12 | `#contact` | Tell Us About Your Healthcare Content Needs | **ink** | dense | Lead-in "Help people understand the healthcare services you provide." (styled large, not a heading) + final CTA paragraph; guide contact intro; Inquiry Flow (7I) |
| — | footer | — | paper | breath | Tagline large in Fraunces; repeated anchor nav; Privacy / Terms; contact email `[VERIFY]`; disclaimer |

Resulting background sequence: paper · paper · paper-2 · paper · **ink** · paper(grid) · paper-2 · **ink** · paper · paper-2 · paper · paper-2 · paper · **ink** · paper — no two adjacent chapters share a background, and no two *dense* chapters touch. 03→04→05 run medium→medium→dense; 03 and 04 each end on a quiet one-line CTA coda so the eye resets before the demo.

**Header nav** (generated from `site.config.ts`): Videos `#ad-videos` · Infographics `#infographics` · Samples `#portfolio` · Pricing `#pricing` · About `#about` · FAQ `#faq` + remedy **Get Started** → `#contact`.
**Rail labels** (short): Opening · Why · Services · Ad videos · Infographics · Script demo · Process · Samples · Who we help · Pricing · About · FAQ · Contact.

**Other routes:** `/privacy/`, `/terms/` (shells with `[VERIFY: requires qualified review for the actual business and jurisdiction]`), `/styleguide/` (noindex + robots disallow), custom 404 "end of reel" frame. `trailingSlash: true` so URLs match the brief.

---

## 3. Component inventory

### App shell & infrastructure
| Component | Notes |
|---|---|
| `app/layout.tsx` | `next/font` (Fraunces w/ `opsz` axis, Instrument Sans, JetBrains Mono — latin subset, `display: swap`); two skip links (main, `#contact`); analytics loader |
| `site.config.ts` | zod-validated at build: business, URL, contact, plans, chapter list, promo. Promo `enabled: true` with any null field → build fails |
| `content/*.ts` | One typed file per chapter (`hero.ts`, `why.ts`, `services.ts`, `ad-videos.ts`, `infographics.ts`, `script-demo.ts`, `process.ts`, `portfolio.ts`, `who-we-help.ts`, `pricing.ts`, `about.ts`, `faq.ts`, `contact.ts`, `footer.ts`) |
| `Chapter` | Section wrapper: `id`, background variant, `ChapterMarker`, H2 with `tabIndex={-1}`, `scroll-margin-top`, `content-visibility: auto` + `contain-intrinsic-size` below the fold |
| `HydrateOnApproach` | IntersectionObserver (≈600px rootMargin) → dynamic `import()` of the interactive island; SSR static fallback renders first |
| `useActiveChapter` | One shared IntersectionObserver store feeding header scrollspy, rail, and mobile chapter label |
| `AnchorFocus` | On in-page navigation, moves focus to the target chapter heading; respects reduced motion for smooth scroll |
| `Analytics` | Plausible (cookieless) by default; GA4 only via env + consent banner. Event helper accepts event names only — no payload fields, so form values can't leak |
| `JsonLd` | Organization, WebSite, Service ×2, OfferCatalog (3 USD Offers), FAQPage. No Review/AggregateRating/LocalBusiness |
| `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` | Robots disallows all on non-production; `/styleguide/` always disallowed |

### Global UI
`SiteHeader` (condenses on scroll; scrollspy; mobile current-chapter label in mono) · `MobileMenu` (Radix Dialog, full-screen, staggered mask reveal, focus trap, closes on link) · `ChapterRail` **7B** · `MobileCtaBar` (after hero, hides when `#contact` visible) · `SiteFooter` · `Wordmark` · `Monogram` (P from a 9:16 frame + square).

### Primitives
`ChapterMarker` · `Timecode` · `AnnotatedCard` · `LeaderLine` (SVG) · `Callout` (numbered) · `RegistrationMarks` · `HairlineGrid` · `PhoneFrame` (9:16) · `InfographicFrame` (4:5 / 1:1) · `Button` (primary / secondary / ghost × default, hover, active, focus-visible, loading; renders `<a>` or `<button>`) · `ConceptBadge` · `TagChip` · `VerifyMark` (renders `[VERIFY: …]` visibly, styled so it can't be mistaken for final copy) · form fields (`TextField`, `Select`, `Textarea`, `RadioGroup`, `FieldError`, `PhiNotice`) · Radix wrappers: `SegmentedToggle` (Toggle Group), `Accordion`, `Tabs`, `Dialog`.

### Chapters
`Hero` · `SampleStrip` · `Why` · `Services` · `AdVideos` · `Infographics` · `Demo` · `Process` · `Portfolio` · `WhoWeHelp` · `Pricing` · `About` · `Faq` · `Contact`.

### Signature interactions (each isolated + tested)
| ID | Component | Key implementation notes |
|---|---|---|
| 7A | `StoryboardStage` | DOM/SVG, CSS + WAAPI only (no Motion) to stay < 30 KB gz; mounts after H1 paints so H1 stays LCP; pauses off-screen / hover / focus-within; reduced motion → static final composition; "Illustrative" tag |
| 7B | `ChapterRail` | `nav[aria-label="Page chapters"]`, ticks are links, `aria-current` on active, remedy playhead from scroll progress, tooltip on hover/focus |
| 7C | `ScriptToScreen` | Radix Toggle Groups for business type × goal; 12 pre-authored combos in `content/script-demo.ts`; Motion `layout` transitions (LazyMotion + `domAnimation`) |
| 7D | `ProcessTimeline` | Desktop: sticky chapter, scroll moves playhead, active clip expands; Radix Tabs underneath; mobile vertical stepper; reduced motion → static `<ol>` |
| 7E | `AdAnatomyPlayer` | `role="slider"`, arrow/Home/End/PageUp/PageDown, `aria-valuetext` names segment; Hook 0–3s / Message 3–12s / CTA 12–15s + "Captions throughout" track |
| 7F | `InfographicAnatomy` | Concept infographic "Questions to ask before choosing a home care provider"; 5 `<button>` hotspots → leader line + note; SR list fallback |
| 7G | `PortfolioExplorer` | Type chips + topic filter; in-place animated filtering; aspect-true grid; video facade (poster first); Radix Dialog lightbox with `.vtt` captions; focus returns to card |
| 7H | `PackageComparator` | Reads plans from config; 9:16 + square deliverable tiles; per-item cost computed (`price / (videos + infographics)` → $12.38 / $9.95 / $9.15); Growth featured without a "most popular" claim; revision toggle; terms list |
| 7I | `InquiryFlow` | 3 steps (`STEP 02 / 03`), react-hook-form + zod, `aria-live` errors, PHI notice top + beside textarea; no-JS = single-step native form posting to the same route; honeypot + min time-to-submit; success replaces form in place |
| — | `app/api/inquiry/route.ts` | Accepts JSON and form-encoded; zod re-validation; forwards to `FORM_WEBHOOK_URL`; no logging of field values |

### Tooling
`npm run prelaunch` (VERIFY scan, promo check, client-permission check, H1 count, chapter-id uniqueness, link resolution, claims linter as warnings) · Playwright + `@axe-core/playwright` · Lighthouse CI · `CLAUDE.md` · `README.md` · `LAUNCH_CHECKLIST.md` · `docs/blog-outlines.md`.

### Concept sample slate for 7G (Phase 5; all labelled "Concept Sample", no clinical or outcome claims)
1. Video 9:16 — Introducing a home care service (home care provider · introduce a service)
2. Video 9:16 — How to book a first appointment (small clinic · process explainer)
3. Video 9:16 — How a scheduling app works for patients' families (healthcare startup · introduce a service)
4. Video 9:16 — "Do you accept new clients?" (wellness business · answer a common question)
5. Infographic 4:5 — Questions to ask before choosing a home care provider (same as 7F)
6. Infographic 1:1 — What to bring to your first appointment (administrative items only)
7. Infographic 4:5 — Our intake process in four steps (small clinic)

Topic filter: Service introductions · Common questions · Process explainers · Awareness.

---

## 4. Token set with measured contrast (WCAG 2.x relative luminance)

### Colour
| Token | Value | Use |
|---|---|---|
| `--paper` | `#F5F1E8` | Base background |
| `--paper-2` | `#ECE6D9` | Alternate sections |
| `--ink` | `#111816` | Primary text; dark chapters |
| `--ink-2` | `#4A5552` | Secondary text on light |
| `--verdigris` | `#2D5A4E` | Links, focus rings, diagram strokes (light grounds) |
| `--remedy` | `#E0552D` *(was `#E2603A`, D2)* | CTA fills with ink text, playheads, active states |
| `--mist` | `#D6E2DC` | Diagram backgrounds and tints |
| `--line` | ink @ 12% (≈ `#DAD7CF` on paper) | Decorative hairlines and grid only |
| `--paper-dim` *(new)* | `#B1B0A9` | Secondary text on ink |
| `--verdigris-bright` *(new)* | `#7DB8A6` | Links, focus rings, diagram strokes on ink |
| `--ink-raised` *(new)* | `#1B2421` | Form fields / raised surfaces in ink chapters |
| `--line-strong` *(new)* | `#7A8480` | Input borders, rail ticks on paper / paper-2 |
| `--line-strong-on-ink` *(new)* | `#787A75` | Input borders on ink / ink-raised |

### Text pairs (AA: 4.5 normal, 3.0 large)
| Foreground | Background | Ratio | Result |
|---|---|---|---|
| ink | paper | 15.98 | AAA |
| ink | paper-2 | 14.48 | AAA |
| ink | mist | 13.53 | AAA |
| ink-2 | paper | 6.87 | AA |
| ink-2 | paper-2 | 6.23 | AA |
| ink-2 | mist | 5.81 | AA |
| verdigris | paper | 6.94 | AA |
| verdigris | paper-2 | 6.29 | AA |
| verdigris | mist | 5.88 | AA |
| paper | verdigris | 6.94 | AA (concept badge, dark panel chips) |
| paper | ink | 15.98 | AAA |
| paper-2 | ink | 14.48 | AAA |
| mist | ink | 13.53 | AAA |
| paper-dim | ink | 8.28 | AAA |
| paper-dim | ink-raised | 7.31 | AAA |
| paper | ink-raised | 14.10 | AAA |
| verdigris-bright | ink | 7.96 | AAA |
| verdigris-bright | ink-raised | 7.02 | AAA |
| ink | verdigris-bright | 7.96 | AAA (active chip on dark) |
| ink | remedy | 4.72 | AA (CTA label) — *was 5.12 with old value* |
| remedy | ink | 4.72 | AA (mono labels / playhead labels on ink) |
| remedy | paper | 3.38 | **Large text only** → rule: remedy is never text on light grounds |
| ~~white~~ | remedy | ≈3.1 | Fails — confirms "ink text on remedy, never white" |
| ~~verdigris~~ | ink | 2.30 | Fails — use verdigris-bright on ink |

### Non-text pairs (1.4.11, ≥ 3.0)
| Element | Against | Ratio | Result |
|---|---|---|---|
| remedy playhead / active state | paper | 3.38 | Pass |
| remedy playhead / active state | paper-2 | 3.07 | Pass (old value 2.83 failed) |
| remedy | ink | 4.72 | Pass |
| remedy | mist | 2.86 | Fail → never the sole indicator on mist; add 1px ink keyline |
| verdigris focus ring | paper / paper-2 / mist | 6.94 / 6.29 / 5.88 | Pass |
| verdigris-bright focus ring | ink | 7.96 | Pass |
| line-strong border | paper / paper-2 | 3.42 / 3.10 | Pass (not on mist — use ink-2 there) |
| line-strong-on-ink border | ink / ink-raised | 4.15 / 3.66 | Pass |
| `--line` hairlines | any | ≈1.3 | Decorative only, never carries meaning |

### Typography
| Step | Family | Size | Line-height | Notes |
|---|---|---|---|---|
| `display-xl` (H1) | Fraunces 400, opsz auto | `clamp(2.5rem, 5.2vw, 4.75rem)` | 1.04 | `text-wrap: balance`, −0.02em, 3–4 lines |
| `display-l` (H2) | Fraunces 400 | `clamp(2rem, 3.6vw, 3.25rem)` | 1.08 | balance |
| `display-m` (statements) | Fraunces 350 | `clamp(1.625rem, 2.6vw, 2.375rem)` | 1.22 | #why, lead-ins, footer tagline uses `display-l` |
| `h3` | Instrument Sans 600 | `clamp(1.1875rem, 1.5vw, 1.375rem)` | 1.3 | |
| `body-l` | Instrument Sans 400 | `clamp(1.0625rem, 1.2vw, 1.1875rem)` | 1.55 | intros |
| `body` | Instrument Sans 400 | `1rem` | 1.6 | max ~66ch |
| `small` | Instrument Sans 400 | `0.875rem` | 1.5 | |
| `mono` | JetBrains Mono 500 | `0.75rem` | 1.4 | uppercase, +0.08em; chapter markers, timecodes, labels |

### Layout, motion, shape
- Grid: 12 columns, max 1360px, gutter `clamp(1rem, 2vw, 1.5rem)`, page margin `clamp(1rem, 4vw, 3rem)` (16px at 375px).
- Spacing: 4px base; chapter padding `clamp(5rem, 10vw, 9rem)`; `scroll-margin-top` = condensed header height + 16px.
- Radius: 2px default (precise, print-like); phone frame 28px outer / 20px screen.
- Elevation: hairlines over shadows; one soft shadow reserved for overlapping cards (hero infographic, lightbox).
- Motion: `--ease-cut: cubic-bezier(0.22, 1, 0.36, 1)`; `--dur-1: 180ms`, `--dur-2: 320ms`, `--dur-3: 600ms`; stagger ≤ 60ms; reveals = clip-path wipes / masks; `prefers-reduced-motion` → final states, `scroll-behavior: auto`.
- Targets: ≥ 24px (44px for primary touch controls).

---

## 5. `[VERIFY]` register

**Visible on the page** (rendered as `[VERIFY: …]`; `npm run prelaunch` fails until resolved):

| ID | Where | Item |
|---|---|---|
| V-01 | Footer; Organization JSON-LD | Contact email address |
| V-02 | `/privacy/` | Privacy policy — requires qualified review for the actual business and jurisdiction |
| V-03 | `/terms/` | Terms — requires qualified review for the actual business and jurisdiction |
| V-04 | Pricing · terms | Standard video length, formats, captions, voiceover, AI-avatar options |
| V-05 | Pricing · terms | What one revision includes and what counts as extra work |
| V-06 | Pricing · terms | When the monthly cycle begins and the expected delivery schedule |
| V-07 | Pricing · terms | Payment, renewal, cancellation, and treatment of unused deliverables |
| V-08 | Pricing · terms | Excluded third-party costs or special production requests |
| V-09 | Pricing · revision explainer | "Included" examples: adjusting on-screen text wording; tightening captions; reordering points within the approved direction |
| V-10 | Pricing · revision explainer | "Separate quote" examples: new concepts; substantial changes after approval; additional versions |
| V-11 | About | Optional verified founder / experience / location / business-history detail (guide §10: add only verified details) — slot shown, or removed if you prefer none |
| V-12 | Footer | Legal entity name for the copyright line |

**Open items, not rendered** (tracked here and in the final report):

| ID | Item |
|---|---|
| O-01 | Production domain (drives `metadataBase`, canonical, sitemap, OG URLs) |
| O-02 | Promotion: regular prices, start/end dates, terms. Promo stays **off** until all four exist |
| O-03 | Whether Growth may be called "most popular" (not shown unless verified) |
| O-04 | Real logo / official colours / fonts (placeholder wordmark + monogram until supplied) |
| O-05 | Portfolio: final video files, posters, and `.vtt` captions to replace placeholders; any client work needs written permission (`clientName`, `approvedAt`) |
| O-06 | `FORM_WEBHOOK_URL` destination (e.g. GoHighLevel inbound webhook or email service) |
| O-07 | Analytics: Plausible domain; whether GA4 is wanted (requires consent banner) |
| O-08 | Social profile URLs for Organization `sameAs` (omitted until verified) |
| O-09 | Whether to enable Cloudflare Turnstile |
| O-10 | Hosting choice: Netlify (default) or Vercel |
| O-11 | Keyword themes are unvalidated (guide §3–4) — validate with keyword tools / Search Console after launch |
| O-12 | Inquiry follow-up time — success message will not state a timeframe unless you confirm one |

---

## 6. Engineering notes that shape later phases

- **JS budget (~130 KB gz first load).** Motion loads only inside hydrate-on-approach islands via `LazyMotion` + `domAnimation`; the hero stage uses CSS/WAAPI. Radix packages are imported per primitive.
- **FAQ and hidden text.** Closed accordion panels stay in the server HTML (`hidden="until-found"`) so content is indexable, find-in-page works, and the FAQPage schema matches visible content.
- **content-visibility.** Applied per chapter with measured `contain-intrinsic-size`; Playwright will assert anchor jumps and rail ticks land within ±4px.
- **No-JS form.** Server-rendered single-step form posts to `/api/inquiry`; the route redirects to `/?sent=1#contact` for non-JS submissions and returns JSON for the enhanced flow.
- **Claims linter allowlist.** Guide disclaimer sentences containing "guarantee", "viral", "results" are allowlisted by exact string.
