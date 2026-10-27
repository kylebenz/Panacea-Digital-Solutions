# Build Brief: Panacea Digital Solutions (Single-Page Website)

> Paste this whole file into Claude Code, or save it as `BUILD_BRIEF.md` in the project root and say: "Read BUILD\_BRIEF.md and docs/brand-guide.pdf, then start Phase 0."

---

## 0\. Your role and how to work

You are a senior product designer and front-end engineer. You are building the marketing website for **Panacea Digital Solutions**. Panacea creates **AI-assisted healthcare advertisement videos** and **healthcare infographic images** for U.S. healthcare startups and small healthcare businesses.

**Format: a single-page website.**

- All information lives on one page (`/`): services, process, samples, pricing, about, FAQ, and contact.  
- The page is organized as clearly labelled chapters.  
- Navigation uses anchor links.  
- The only other routes are the legally required pages (Privacy and Terms), a 404 page, and a dev-only style guide.

**Source of truth.**

- The brand guide is at `docs/brand-guide.pdf` ("SEO Website Brand Guide & Content Playbook," October 2026). Read all of it before you write any code.  
- The guide was written for a multi-page site. Section 4 of this brief explains how its page content maps onto one page.  
- The guide wins on copy, metadata, pricing, claims, and compliance.  
- This brief decides visual identity, interaction design, architecture, and engineering standards.  
- If they conflict, follow the guide and tell me.

**Working mode.**

- Work in the phases listed in Section 12\.  
- Stop at both checkpoints and wait for my approval.  
- After every phase, run typecheck, lint, and build, then commit with a clear message.  
- Never invent facts about the business.  
  - When information is missing, insert a visible `[VERIFY: …]` placeholder.  
  - Add each placeholder to the open-items list.

**Quality bar.**

- The page should feel like something a design-led studio would ship: editorial, precise, calm, and warm.  
- It needs a small number of memorable interactions. Each one must *demonstrate the service Panacea sells*, not decorate the page.  
- A long single page lives or dies on **rhythm and wayfinding**:  
  - Alternate the density of sections.  
  - Alternate light and dark sections.  
  - Always let the visitor know where they are and how to jump ahead.  
- If a design choice would look at home on any generic SaaS landing page, replace it with a better one.

---

## 1\. Non-negotiables (compliance and brand guardrails)

All of these come from the guide. Violating any of them is a failed build.

1. **Scope.** Panacea sells two services only: AI-assisted healthcare ad videos and healthcare infographic images. Web design must not appear as a service anywhere on the site, including nav, copy, schema, footer, and metadata.  
2. **No outcome promises.** Never guarantee virality, reach, leads, appointments, sales, patients, revenue, medical outcomes, rankings, or timelines.  
3. **No fabricated trust signals.** None of the following, anywhere:  
   - fake testimonials, reviews, or ratings  
   - client logos or "trusted by" strips  
   - customer counts, years of experience, awards, or invented statistics  
   - case studies or campaign results  
4. **Portfolio honesty.**  
   - Fictional or speculative work must carry a visible **"Concept Sample"** label.  
   - Real client work appears only with written permission. Enforce this in the data types (Section 8).  
5. **Pricing.**  
   - Starter \$99/mo: 4 videos \+ 4 infographics.  
   - Growth \$199/mo: 10 videos \+ 10 infographics.  
   - Scale \$549/mo: 30 videos \+ 30 infographics.  
   - Every plan includes 1 revision per content item.  
   - Prices come from one config file.  
   - **The "50% off" promotion stays OFF.** Do not show crossed-out prices, countdown timers, or invented urgency until regular prices, promo dates, and terms are confirmed (see Section 8).  
6. **Not a healthcare provider.**  
   - No medical-advice language.  
   - No clinical keywords used as if Panacea provides care.  
   - No invented clinical claims in any sample or demo content.  
7. **No PHI.** The contact form must say clearly that visitors should not submit patient names, medical records, PHI, or sensitive patient details. Never send form contents to analytics.  
8. **SEO integrity.** None of the following:  
   - keyword stuffing  
   - hidden text  
   - doorway pages  
   - location pages  
   - misleading structured data  
9. **AI transparency.** Never present AI-generated people as real clients, patients, or staff.

---

## 2\. Tech stack

