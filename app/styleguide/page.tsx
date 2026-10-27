import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hero } from "@/content/hero";
import { why } from "@/content/why";
import { pricing } from "@/content/pricing";
import { chapters } from "@/lib/chapters";
import { colorTokens, contrastPairs, contrastRatio, minimumFor, tokenValue } from "@/lib/tokens";
import { cn } from "@/lib/cn";
import type { Tone } from "@/lib/config-schema";
import { Button } from "@/components/primitives/Button";
import { ChapterMarker } from "@/components/primitives/ChapterMarker";
import { Timecode } from "@/components/primitives/Timecode";
import { AnnotatedCard } from "@/components/primitives/AnnotatedCard";
import { PhoneFrame } from "@/components/primitives/PhoneFrame";
import { InfographicFrame } from "@/components/primitives/InfographicFrame";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";
import { TagChip } from "@/components/primitives/TagChip";
import { VerifyMark } from "@/components/primitives/VerifyMark";
import { Callout } from "@/components/primitives/Callout";
import { LeaderLine } from "@/components/primitives/LeaderLine";
import { RegistrationMarks } from "@/components/primitives/RegistrationMarks";
import { FieldShell, Select, TextArea, TextInput, describedBy } from "@/components/primitives/Field";
import { Logo } from "@/components/brand/Logo";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { MotionSamples } from "./MotionSamples";

export const metadata: Metadata = {
  title: "Style guide | Panacea Digital",
  robots: { index: false, follow: false },
};

const sections = [
  ["colour", "Colour"],
  ["contrast", "Contrast"],
  ["tones", "Tones"],
  ["type", "Type scale"],
  ["buttons", "Buttons"],
  ["markers", "Markers & timecodes"],
  ["cards", "Cards"],
  ["frames", "Frames"],
  ["fields", "Form fields"],
  ["badges", "Badges & chips"],
  ["logo", "Logo"],
  ["layout", "Layout"],
  ["motion", "Motion"],
] as const;

