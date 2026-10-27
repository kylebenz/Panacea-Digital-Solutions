/*
 * Mirror of the colour tokens in app/globals.css, used by /styleguide/ to
 * display swatches and compute contrast live. Keep the two in sync.
 */
export const colorTokens = [
  { name: "paper", value: "#F5F2EC", use: "Base background" },
  { name: "paper-2", value: "#EBE7DE", use: "Alternate sections" },
  { name: "ink", value: "#0B1D26", use: "Primary text; dark chapters (logo petrol)" },
  { name: "ink-2", value: "#47565D", use: "Secondary text on light" },
  { name: "teal", value: "#046081", use: "Brand: links, focus rings, primary buttons on light" },
  { name: "teal-deep", value: "#023A52", use: "Primary button hover on light" },
  { name: "teal-mid", value: "#0298B5", use: "Logo gradient stop" },
  { name: "cyan", value: "#01D3DE", use: "Logo gradient stop" },
  { name: "mint", value: "#3DDBBA", use: "Logo gradient stop" },
  { name: "aqua", value: "#5EC8C8", use: "Brand on ink: links, focus, primary buttons" },
  { name: "aqua-soft", value: "#8ADBD0", use: "Primary button hover on ink" },
  { name: "remedy", value: "#E0552D", use: "Signal only: playheads, record dot, active hotspots, errors" },
  { name: "mist", value: "#D9EAEB", use: "Diagram backgrounds and tints" },
  { name: "paper-dim", value: "#A9B6BA", use: "Secondary text on ink" },
  { name: "ink-raised", value: "#132A35", use: "Fields and raised surfaces on ink" },
  { name: "line-strong", value: "#76868C", use: "Input borders, ticks on light" },
  { name: "line-strong-on-ink", value: "#6A7D85", use: "Input borders on ink" },
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
    { fg: "teal", bg: "paper", kind: "text", note: "Links, eyebrows" },
    { fg: "teal", bg: "paper-2", kind: "text", note: "Links" },
    { fg: "teal", bg: "mist", kind: "text", note: "Diagram strokes / labels" },
    { fg: "paper", bg: "teal", kind: "text", note: "Concept Sample badge" },
    { fg: "paper", bg: "ink", kind: "text", note: "Dark chapters" },
    { fg: "paper-2", bg: "ink", kind: "text", note: "Dark chapters" },
    { fg: "mist", bg: "ink", kind: "text", note: "Dark diagram labels" },
    { fg: "paper-dim", bg: "ink", kind: "text", note: "Secondary text on ink" },
    { fg: "paper-dim", bg: "ink-raised", kind: "text", note: "Field hints on ink" },
    { fg: "paper", bg: "ink-raised", kind: "text", note: "Field values on ink" },
    { fg: "aqua", bg: "ink", kind: "text", note: "Links on ink" },
    { fg: "aqua", bg: "ink-raised", kind: "text", note: "Links in fields on ink" },
    { fg: "ink", bg: "aqua", kind: "text", note: "Active chip; primary button on ink" },
    { fg: "paper", bg: "teal", kind: "text", note: "Primary button label" },
    { fg: "paper", bg: "teal-deep", kind: "text", note: "Primary button label, hover" },
    { fg: "ink", bg: "aqua-soft", kind: "text", note: "Primary button label on ink, hover" },
    { fg: "ink", bg: "remedy", kind: "text", note: "Active callout, error badge" },
    { fg: "remedy", bg: "ink", kind: "text", note: "Mono labels on ink" },
    { fg: "remedy", bg: "paper", kind: "large", note: "Never text on light — large only" },
    { fg: "remedy", bg: "paper", kind: "non-text", note: "Playhead / active state" },
    { fg: "remedy", bg: "paper-2", kind: "non-text", note: "Playhead / active state" },
    { fg: "remedy", bg: "ink", kind: "non-text", note: "Playhead on ink" },
    { fg: "teal", bg: "paper", kind: "non-text", note: "Focus ring" },
    { fg: "teal", bg: "paper-2", kind: "non-text", note: "Focus ring" },
    { fg: "teal", bg: "mist", kind: "non-text", note: "Focus ring" },
    { fg: "aqua", bg: "ink", kind: "non-text", note: "Focus ring on ink" },
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