- **Next.js** (latest stable, App Router), **TypeScript** in strict mode.  
- **Tailwind CSS v4**, with all design tokens defined in CSS `@theme`.  
- **Motion** (`motion/react`) for animation.  
- CSS `position: sticky` and `IntersectionObserver` for scroll effects. No scroll-jacking or smooth-scroll hijack libraries; native scrolling only.  
- **Radix UI primitives** for Dialog, Accordion, Tabs, and Toggle Group (accessibility baseline). Style them completely; no default component-library look.  
- **react-hook-form \+ zod** for the inquiry form.  
- `next/font` self-hosted fonts and `next/image`.  
- **Deployment:** Netlify (or Vercel) using the standard Next.js runtime, so the form's route handler and image optimization work.  
- **Testing:** Playwright for end-to-end tests and the crawler checks, `@axe-core/playwright` for accessibility, Lighthouse CI for performance.  
- **Analytics:** cookieless Plausible by default. GA4 is allowed only behind a consent banner. Configure this through env vars.

---

## 3\. Art direction: "The Clinical Edit"

The guide defines no visual identity, so this is the proposed direction.

- If `docs/brand/` contains official colors, a logo, or fonts, use those instead.  
- Either way, present the token set at Checkpoint 1\.

### 3.1 Concept

Panacea sits where a **film edit suite** meets a **well-designed patient leaflet**. Two visual languages each mirror one service, and they share a warm, paper-like foundation:

- **Production language (videos):**  
  - timecodes (`00:00:12`)  
  - 9:16 frames  
  - frame counters  
  - script slugs  
  - scrub bars and playheads  
  - burned-in captions  
- **Diagram language (infographics):**  
  - hairline grids  
  - annotation leader lines  
  - numbered callouts  
  - measured spacing  
  - registration marks

The product is the imagery. Phone frames, storyboards, and infographic cards carry the visual weight, not stock photography.

**Single-page metaphor.** The page is presented as **one reel made of chapters**.

- Each section is a chapter with a number and a timecode-style marker, for example `CH 04 · 00:04:00 — PRICING`.  
- A chapter rail (Section 7B) shows progress through the reel.

### 3.2 Color tokens (proposed)

Verify every text/background pair against WCAG AA and adjust the token values if any pair fails.

| Token | Value | Use |
| :---- | :---- | :---- |
| `--paper` | `#F5F1E8` | Base background (warm bone) |
| `--paper-2` | `#ECE6D9` | Alternate/raised sections |
| `--ink` | `#111816` | Primary text; dark "edit suite" chapters |
| `--ink-2` | `#4A5552` | Secondary text |
| `--verdigris` | `#2D5A4E` | Brand primary: links, focus rings, diagram strokes |
| `--remedy` | `#E2603A` | Signal accent: CTA fills (with **ink** text, never white), playheads, active states. Never used as body text on paper. |
| `--mist` | `#D6E2DC` | Diagram backgrounds and tints |
| `--line` | ink at 12% | Hairlines and grid |

**Rhythm.**

- Chapters alternate between paper, paper-2, and ink backgrounds. Plan the sequence deliberately (see Section 4).  
- Never place two dense interactive chapters next to each other without a breathing section between them.

### 3.3 Typography

- **Display:** Fraunces, variable, weights 350–500, using the optical-size axis. Use it for H1, H2, and large statements. Apply `text-wrap: balance` to headings.  
- **Text/UI:** Instrument Sans.  
- **Utility:** JetBrains Mono, used only for chapter markers, timecodes, step numbers, labels, and metadata. Uppercase, letter-spacing \+0.08em.  
- Use a fluid type scale built with `clamp()`.  
  - The H1 is long, so size it at about `clamp(2.5rem, 5.2vw, 4.75rem)` and keep it to 3–4 balanced lines.  
- Maximum 3 font families. Subset them and use `font-display: swap`.

### 3.4 Layout

- 12-column grid, max width \~1360px, generous whitespace, and deliberate asymmetry.  
- In "diagram language" chapters, show the hairline grid faintly.  
- Set `scroll-margin-top` on every chapter so anchor jumps clear the sticky header.

### 3.5 Motion principles

