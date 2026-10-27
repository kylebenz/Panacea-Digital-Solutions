/*
 * Mirror of the colour tokens in app/globals.css, used by /styleguide/ to
 * display swatches and compute contrast live. Keep the two in sync.
 */
export const colorTokens = [
  { name: "paper", value: "#F5F1E8", use: "Base background" },
  { name: "paper-2", value: "#ECE6D9", use: "Alternate sections" },
  { name: "ink", value: "#111816", use: "Primary text; dark chapters" },
  { name: "ink-2", value: "#4A5552", use: "Secondary text on light" },
  { name: "verdigris", value: "#2D5A4E", use: "Links, focus rings, diagram strokes" },
  { name: "remedy", value: "#E0552D", use: "CTA fills (ink text), playheads, active states" },
  { name: "mist", value: "#D6E2DC", use: "Diagram backgrounds and tints" },
  { name: "paper-dim", value: "#B1B0A9", use: "Secondary text on ink" },
  { name: "verdigris-bright", value: "#7DB8A6", use: "Links, focus, strokes on ink" },
  { name: "ink-raised", value: "#1B2421", use: "Fields and raised surfaces on ink" },
  { name: "line-strong", value: "#7A8480", use: "Input borders, ticks on light" },
  { name: "line-strong-on-ink", value: "#787A75", use: "Input borders on ink" },
] as const;

export type ColorName = (typeof colorTokens)[number]["name"];

export const tokenValue = (name: ColorName) => colorTokens.find((t) => t.name === name)!.value;

/** Text pairs (4.5 normal / 3.0 large) and non-text pairs (3.0). */
export const contrastPairs: Array<{ fg: ColorName; bg: ColorName; kind: "text" | "large" | "non-text"; note: string }> =
  [
    { fg: "ink", bg: "paper", kind: "text", note: "Body text" },
    { fg: "ink", bg: "paper-2", kind: "text", note: "Body text" },
    { fg: "ink", bg: "mist", kind: "text", note: "Diagram labels, chips" },
    { fg: "ink-2", bg: "paper", kind: "text", note: "Secondary text" },
    { fg: "ink-2", bg: "paper-2", kind: "text", note: "Secondary text" },
    { fg: "ink-2", bg: "mist", kind: "text", note: "Diagram notes" },
    { fg: "verdigris", bg: "paper", kind: "text", note: "Links, eyebrows" },
    { fg: "verdigris", bg: "paper-2", kind: "text", note: "Links" },
    { fg: "verdigris", bg: "mist", kind: "text", note: "Diagram strokes / labels" },
    { fg: "paper", bg: "verdigris", kind: "text", note: "Concept Sample badge" },
    { fg: "paper", bg: "ink", kind: "text", note: "Dark chapters" },
    { fg: "paper-2", bg: "ink", kind: "text", note: "Dark chapters" },
    { fg: "mist", bg: "ink", kind: "text", note: "Dark diagram labels" },
    { fg: "paper-dim", bg: "ink", kind: "text", note: "Secondary text on ink" },
    { fg: "paper-dim", bg: "ink-raised", kind: "text", note: "Field hints on ink" },
    { fg: "paper", bg: "ink-raised", kind: "text", note: "Field values on ink" },
    { fg: "verdigris-bright", bg: "ink", kind: "text", note: "Links on ink" },
    { fg: "verdigris-bright", bg: "ink-raised", kind: "text", note: "Links in fields on ink" },
    { fg: "ink", bg: "verdigris-bright", kind: "text", note: "Active chip on ink" },
    { fg: "ink", bg: "remedy", kind: "text", note: "Primary button label" },
    { fg: "remedy", bg: "ink", kind: "text", note: "Mono labels on ink" },
    { fg: "remedy", bg: "paper", kind: "large", note: "Never text on light — large only" },
    { fg: "remedy", bg: "paper", kind: "non-text", note: "Playhead / active state" },
    { fg: "remedy", bg: "paper-2", kind: "non-text", note: "Playhead / active state" },
    { fg: "remedy", bg: "ink", kind: "non-text", note: "Playhead on ink" },
    { fg: "verdigris", bg: "paper", kind: "non-text", note: "Focus ring" },
    { fg: "verdigris", bg: "paper-2", kind: "non-text", note: "Focus ring" },
    { fg: "verdigris", bg: "mist", kind: "non-text", note: "Focus ring" },
    { fg: "verdigris-bright", bg: "ink", kind: "non-text", note: "Focus ring on ink" },
    { fg: "line-strong", bg: "paper", kind: "non-text", note: "Field border" },
    { fg: "line-strong", bg: "paper-2", kind: "non-text", note: "Field border" },
    { fg: "line-strong-on-ink", bg: "ink", kind: "non-text", note: "Field border on ink" },
    { fg: "line-strong-on-ink", bg: "ink-raised", kind: "non-text", note: "Field border on ink" },
  ];

function channel(c: number) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => channel(parseInt(h.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const minimumFor = { text: 4.5, large: 3, "non-text": 3 } as const;
