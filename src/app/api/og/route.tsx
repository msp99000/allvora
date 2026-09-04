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
            <svg width="46" height="46" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="23" fill="none" stroke={IVORY} strokeWidth="1.8" />
              <ellipse cx="32" cy="32" rx="10" ry="23" fill="none" stroke={IVORY} strokeWidth="1.1" opacity="0.5" />
              <path d="M9.5 25.5h45M9.5 38.5h45" stroke={IVORY} strokeWidth="1.1" opacity="0.5" />
              <path d="M8 56C16 36 28 22 46 14" stroke={GOLD_SOFT} strokeWidth="2" fill="none" />
              <circle cx="44" cy="20" r="8.5" fill={PEACOCK} stroke={GOLD} strokeWidth="2.2" />
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