- Signature easing: `cubic-bezier(0.22, 1, 0.36, 1)`, the "edit cut."  
- Durations: 180–600ms. Stagger: 60ms or less.  
- Reveals use **frame wipes and mask reveals**, not fade-up on every element.  
- Only the hero stage loops. It pauses when off-screen, on hover, and on focus.  
- Every animation must clarify something.  
- `prefers-reduced-motion` gives instant, static final states everywhere.  
- Anchor jumps use native smooth scrolling (`scroll-behavior: smooth`), which is turned off under reduced motion.

### 3.6 Logo (placeholder until a real logo is supplied)

- An SVG wordmark "PANACEA" with a small "Digital Solutions" subline.  
- A simple monogram: a **P** built from a 9:16 frame and a square, standing for video plus infographic.  
- **Do not use** a caduceus, Rod of Asclepius, red cross, pills, or stethoscopes. They imply Panacea provides care, and the Red Cross emblem is legally protected.

### 3.7 Banned patterns (generic-site tells)

- Stock "doctor with stethoscope" or handshake hero images.  
- Purple/blue AI gradients, glowing orbs, or mesh blobs.  
- Glassmorphism used everywhere.  
- The generic three-column grid of icon cards as a primary layout device.  
- Animated stat counters.  
- Logo strips.  
- Testimonial carousels.  
- Chatbot widgets.  
- Custom cursors.  
- Emoji.  
- Lorem ipsum.  
- Hype words: *revolutionize, unlock, elevate, supercharge, game-changing, cutting-edge, seamless, world-class, skyrocket*.  
- Exclamation marks in headings.

---

## 4\. Single-page structure

### 4.1 How the guide's pages map onto one page

- The guide's separate pages become **chapters** on `/`.  
- Each chapter has an `id` anchor.  
- The home H1 stays the **only H1**. The H1 the guide gives each other page becomes that chapter's **H2**, kept word for word.  
- Use the guide's body copy **verbatim** (guide sections 6–13).  
  - Remove only exact duplicates. For example, "Clear expectations" and the About page commitments say the same thing, so merge them into one section.  
- You may write microcopy (labels, states, errors, alt text, captions, demo content) in the same voice: plain, specific, calm.

### 4.2 Chapter order

