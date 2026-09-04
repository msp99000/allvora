import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Wordmark plus the feather-and-globe mark.
 *
 * The mark in public/brand/allvora-mark.svg is a placeholder drawn to the brand
 * direction in Section 3.1. It is listed in CONTENT_REVIEW.md for replacement
 * with the supplied asset. It is inlined here rather than loaded through
 * next/image so it inherits the theme and costs no request.
 */
export function Logo({
  className,
  onDark = false,
  compact = false,
}: {
  className?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden
        className={cn("shrink-0 transition-all", compact ? "size-8" : "size-9 sm:size-10")}
      >
        <circle
          cx="32" cy="32" r="23" fill="none"
          stroke={onDark ? "var(--color-ivory-50)" : "var(--color-peacock-900)"}
          strokeWidth="1.6"
        />
        <ellipse
          cx="32" cy="32" rx="10" ry="23" fill="none"
          stroke={onDark ? "var(--color-ivory-50)" : "var(--color-peacock-900)"}
          strokeWidth="1" opacity="0.45"
        />
        <path
          d="M9.5 25.5h45M9.5 38.5h45"
          stroke={onDark ? "var(--color-ivory-50)" : "var(--color-peacock-900)"}
          strokeWidth="1" opacity="0.45"
        />
        <g stroke="var(--color-peacock-600)" fill="none" strokeLinecap="round">
          <path d="M8 56C16 36 28 22 46 14" strokeWidth="1.8" />
          <path d="M12 57C21 39 32 26 49 19" strokeWidth="1.2" opacity="0.75" />
          <path d="M16 58C25 42 36 30 52 24" strokeWidth="1" opacity="0.5" />
        </g>
        <circle
          cx="44" cy="20" r="8.5"
          fill={onDark ? "var(--color-peacock-900)" : "var(--color-ivory-50)"}
          stroke="var(--color-gold-500)" strokeWidth="2"
        />
        <circle cx="44" cy="20" r="3.4" fill="var(--color-cobalt-700)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display tracking-[0.01em] transition-all",
            compact ? "text-[1.05rem]" : "text-[1.15rem] sm:text-[1.3rem]",
            onDark ? "text-ivory-50" : "text-peacock-900"
          )}
        >
          Allvora
        </span>
        <span
          className={cn(
            "eyebrow mt-0.5 text-[0.5625rem]",
            onDark ? "text-ivory-50/70" : "text-ink-500",
            compact && "hidden sm:block"
          )}
        >
          Resources
        </span>
      </span>
    </Link>
  );
}