function Section({
  id,
  title,
  tone = "paper",
  children,
}: {
  id: string;
  title: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section id={id} data-tone={tone} aria-labelledby={`${id}-h`} className="scroll-mt-20 border-t border-rule py-16">
      <div className="page">
        <h2 id={`${id}-h`} className="text-display-m mb-10">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="text-mono mb-4 text-fg-muted">{children}</h3>;
}

const buttonStates = [
  { label: "Default", props: {} },
  { label: "Hover", props: { preview: "hover" as const } },
  { label: "Active", props: { preview: "active" as const } },
  { label: "Focus-visible", props: { preview: "focus" as const } },
  { label: "Loading", props: { loading: true, loadingLabel: "Sending…" } },
  { label: "Disabled", props: { disabled: true } },
];

function ButtonMatrix({ label }: { label: string }) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={label}>
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <thead>
          <tr className="text-mono text-fg-muted">
            <th scope="col" className="py-3 pr-4 font-medium">
              State
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Primary
            </th>
            <th scope="col" className="py-3 pr-4 font-medium">
              Secondary
            </th>
            <th scope="col" className="py-3 font-medium">
              Ghost
            </th>
          </tr>
        </thead>
        <tbody>
          {buttonStates.map((state) => (
            <tr key={state.label} className="border-t border-rule">
              <th scope="row" className="text-mono py-4 pr-4 font-medium text-fg-muted">
                {state.label}
              </th>
              <td className="py-4 pr-4">
                <Button {...state.props} arrow>
                  Get Started
                </Button>
              </td>
              <td className="py-4 pr-4">
                <Button variant="secondary" {...state.props}>
                  View Sample Work
                </Button>
              </td>
              <td className="py-4">
                <Button variant="ghost" {...state.props}>
                  Compare content packages
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FieldSamples({ prefix }: { prefix: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <FieldShell id={`${prefix}-name`} label="Name">
        <TextInput id={`${prefix}-name`} autoComplete="off" defaultValue="" placeholder="" />
      </FieldShell>
      <FieldShell id={`${prefix}-hover`} label="Business email (hover)">
        <TextInput id={`${prefix}-hover`} type="email" preview="hover" />
      </FieldShell>
      <FieldShell id={`${prefix}-focus`} label="Healthcare business name (focus)">
        <TextInput id={`${prefix}-focus`} preview="focus" />
      </FieldShell>
      <FieldShell
        id={`${prefix}-error`}
        label="Business email (error)"
        error="Enter an email address in the format name@business.com."
      >
        <TextInput
          id={`${prefix}-error`}
          type="email"
          aria-invalid="true"
          aria-describedby={describedBy(`${prefix}-error`, { error: true })}
          defaultValue="name@"
        />
      </FieldShell>
      <FieldShell id={`${prefix}-site`} label="Website or social profile" optional>
        <TextInput id={`${prefix}-site`} type="url" />
      </FieldShell>
      <FieldShell id={`${prefix}-disabled`} label="Package of interest (disabled)">
        <Select id={`${prefix}-disabled`} disabled defaultValue="growth">
          <option value="growth">Growth</option>
        </Select>
      </FieldShell>
      <FieldShell id={`${prefix}-select`} label="Package of interest">
        <Select id={`${prefix}-select`} defaultValue="">
          <option value="">Not sure yet</option>
          <option value="starter">Starter</option>
          <option value="growth">Growth</option>
          <option value="scale">Scale</option>
        </Select>
      </FieldShell>
      <FieldShell
        id={`${prefix}-message`}
        label="What services or message do you want to promote?"
        hint="Please do not submit patient names, medical records, protected health information, or other sensitive patient details through this form."
        className="md:col-span-2"
      >
        <TextArea id={`${prefix}-message`} aria-describedby={describedBy(`${prefix}-message`, { hint: true })} />
      </FieldShell>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="pb-10">
      <div data-tone="paper" className="page pt-14 pb-12">
        <p className="text-mono text-fg-muted">Dev only · noindex</p>
        <h1 className="text-display-xl mt-4">Style guide</h1>
        <p className="text-body-l measure mt-5 text-fg-muted">
          “The Clinical Edit” — a film edit suite meets a well-designed patient leaflet. Every token, type step, state,
          and primitive used on the single page.
        </p>
        <nav aria-label="Style guide sections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="chip no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Section id="colour" title="Colour tokens">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colorTokens.map((token) => (
            <li key={token.name} className="border border-rule-strong">
              <div className="h-20 border-b border-rule" style={{ backgroundColor: token.value }} />
              <div className="p-3">
                <p className="text-mono">--{token.name}</p>
                <p className="font-mono text-[0.8125rem] text-fg-muted">{token.value}</p>
                <p className="text-small mt-1 text-fg-muted">{token.use}</p>
              </div>
            </li>
          ))}
          <li className="border border-rule-strong">
            <div className="h-20 border-b border-rule bg-[linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[length:12px_100%]" />
            <div className="p-3">
              <p className="text-mono">--line</p>
              <p className="font-mono text-[0.8125rem] text-fg-muted">ink @ 12%</p>
              <p className="text-small mt-1 text-fg-muted">Decorative hairlines and grid only</p>
            </div>
          </li>
        </ul>
      </Section>

      <Section id="contrast" title="Measured contrast" tone="paper-2">
        <p className="measure mb-6 text-fg-muted">
          Computed live from the token values (WCAG 2 relative luminance). Text needs 4.5:1, large text and non-text
          elements need 3:1.
        </p>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Contrast table">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="text-mono text-fg-muted">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Sample
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Pair
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Use
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Ratio
                </th>
                <th scope="col" className="py-2 font-medium">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {contrastPairs.map((pair) => {
                const ratio = contrastRatio(tokenValue(pair.fg), tokenValue(pair.bg));
                const pass = ratio >= minimumFor[pair.kind];
                return (
                  <tr key={`${pair.fg}-${pair.bg}-${pair.kind}`} className="border-t border-rule">
                    <td className="py-2 pr-4">
                      <span
                        className={cn(
                          "inline-flex h-8 w-14 items-center justify-center rounded-xs font-semibold",
                          pair.kind === "large" ? "text-2xl" : "text-sm",
                        )}
                        style={{ color: tokenValue(pair.fg), backgroundColor: tokenValue(pair.bg) }}
                        aria-hidden="true"
                      >
                        {pair.kind === "non-text" ? (
                          <span className="h-[3px] w-8" style={{ backgroundColor: tokenValue(pair.fg) }} />
                        ) : (
                          "Aa"
                        )}
                      </span>
                    </td>
                    <td className="py-2 pr-4 font-mono text-[0.8125rem]">
                      {pair.fg} / {pair.bg}
                    </td>
                    <td className="text-small py-2 pr-4 text-fg-muted">{pair.note}</td>
                    <td className="py-2 pr-4 font-mono text-[0.8125rem] tabular-nums">{ratio.toFixed(2)}:1</td>
                    <td className="py-2 font-mono text-[0.8125rem]">
                      {pass ? "Pass" : "Fail"} ·{" "}
                      {pair.kind === "text" ? "AA text" : pair.kind === "large" ? "AA large" : "Non-text"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="tones" title="Chapter tones">
        <p className="measure mb-8 text-fg-muted">
          Chapters alternate paper, paper-2, and ink. Primitives read tone-aware aliases (fg, fg-muted, accent, rule,
          field) so they adapt without variants.
        </p>
        <div className="grid gap-4 lg:grid-cols-3">
          {(["paper", "paper-2", "ink"] as const).map((tone) => (
            <div key={tone} data-tone={tone} className="border border-rule-strong p-6">
              <p className="text-mono text-fg-muted">data-tone=&quot;{tone}&quot;</p>
              <p className="text-display-m mt-4">How it works</p>
              <p className="mt-3 text-fg-muted">Secondary text sits in fg-muted.</p>
              <p className="mt-3">
                <a href="#tones" className="text-accent underline">
                  view monthly content packages
                </a>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="sm">Get Started</Button>
                <Button size="sm" variant="secondary">
                  Ask a Question
                </Button>
              </div>
              <div className="mt-6 h-px bg-rule" />
              <div className="mt-6 flex flex-wrap gap-2">
                <TagChip>Hook 0–3s</TagChip>
                <button type="button" className="chip" aria-pressed="true">
                  Videos
                </button>
                <button type="button" className="chip" aria-pressed="false">
                  Infographics
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="type" title="Type scale" tone="paper-2">
        <dl className="grid gap-10">
          <div>
            <dt className="text-mono mb-2 text-fg-muted">display-xl · Fraunces · clamp(2.5rem, 5.2vw, 4.75rem) · H1</dt>
            <dd className="text-display-xl max-w-[18ch]">{hero.title}</dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">display-l · Fraunces · clamp(2rem, 3.6vw, 3.25rem) · H2</dt>
            <dd className="text-display-l max-w-[24ch]">{pricing.title}</dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">
              display-m · Fraunces 350 · clamp(1.625rem, 2.6vw, 2.375rem) · statements
            </dt>
            <dd className="text-display-m max-w-[40ch]">{why.body.split(". ")[0]}.</dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">h3 · Instrument Sans 600</dt>
            <dd className="text-h3">What is included</dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">body-l · Instrument Sans · intros</dt>
            <dd className="text-body-l measure">{hero.body}</dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">body · 1rem / 1.6</dt>
            <dd className="text-body measure">{pricing.intro}</dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">small · 0.875rem</dt>
            <dd className="text-small measure text-fg-muted">
              Panacea Digital Solutions creates informational and promotional content. We are not a healthcare provider
              and do not provide medical advice.
            </dd>
          </div>
          <div>
            <dt className="text-mono mb-2 text-fg-muted">mono · JetBrains Mono 500 · uppercase · +0.08em</dt>
            <dd className="text-mono">CH 09 · 00:09:00 — Pricing</dd>
          </div>
        </dl>
      </Section>

      <Section id="buttons" title="Buttons">
        <SubHead>On paper</SubHead>
        <ButtonMatrix label="Button states on paper" />
        <div data-tone="ink" className="mt-10 p-6 sm:p-8">
          <SubHead>On ink</SubHead>
          <ButtonMatrix label="Button states on ink" />
        </div>
      </Section>

      <Section id="markers" title="Chapter markers & timecodes" tone="paper-2">
        <ul className="grid gap-3">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <ChapterMarker number={chapter.number} label={chapter.label} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Timecode seconds={0} />
          <Timecode seconds={12} />
          <Timecode seconds={15} live />
          <span data-tone="ink" className="rounded-xs px-2 py-1">
            <Timecode seconds={3} live />
          </span>
        </div>
      </Section>

      <Section id="cards" title="Annotated cards">
        <div className="grid gap-6 md:grid-cols-2">
          <AnnotatedCard
            n={1}
            kicker="Principle"
            title="Keep each image focused on one central idea."
            measure="1 idea"
          />
          <AnnotatedCard n={2} kicker="Principle" title="Use readable text and a clear visual hierarchy.">
            <p>Numbered callouts, mono kickers, and measured annotations come from the diagram language.</p>
          </AnnotatedCard>
        </div>
        <div data-tone="ink" className="mt-6 p-6">
          <AnnotatedCard n={3} kicker="Production" title="Scriptwriting and messaging development." />
        </div>
      </Section>

      <Section id="frames" title="Frames" tone="paper-2">
        <div className="grid items-start gap-12 md:grid-cols-3">
          <div>
            <SubHead>Phone frame · 9:16</SubHead>
            <PhoneFrame
              label="Illustrative phone frame with a burned-in caption"
              timecode={<Timecode seconds={4} live />}
              caption="One clear message per frame."
              progress={0.3}
            >
              <div className="absolute inset-0 bg-[linear-gradient(160deg,var(--color-teal)_0%,var(--color-ink-raised)_70%)]" />
            </PhoneFrame>
          </div>
          <div>
            <SubHead>Infographic frame · 4:5</SubHead>
            <InfographicFrame ratio="4:5">
              <div className="grid h-full content-start gap-3 bg-mist p-5">
                <p className="text-mono text-teal">Concept</p>
                <p className="font-display text-xl leading-tight">
                  Questions to ask before choosing a home care provider
                </p>
              </div>
            </InfographicFrame>
          </div>
          <div>
            <SubHead>Infographic frame · 1:1</SubHead>
            <InfographicFrame ratio="1:1">
              <div className="grid h-full place-items-center bg-mist p-5">
                <Callout n={1} active />
              </div>
            </InfographicFrame>
          </div>
        </div>
      </Section>

      <Section id="fields" title="Form fields">
        <FieldSamples prefix="sg-paper" />
        <div data-tone="ink" className="mt-10 p-6 sm:p-8">
          <SubHead>On ink (contact chapter)</SubHead>
          <FieldSamples prefix="sg-ink" />
        </div>
      </Section>

      <Section id="badges" title="Badges, chips & placeholders" tone="paper-2">
        <div className="flex flex-wrap items-center gap-4">
          <ConceptBadge />
          <TagChip>9:16 · MP4</TagChip>
          <TagChip>4:5 · PNG</TagChip>
          <button type="button" className="chip" aria-pressed="false">
            All
          </button>
          <button type="button" className="chip" aria-pressed="true">
            Videos
          </button>
          <button type="button" className="chip" data-preview="hover" aria-pressed="false">
            Infographics (hover)
          </button>
        </div>
        <p className="mt-8 measure">
          Unconfirmed facts render visibly: <VerifyMark>contact email</VerifyMark>. Prelaunch fails while any remain.
        </p>
      </Section>

      <Section id="logo" title="Logo (placeholder)">
        <p className="measure mb-8 text-fg-muted">
          SVG wordmark and a monogram “P” built from a 9:16 frame and a square — video plus infographic. No medical
          symbols. Replaced when a real logo is supplied.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid place-items-center border border-rule-strong p-10">
            <Logo />
          </div>
          <div data-tone="ink" className="grid place-items-center p-10">
            <Logo />
          </div>
          <div className="flex items-end justify-center gap-6 border border-rule-strong p-10">
            <Monogram className="h-16" title="Panacea monogram" />
            <Monogram className="h-8" />
            <Monogram className="h-5" />
            <Wordmark subline={false} className="h-5" />
          </div>
        </div>
      </Section>

      <Section id="layout" title="Layout" tone="paper-2">
        <SubHead>12-column grid · max 1360px · fluid gutter</SubHead>
        <div className="grid-12" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="grid h-24 place-items-center bg-mist font-mono text-xs text-ink">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="relative h-48 border border-rule-strong bg-paper">
            <RegistrationMarks />
            <p className="text-mono absolute bottom-3 left-3 text-fg-muted">Registration marks</p>
          </div>
          <div className="relative h-48 border border-rule-strong bg-paper">
            <LeaderLine from={[15, 75]} elbow={[50, 30]} to={[85, 30]} className="text-teal" />
            <Callout n={2} className="absolute top-[75%] left-[15%] -translate-x-1/2 -translate-y-1/2" />
            <p className="text-mono absolute top-[30%] right-[15%] -translate-y-[130%] text-fg-muted">Leader line</p>
          </div>
        </div>
      </Section>

      <Section id="motion" title="Motion">
        <dl className="mb-10 grid gap-4 sm:grid-cols-4">
          {[
            ["Easing", "cubic-bezier(0.22, 1, 0.36, 1)"],
            ["Short", "180ms"],
            ["Medium", "320ms"],
            ["Long", "600ms · stagger ≤ 60ms"],
          ].map(([k, v]) => (
            <div key={k} className={cn("border border-rule-strong p-4")}>
              <dt className="text-mono text-fg-muted">{k}</dt>
              <dd className="mt-1 font-mono text-[0.8125rem]">{v}</dd>
            </div>
          ))}
        </dl>
        <MotionSamples />
        <p className="text-small measure mt-6 text-fg-muted">
          Under prefers-reduced-motion every sample renders its final state instantly, and anchor jumps scroll without
          smoothing.
        </p>
      </Section>
    </div>
  );
}
