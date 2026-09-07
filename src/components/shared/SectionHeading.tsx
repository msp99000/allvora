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
            ? "type-title"
            : "type-section"
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <div className="mt-5 max-w-2xl type-lead text-ink-600">
          {intro}
        </div>
      ) : null}
    </div>
  );
}
