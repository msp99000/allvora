import type * as React from "react";

import { Eyebrow } from "@/components/shared/Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Renders as h2 by default. Pages set h1 explicitly. */
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Section 3.2: headings fade in on scroll. Nothing else does. */
  reveal?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  className,
  reveal = true,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", reveal && "reveal-on-scroll", className)}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Heading
        className={cn(
          Heading === "h1"
            ? "text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3.1rem]"
            : "text-[1.6rem] leading-[1.18] sm:text-[2rem]"
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <div className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-600">
          {intro}
        </div>
      ) : null}
    </div>
  );
}
