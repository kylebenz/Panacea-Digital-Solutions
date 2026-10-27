import { useId } from "react";
import type { StoryArtKind } from "@/content/hero-stage";

/*
 * Flat storyboard illustrations drawn in SVG (no stock imagery, no people).
 * 90 × 160 viewBox = one 9:16 frame. Elements with `story-build` animate in
 * when the frame mounts (static under reduced motion).
 */

const backgrounds: Record<StoryArtKind, [string, string]> = {
  house: ["#132a35", "#0f4256"],
  talk: ["#132a35", "#123747"],
  path: ["#0f2430", "#046081"],
  message: ["#132a35", "#132a35"],
  calendar: ["#132a35", "#0f4256"],
  app: ["#0f2430", "#123747"],
  question: ["#132a35", "#046081"],
};

const stroke = "var(--color-aqua)";
const mist = "var(--color-mist)";
const paper = "var(--color-paper)";
const remedy = "var(--color-remedy)";
const dim = "var(--color-paper-dim)";

function Lines({
  x,
  y,
  widths,
  color,
  gap = 5,
}: {
  x: number;
  y: number;
  widths: number[];
  color: string;
  gap?: number;
}) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={2} rx={1} fill={color} />
      ))}
    </>
  );
}

function House() {
  return (
    <>
      <circle cx="68" cy="30" r="6" fill={dim} opacity="0.55" />
      <path d="M0 118h90" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <path d="M18 72 45 48l27 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="22" y="70" width="46" height="48" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="40" y="96" width="10" height="22" fill="none" stroke={stroke} strokeWidth="1.25" />
      <rect
        className="story-build"
        style={{ animationDelay: "500ms" }}
        x="27"
        y="80"
        width="9"
        height="9"
        fill={remedy}
      />
      <rect x="54" y="80" width="9" height="9" fill="none" stroke={stroke} strokeWidth="1.25" />
      <path d="M45 118v24" stroke={stroke} strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
    </>
  );
}

function Talk() {
  return (
    <>
      <g className="story-build">
        <rect x="10" y="44" width="52" height="28" rx="6" fill={mist} />
        <path d="M20 72v8l8-8z" fill={mist} />
        <Lines x={17} y={52} widths={[36, 28, 20]} color="#47565d" />
      </g>
      <g className="story-build" style={{ animationDelay: "900ms" }}>
        <rect x="28" y="88" width="52" height="26" rx="6" fill={stroke} />
        <path d="M70 114v8l-8-8z" fill={stroke} />
        <Lines x={35} y={96} widths={[34, 24]} color="#0b1d26" />
      </g>
    </>
  );
}

function PathArt() {
  const nodes: Array<[number, number]> = [
    [22, 122],
    [56, 88],
    [30, 50],
  ];
  return (
    <>
      <path
        className="anim-draw"
        style={{ ["--path-length" as string]: 1 }}
        pathLength={1}
        d="M22 122C60 116 70 98 56 88S16 66 30 50"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="1"
      />
      {nodes.map(([x, y], i) => (
        <g key={i} className="story-build" style={{ animationDelay: `${300 + i * 500}ms` }}>
          <circle
            cx={x}
            cy={y}
            r="8"
            fill={i === 2 ? remedy : "#0b1d26"}
            stroke={i === 2 ? remedy : stroke}
            strokeWidth="1.25"
          />
          <text
            x={x}
            y={y + 2.6}
            textAnchor="middle"
            fill={i === 2 ? "#0b1d26" : paper}
            style={{ fontFamily: "var(--font-mono)", fontSize: "7.5px", fontWeight: 600 }}
          >
            {i + 1}
          </text>
        </g>
      ))}
    </>
  );
}

function Message() {
  return (
    <>
      <g className="story-build">
        <rect x="12" y="50" width="66" height="16" rx="2" fill={paper} />
        <rect x="16" y="54" width="8" height="8" fill="#046081" />
        <text
          x="28"
          y="60.2"
          textLength="46"
          lengthAdjust="spacingAndGlyphs"
          fill="#0b1d26"
          style={{ fontFamily: "var(--font-mono)", fontSize: "4.6px", fontWeight: 600 }}
        >
          SAMPLE HOME CARE
        </text>
      </g>
      <g className="story-build" style={{ animationDelay: "400ms" }}>
        <rect x="12" y="76" width="66" height="26" rx="5" fill="none" stroke={stroke} strokeWidth="1.25" />
        <Lines x={18} y={83} widths={[46, 32]} color={dim} gap={6} />
      </g>
      <g className="story-build" style={{ animationDelay: "800ms" }}>
        <circle cx="68" cy="116" r="7" fill={remedy} />
        <path d="M64.5 116h6m-2.5-3 3 3-3 3" fill="none" stroke="#0b1d26" strokeWidth="1.3" />
      </g>
    </>
  );
}

function Calendar() {
  return (
    <>
      <rect x="15" y="44" width="60" height="64" rx="3" fill="none" stroke={stroke} strokeWidth="1.25" />
      <rect x="15" y="44" width="60" height="12" rx="3" fill={stroke} opacity="0.35" />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 20 + (i % 4) * 13.5;
        const y = 62 + Math.floor(i / 4) * 14;
        const hot = i === 6;
        return (
          <rect
            key={i}
            className={hot ? "story-build" : undefined}
            style={hot ? { animationDelay: "500ms" } : undefined}
            x={x}
            y={y}
            width="10"
            height="10"
            rx="1"
            fill={hot ? remedy : "none"}
            stroke={hot ? remedy : stroke}
            strokeWidth="1"
            opacity={hot ? 1 : 0.7}
          />
        );
      })}
    </>
  );
}

function App() {
  return (
    <>
      <rect x="22" y="36" width="46" height="84" rx="6" fill="none" stroke={stroke} strokeWidth="1.25" />
      {[0, 1, 2].map((i) => (
        <g key={i} className="story-build" style={{ animationDelay: `${200 + i * 300}ms` }}>
          <rect
            x="28"
            y={50 + i * 20}
            width="34"
            height="14"
            rx="2"
            fill={i === 1 ? mist : "none"}
            stroke={i === 1 ? mist : stroke}
            strokeWidth="1"
          />
          <rect x="31" y={55 + i * 20} width="8" height="4" rx="1" fill={i === 1 ? remedy : dim} />
          <rect x="42" y={55 + i * 20} width="16" height="2" rx="1" fill={i === 1 ? "#47565d" : dim} />
        </g>
      ))}
    </>
  );
}

function Question() {
  return (
    <>
      <rect x="16" y="46" width="58" height="56" rx="8" fill="none" stroke={stroke} strokeWidth="1.25" />
      <path d="M30 102v10l10-10z" fill="none" stroke={stroke} strokeWidth="1.25" strokeLinejoin="round" />
      <text
        className="story-build"
        x="45"
        y="89"
        textAnchor="middle"
        fill={mist}
        style={{ fontFamily: "var(--font-display)", fontSize: "44px" }}
      >
        ?
      </text>
    </>
  );
}

const art: Record<StoryArtKind, () => React.ReactElement> = {
  house: House,
  talk: Talk,
  path: PathArt,
  message: Message,
  calendar: Calendar,
  app: App,
  question: Question,
};

export function StoryArt({ kind, push = false }: { kind: StoryArtKind; push?: boolean }) {
  const Art = art[kind];
  const [from, to] = backgrounds[kind];
  const gradientId = `story-bg-${useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 90 160"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="90" height="160" fill={`url(#${gradientId})`} />
      <g className={push ? "story-push" : undefined}>
        <Art />
      </g>
    </svg>
  );
}