| \# | Anchor | Chapter (H2 from guide) | Background | Key content |
| :---- | :---- | :---- | :---- | :---- |
| 00 | `#top` | **H1:** AI Healthcare Advertisement Videos and Infographics | paper | Hero copy, CTAs "Get Started" → `#contact` and "View Sample Work" → `#portfolio`; Storyboard Assembly stage (7A) |
| — | — | *(sample strip)* | paper | 3–4 portfolio items placed near the top, as the guide requires; links to `#portfolio` |
| 01 | `#why` | Healthcare content, made simpler | paper-2 | Guide copy as a large editorial statement |
| 02 | `#services` | Content services | paper | Two contrasting overview panels: a dark video panel and a light diagram panel. Each jumps to its deep chapter. |
| 03 | `#ad-videos` | AI-Assisted Advertisement Videos for Healthcare Businesses | **ink** | Guide service copy; "What is included" production checklist; Anatomy of a Short Ad (7E); "What this service is designed to support" |
| 04 | `#infographics` | Healthcare Infographic Images for Clearer Communication | paper \+ grid | Guide copy; Infographic Anatomy (7F); use cases |
| 05 | `#demo` | Script-to-Screen (new microcopy H2, e.g. "See how a short ad comes together") | paper-2 | Script-to-Screen demo (7C) |
| 06 | `#process` | How it works | **ink** | Process Timeline (7D), using the guide's four steps exactly |
| 07 | `#who-we-help` | Who we help | paper | Audience chips (from the guide's audience table) that reveal the "website response" line; suitability caveat |
| 08 | `#portfolio` | Healthcare Advertisement Video and Infographic Samples | paper | Portfolio Explorer (7G) |
| 09 | `#pricing` | Monthly Healthcare Content Packages | paper-2 | Package Comparator (7H); revision explainer; pricing terms |
| 10 | `#about` | A Creative Content Partner for Healthcare Businesses | paper | About copy; "Our commitments" ledger, which also absorbs "Clear expectations" |
| 11 | `#faq` | Frequently Asked Questions | paper-2 | Accordion with live filter and per-question anchors |
| 12 | `#contact` | Tell Us About Your Healthcare Content Needs | **ink** | The guide's final CTA headline as a lead-in, then the Inquiry Flow (7I) |

### 4.3 Other routes

- `/privacy/` and `/terms/`. The guide requires these to be published. They are shells containing `[VERIFY: requires qualified review for the actual business and jurisdiction]`.  
- A custom 404 page styled as an "end of reel" frame, linking back to `/`.  
- `/styleguide/`. Dev only: `noindex` and disallowed in robots.txt.  
- **No blog in v1.** Save the guide's 7 article ideas as outlines in `docs/blog-outlines.md` for later.

### 4.4 Split-ready architecture

- Build each chapter as a self-contained component with its own content file.  
- This way, any chapter can later become its own URL without rework, if search data shows it's worth it.

---

## 5\. Global components

### Header

- Sticky header with the wordmark.  
- Anchor nav: Videos · Infographics · Samples · Pricing · About · FAQ.  
- A `remedy` "Get Started" button that jumps to `#contact`.  
- Scrollspy highlights the active chapter, and the header condenses on scroll.

### Mobile

- A full-screen anchor menu with a staggered mask reveal and focus trap. It closes when a link is clicked.  
- The header shows the current chapter name in mono.  
- A **sticky bottom CTA bar** ("Get Started" → `#contact`) that appears after the hero and hides when `#contact` is visible.

### Footer

- The tagline **"Healthcare Content. Thoughtfully Created."** set large in Fraunces.  
- Repeat the anchor nav.  
- Privacy and Terms links.  
- Contact email: `[VERIFY]`.  
- This disclaimer: *"Panacea Digital Solutions creates informational and promotional content. We are not a healthcare provider and do not provide medical advice."*

### Primitives

- Chapter marker.  
- Timecode label.  
- Annotated card.  
- Phone frame (9:16).  
- Infographic frame.  
- Buttons in primary, secondary, and ghost variants, each with hover, active, focus-visible, and loading states.  
- "Concept Sample" badge.  
- Mono-styled tag chips.

### In-page links

- Follow the intent of the guide's Section 16 using anchor links. Examples: services → `#pricing` ("compare content packages") and `#portfolio` ("view sample videos and infographics").  
- Use descriptive anchors and vary their wording.

---

## 6\. Content rules

- Use guide copy verbatim (see 4.1).  
- Every CTA on the page leads to either `#contact` or `#pricing`.  
- Plan buttons ("Choose Starter," "Choose Growth," "Choose Scale") scroll to `#contact` **and pre-select that package** in the form.  
  - Support `/?package=growth#contact` as well, so links can be shared.  
- There is no checkout.

---

## 7\. Signature interactions

These nine interactions are what make the page distinctive. Build each as an isolated, tested component.

### 7A. Storyboard Assembly (hero stage)

**What it shows:**

- A 9:16 phone frame cycling through 4 illustrated storyboard frames, built in DOM/SVG, not video.  
- Burned-in captions that appear word by word.  
- A running timecode from `00:00:00` to `00:00:15`.  
- An infographic card overlapping the frame that builds itself: a title, then three numbered steps drawn in with annotation leaders.  
- A tiny "Illustrative" tag.

**Behavior:**

- Loops slowly.  
- Pauses when off-screen, on hover, and on focus.  
- Under reduced motion, shows the static final composition.

**Constraints:**

- The **H1 must be the LCP element.** The stage hydrates after it.  
- The stage's own JS must stay under \~30KB gzipped.  
- No `<video>` above the fold.

### 7B. Chapter Rail (page-wide wayfinding)

**Desktop (≥1024px):**

- A slim vertical rail on the right edge, styled like a video chapter scrubber.  
- Each chapter is a tick with its number. A `remedy` playhead tracks scroll progress.  
- Hovering or focusing a tick shows the chapter name and timecode.  
- Clicking a tick jumps to that chapter.

**Mobile:** The current chapter name appears in the header instead.

**Accessibility:**

- Use `nav aria-label="Page chapters"`.  
- The ticks are links.  
- The active tick has `aria-current`.

### 7C. Script-to-Screen demo (`#demo`)

**Controls:**

- **Business type:** Home care provider / Small clinic / Wellness business / Healthcare startup.  
- **Goal:** Introduce a service / Answer a common question / Invite an inquiry.

**Output (one panel, three linked views):**

1. **Script:** Hook 0–3s · Message 3–12s · Call to action 12–15s.  
2. **Storyboard:** 4 frames, each with shot notes.  
3. **Infographic outline:** a title plus 3–4 blocks.

**Content:**

- Pre-author all 12 combinations in `content/script-demo.ts`.  
- No runtime AI calls.  
- Use placeholders like `[Your agency name]`.  
- No clinical claims and no outcome claims.  
- Switching combinations uses Motion layout transitions.

**Panel footer and CTA:**

- Footer text: *"Illustrative concept. Every real script is built from your verified service details and approved by you before publication."*  
- CTA: "Discuss Your Content" → `#contact`.

### 7D. Process Timeline (`#process`)

**Design:** The guide's four steps appear as **clips on an edit timeline**, with a `remedy` playhead.

**Desktop:**

- The chapter uses `position: sticky`, and scroll progress moves the playhead.  
- The active clip expands to show its guide copy.

**Mobile:** A vertical stepper with no pinning.

**Accessibility:**

- The steps are a real Tabs pattern, so they work with the keyboard.  
- Reduced motion shows a static ordered list.

### 7E. Anatomy of a Short Ad (`#ad-videos`)

- A mock player whose timeline is divided into segments: Hook / Message / Call to action, with a "Captions throughout" track.  
- Dragging or keyboard-stepping the playhead swaps the preview frame and its annotation.  
- Implement it as an accessible slider (`role="slider"`, arrow keys, `aria-valuetext` naming the segment).

### 7F. Infographic Anatomy (`#infographics`)

**The sample:** One large concept infographic built in SVG/HTML. Use a non-clinical topic, such as "Questions to ask before choosing a home care provider."

**Hotspots:**

- Five numbered hotspots map to the guide's principles:  
  1. one central idea  
  2. readable hierarchy  
  3. verified facts and client approval  
  4. licensed assets  
  5. agreed dimensions  
- Hover, focus, or tap draws a leader line and opens a note.  
- Each hotspot is a real `<button>`.

**Fallback:** A screen-reader list carries the same content.

### 7G. Portfolio Explorer (`#portfolio`)

**Filtering and layout:**

- Filter chips: All / Videos / Infographics, plus a topic filter.  
- Filtering animates in place, with no page change.  
- Grid that respects aspect ratios: 9:16 videos, 4:5 or 1:1 infographics.

**Cards:** each card follows the guide's structure:

- title  
- audience  
- communication goal  
- asset type and format  
- the badge

**Video playback:**

- On desktop, hovering previews a muted video only if a preview file exists and reduced motion is off.  
- Clicking opens a Radix Dialog lightbox with the full player.  
- **Captions (`.vtt`) are required.**  
- Closing the lightbox returns focus to the card.

**Initial content:**

- Ship 6–8 Concept Samples.  
- Infographics can be built as SVG.  
- Video items use poster images and placeholder files I will replace.

### 7H. Package Comparator (`#pricing`)

**Plan cards:**

- Three cards, all reading from `site.config.ts`. Growth is visually featured as the middle option, but with no "most popular" claim unless it has been verified.  
- Each card shows its deliverables as **tiles**: 9:16 tiles for videos and square tiles for infographics (4+4, 10+10, 30+30), so the difference in volume can be seen at a glance.

**Per-item cost:**

- Show a computed "≈ \$X per content item." It must be calculated from config, never hardcoded.  
- The current values work out to \$12.38, \$9.95, and \$9.15.

**Revision explainer:** A segmented toggle with two states.

- **Included in your revision:** the guide's definition, plus examples such as:  
  - adjusting on-screen text wording  
  - tightening captions  
  - reordering points within the approved direction  
- **Needs a separate quote:**  
  - new concepts  
  - substantial changes after approval  
  - additional versions  
- Mark the examples `[VERIFY]`.

**Pricing terms:** Show the guide's Section 9 terms as a compact ruled list. Each item is marked `[VERIFY]` until confirmed:

- video length, formats, captions, voiceover, avatar options  
- what counts as extra work  
- cycle start and delivery schedule  
- payment, renewal, cancellation, unused deliverables  
- excluded third-party costs

### 7I. Inquiry Flow (`#contact`)

**Steps:** Three steps, with progress shown as `STEP 02 / 03`.

1. **You:** name, business email, preferred contact method.  
2. **Business:** healthcare business name, website/social (optional), specialty or service type.  
3. **Content:** package of interest (pre-selected by plan buttons or `?package=`), "What services or message do you want to promote?"

**PHI notice:**

- Show the guide's PHI notice at the top of the form.  
- Repeat it beside the textarea.

**Validation and accessibility:**

- zod validation with inline errors announced through `aria-live`.  
- With JavaScript disabled, the form falls back to a single step.

**Submission:**

- Submit to `app/api/inquiry/route.ts`.  
- The route forwards to a configurable `FORM_WEBHOOK_URL` (for example a CRM inbound webhook such as GoHighLevel, or an email service).  
- Spam protection: a honeypot field and a minimum time-to-submit check. Cloudflare Turnstile is optional.

**Success state:** Replace the form in place with a message explaining what happens next.

**Analytics:** Track step and submit events only, with no field values.

---

## 8\. Content model (one source of truth)

### Location

- `content/` holds each chapter's copy in its own typed file (`hero.ts`, `ad-videos.ts`, `pricing.ts`, …). Components never hardcode copy.  
- `site.config.ts` holds the business name, URL, contact details, plans, the chapter list (order, ids, labels), and the promo object.  
- The header nav, chapter rail, footer nav, and mobile menu are **all generated from that one chapter list**.

### Promo config

promo: { enabled: false, regularPrices: null, startDate: null, endDate: null, terms: null }

- A zod schema enforces it at build time.  
- If `enabled: true` and any field is missing, the **build fails**.  
- No countdown component is allowed to exist.

### Portfolio items

Use a discriminated union:

type PortfolioItem \= Base & (

  \| { status: 'concept' }                       // renders "Concept Sample" badge

  \| { status: 'client'; permission: { onFile: true; clientName: string; approvedAt: string } }

)

---

## 9\. SEO for a single page

### Metadata

- Title: **"AI Healthcare Ad Videos & Infographics \| Panacea Digital"**  
- Meta description: the guide's home meta description, word for word.  
- Set `metadataBase` and a self-referencing canonical.  
- OG and Twitter tags, with a branded `opengraph-image` using paper/ink and the timecode motif.

### Keyword coverage

- The other pages' keyword themes are covered naturally by their chapter H2s and copy (guide Section 4).  
- Never repeat a phrase just to rank.

### Sitemap and robots

- `sitemap.ts` lists `/`, `/privacy/`, and `/terms/`.  
- `robots.ts` disallows `/styleguide/`.  
- **On any non-production environment, disallow all crawling.**

### JSON-LD

Put it all on `/`, and use only accurate structured data:

- `Organization`. Include email/contactPoint only once verified. No `LocalBusiness`, because there is no physical address.  
- `WebSite`.  
- `Service`, twice. Each has `provider: Panacea` and `areaServed: US`.  
- `OfferCatalog` with USD `Offer`s for the three plans.  
- `FAQPage`. It is valid markup, but do not expect rich results, because Google limits them.

**Never** use `Review` or `AggregateRating`.

### On-page requirements

- Exactly one H1, then a logical H2 → H3 hierarchy within each chapter.  
- Descriptive image filenames and useful alt text.  
- Captions or transcripts for all video.

### Trade-off to acknowledge in the README

- One URL can rank for fewer distinct searches than the guide's multi-page plan.  
- The split-ready architecture (4.4) lets us move a chapter to its own URL later if Search Console shows demand.

---

## 10\. Accessibility (WCAG 2.2 AA)

- A skip link to the main content and a second skip link to `#contact`.  
- Visible, branded focus rings in `verdigris`, with offset.  
- Target sizes of at least 24px.  
- Color is never the only way information is conveyed.  
- Every interactive element works with the keyboard.  
- Dialogs and the mobile menu trap focus and return it on close.  
- Anchor jumps move focus to the target chapter heading (`tabindex="-1"`).  
- Reduced motion is respected everywhere.  
- axe must report **zero violations**.

---

## 11\. Performance budgets (mobile, simulated 4G)

A long page needs strict loading discipline.

| Metric | Target |
| :---- | :---- |
| Lighthouse Performance | 95 or higher |
| Lighthouse Accessibility, Best Practices, SEO | 100 |
| LCP | 2.0s or less |
| CLS | 0.05 or less |
| INP | 200ms or less |

**Loading rules:**

- **Hydrate on approach.**  
  - Load each interactive chapter component (7C–7I) with dynamic `import()`.  
  - Trigger it through `IntersectionObserver` with roughly a 600px `rootMargin`.  
  - Server-render a static version of each so content and layout exist before hydration.  
- Use `content-visibility: auto` with `contain-intrinsic-size` on chapters below the fold. Verify that anchor jumps and the chapter rail still land accurately.  
- First-load JS must be about 130KB gzipped or less.  
- Use the video facade pattern: poster first, load the player on intent.  
- No autoplaying video above the fold.  
- Serve AVIF/WebP images with explicit dimensions, lazy-loaded below the fold.

---

## 12\. Phases and checkpoints

### Phase 0: Read and plan

Read the guide and this brief. Then reply with:

- the final chapter list  
- a component inventory  
- the token set, with the measured contrast ratio for every text/background pair  
- a list of every `[VERIFY]` item

**→ CHECKPOINT 1: wait for my approval.**

### Phase 1: Foundation

1. Scaffold the project.  
2. Build the tokens, type scale, layout primitives, header with scrollspy, chapter rail (7B), footer, and mobile CTA bar.  
3. Build `/styleguide/` showing every token, the type scale, all button states, chapter markers, timecodes, cards, frames, form fields, badges, and motion samples.  
4. Create `CLAUDE.md` containing the Section 1 guardrails, so future sessions keep them.

**→ CHECKPOINT 2: send screenshots at 375px and 1440px, then wait.**

### Phases 2–6: Chapters

- **Phase 2:** Hero (7A), sample strip, chapters 01–02.  
- **Phase 3:** chapters 03–04 (7E, 7F).  
- **Phase 4:** chapters 05–07 (7C, 7D).  
- **Phase 5:** chapters 08–09 (7G, 7H).  
- **Phase 6:** chapters 10–12 (7I and the route handler), plus the legal page shells and the 404 page.

### Phase 7: SEO and prelaunch tooling

Complete Section 9\. Then add `npm run prelaunch`, which runs these checks.

**Hard failures:**

- any `[VERIFY` string in rendered output  
- an incomplete promo object  
- a `client` portfolio item without permission  
- more or fewer than one H1  
- duplicate or missing chapter ids  
- any nav or rail link that doesn't resolve to an element

**Warnings:**

- **Claims linter.** Flags *guarantee, viral, \#1, best, cure, treat, results, proven* in copy. The guide's own disclaimer sentences are allowlisted.

### Phase 8: QA

- **Playwright tests:**  
  - every anchor link and rail tick  
  - scrollspy accuracy  
  - form success and error paths  
  - plan-button and `?package=` pre-selection  
  - portfolio filters and lightbox  
  - the keyboard-only journey from top to `#contact`  
  - a reduced-motion snapshot  
- **axe** on every route.  
- **Lighthouse CI.**  
- **Visual screenshots** at 375, 768, 1280, and 1440px. Capture both full-page and per-chapter shots.

Fix every issue, then report.

---

## 13\. Definition of done

- [ ] All guide content appears on the single page, with the H2s mapped as described in 4.1.  
- [ ] Every item in guide sections 15 and 19 is met or explicitly marked `[VERIFY]`.  
- [ ] All Section 1 guardrails pass, and `npm run prelaunch` is clean apart from known `[VERIFY]` items.  
- [ ] Performance and accessibility budgets are met.  
- [ ] All nine signature interactions work with mouse, touch, keyboard, and reduced motion.  
- [ ] No banned pattern from Section 3.7 appears anywhere.

## 14\. Final deliverables

1. **The working site.**  
2. **`README.md`**, covering:  
   - setup  
   - env vars  
   - how to edit copy, pricing, portfolio items, chapter order, and the promo flag  
   - Netlify deployment  
   - connecting Google Search Console and submitting the sitemap  
   - the single-page SEO trade-off  
3. **`LAUNCH_CHECKLIST.md`**: guide sections 15 and 19, each item mapped to a status.  
4. **`docs/blog-outlines.md`**: the guide's 7 article ideas as outlines.  
5. **A consolidated list of every open `[VERIFY]` item** for me to resolve.