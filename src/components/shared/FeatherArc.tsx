/**
 * The peacock feather arc. Section 3.2's recurring motif, an SVG curve derived
 * from the logo's barbs and eye ring. At most twice per page.
 *
 * `divider` is a hairline section rule that resolves into a small arc and eye.
 * `underlay` is the large, faint hero sweep.
 */

import { cn } from "@/lib/utils";

export function FeatherArcDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden>
      <span className="h-px flex-1 bg-rule" />
      <svg width="58" height="18" viewBox="0 0 58 18" fill="none" className="shrink-0">
        <path
          d="M1 17C9 5.5 20 1 29 1c9 0 20 4.5 28 16"
          stroke="var(--color-peacock-600)"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M8 17c6-8 14-11.5 21-11.5S43 9 49 17"
          stroke="var(--color-peacock-600)"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="29" cy="8" r="3.1" stroke="var(--color-gold-500)" strokeWidth="1.2" />
        <circle cx="29" cy="8" r="1" fill="var(--color-cobalt-700)" />
      </svg>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}

export function FeatherArcUnderlay({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 520"
      fill="none"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <g stroke="var(--color-peacock-600)" strokeLinecap="round" fill="none">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <path
            key={i}
            d={`M${20 + i * 12} 512C${60 + i * 26} ${300 - i * 22} ${300 + i * 18} ${
              120 - i * 10
            } ${660 - i * 6} ${86 + i * 30}`}
            strokeWidth={i % 2 === 0 ? 1 : 0.7}
            strokeOpacity={0.3 - i * 0.028}
          />
        ))}
      </g>
      <circle cx="596" cy="150" r="74" stroke="var(--color-gold-500)" strokeOpacity="0.34" strokeWidth="1.2" />
      <circle cx="596" cy="150" r="52" stroke="var(--color-gold-500)" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="596" cy="150" r="19" fill="var(--color-cobalt-700)" fillOpacity="0.1" />
    </svg>
  );
}

/** Inverted arc for use inside a full-bleed peacock band. */
export function FeatherArcOnDark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 260"
      fill="none"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <g stroke="var(--color-gold-300)" strokeLinecap="round" fill="none">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${-40 + i * 16} 258C${120 + i * 24} ${150 - i * 18} ${320 + i * 12} ${
              60 - i * 8
            } ${600 - i * 10} ${20 + i * 26}`}
            strokeWidth="0.9"
            strokeOpacity={0.26 - i * 0.033}
          />
        ))}
      </g>
      <circle cx="470" cy="86" r="52" stroke="var(--color-gold-300)" strokeOpacity="0.22" strokeWidth="1" />
      <circle cx="470" cy="86" r="33" stroke="var(--color-gold-300)" strokeOpacity="0.14" strokeWidth="1" />
    </svg>
  );
}
