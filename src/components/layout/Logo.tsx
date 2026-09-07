import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The Allvora lockup: the supplied feather mark plus the wordmark.
 *
 * The mark is referenced as a file rather than inlined. The artwork is a single
 * 12 KB path mirrored twice, and inlining it would put that in every document
 * twice over (header and footer). As an <img> the browser fetches and caches it
 * once for the whole site.
 *
 * The mark is brand gold on both grounds, so no per-theme variant is needed.
 * `onDark` only affects the wordmark text.
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/allvora-logo.svg"
        alt=""
        aria-hidden
        width={40}
        height={40}
        className={cn(
          "shrink-0 transition-[width,height]",
          compact ? "size-8" : "size-9 sm:size-10"
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            // Set in caps per brand direction. Caps need looser tracking to stay
            // legible, and the display face carries it better at a slightly
            // smaller size.
            "font-display uppercase tracking-[0.08em] transition-all",
            compact ? "text-[0.95rem]" : "text-[1.05rem] sm:text-[1.2rem]",
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
