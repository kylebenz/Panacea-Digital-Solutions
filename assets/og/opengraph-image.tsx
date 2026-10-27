import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero } from "@/content/hero";
import { site } from "@/lib/site";

/* Branded share image: paper and ink with the timecode motif (brief §9). */
export const alt = `${site.name}: ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#F5F2EC";
const ink = "#0B1D26";
const inkRaised = "#132A35";
const aqua = "#5EC8C8";
const remedy = "#E0552D";
const ink2 = "#47565D";
// The logo gradient, used as a hairline only.
const gradient = "linear-gradient(90deg, #046081 0%, #0298B5 38%, #01D3DE 72%, #3DDBBA 100%)";

export default async function Image() {
  const [fraunces, mono, mark] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Fraunces-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Medium.ttf")),
    readFile(join(process.cwd(), "assets/brand/panacea-mark.png")),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{ display: "flex", width: "100%", height: "100%", background: paper, padding: 64, position: "relative" }}
    >
      <div
        style={{ display: "flex", position: "absolute", left: 0, right: 0, bottom: 0, height: 6, background: gradient }}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20, letterSpacing: 2, color: ink2 }}>
          CH 00 · 00:00:00 — OPENING
        </div>
        <div
          style={{ display: "flex", fontFamily: "Fraunces", fontSize: 68, lineHeight: 1.05, color: ink, marginTop: 36 }}
        >
          {hero.title}
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders <img> */}
          <img src={markSrc} width={49} height={60} alt="" />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 6 }}>
            <div style={{ fontFamily: "Fraunces", fontSize: 30, letterSpacing: 3, color: ink }}>PANACEA</div>
            <div style={{ fontFamily: "Mono", fontSize: 13, letterSpacing: 4, color: "#046081" }}>
              DIGITAL SOLUTIONS
            </div>
          </div>
          <div style={{ display: "flex", marginLeft: 40, fontFamily: "Fraunces", fontSize: 26, color: ink2 }}>
            {site.tagline}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 282,
          height: 502,
          background: ink,
          borderRadius: 36,
          padding: 12,
          alignSelf: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            background: inkRaised,
            borderRadius: 26,
            padding: 20,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Mono", fontSize: 20, color: paper }}
          >
            <div style={{ display: "flex", width: 9, height: 9, borderRadius: 9, background: remedy }} />
            00:00:15
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[0.9, 0.7, 0.8].map((w, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  height: 10,
                  width: `${w * 100}%`,
                  background: aqua,
                  opacity: 0.85 - i * 0.2,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", position: "relative", height: 4, background: "rgba(245,242,236,0.25)" }}>
            <div style={{ display: "flex", width: "100%", height: 4, background: "rgba(245,242,236,0.7)" }} />
            <div
              style={{
                display: "flex",
                position: "absolute",
                right: -2,
                top: -7,
                width: 4,
                height: 18,
                background: remedy,
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 400 },
        { name: "Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
