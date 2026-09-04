/**
 * Branded Open Graph card. Section 7.1.
 *
 * Rendered per page from the title and mono eyebrow that lib/seo.ts already
 * builds, so every route gets its own card without a hand-made image. Drawn in
 * the site palette with the feather arc and the ledger hairline, using the
 * runtime's default font: next/og cannot use next/font output, and fetching a
 * font file at request time would add a failure mode for a decorative asset.
 * Swapping in the display serif is noted in CONTENT_REVIEW.md.
 */

import { ImageResponse } from "next/og";

import {
  FEATHER_GOLD,
  FEATHER_MIRROR,
  FEATHER_PATH,
  FEATHER_TRANSFORM,
} from "@/lib/brand-mark";

export const runtime = "nodejs";

const PEACOCK = "#0E3B36";
const IVORY = "#FAF7F0";
const GOLD = "#C98A2B";
const GOLD_SOFT = "#E3B25E";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? "Allvora Resources").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") ?? "EXPORT & SOURCING · INDIA").slice(0, 60);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PEACOCK,
          color: IVORY,
          padding: "68px 72px",
          position: "relative",
        }}
      >
        {/* Feather arc sweep and eye ring. */}
        <svg
          width="620"
          height="630"
          viewBox="0 0 620 630"
          style={{ position: "absolute", right: -60, top: -40, opacity: 0.5 }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${-40 + i * 18} 620C${140 + i * 26} ${420 - i * 30} ${340 + i * 14} ${
                180 - i * 16
              } ${620 - i * 8} ${60 + i * 34}`}
              stroke={GOLD_SOFT}
              strokeWidth="1.4"
              fill="none"
              strokeOpacity={0.55 - i * 0.07}
            />
          ))}
          <circle cx="452" cy="176" r="96" stroke={GOLD} strokeWidth="2" fill="none" opacity="0.5" />
          <circle cx="452" cy="176" r="64" stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.3" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 3.4,
              textTransform: "uppercase",
              color: GOLD_SOFT,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
          <div style={{ fontSize: title.length > 62 ? 60 : 74, lineHeight: 1.1 }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${GOLD}`,
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* The real feather mark. Satori cannot follow a <use> into <defs>,
                so the mirrored half is emitted as its own path. */}
            <svg width="52" height="52" viewBox="0 0 512 512" fill={FEATHER_GOLD}>
              <g transform={FEATHER_TRANSFORM}>
                <path d={FEATHER_PATH} />
              </g>
              <g transform={`${FEATHER_MIRROR} ${FEATHER_TRANSFORM}`}>
                <path d={FEATHER_PATH} />
              </g>
            </svg>
            <div style={{ fontSize: 30 }}>Allvora Resources</div>
          </div>
          <div style={{ fontSize: 19, letterSpacing: 2.4, textTransform: "uppercase", opacity: 0.7 }}>
            Indian Products · Global Reach
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
