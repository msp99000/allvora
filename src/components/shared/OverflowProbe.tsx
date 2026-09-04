"use client";

import { useEffect, useRef } from "react";

/**
 * Development-only probe. Lists every element that extends past the viewport,
 * which is what causes horizontal page scroll.
 *
 * Not imported by any production page. Drop it into a page, load that page
 * through /dev/responsive at the width you care about, and read the report.
 * It writes into its own node rather than into state: the measurement is a
 * read of an external system (layout), so there is nothing for React to own.
 */
export function OverflowProbe() {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const doc = document.documentElement;
    const lines = [`viewport=${doc.clientWidth} scrollWidth=${doc.scrollWidth}`];

    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) continue;
      if (rect.right > doc.clientWidth + 1 || rect.left < -1) {
        lines.push(
          `${el.tagName.toLowerCase()} left=${Math.round(rect.left)} right=${Math.round(
            rect.right
          )} :: ${el.className?.toString().slice(0, 110) ?? ""}`
        );
      }
    }

    node.textContent = lines.join("\n");
  }, []);

  return (
    <pre
      ref={ref}
      id="overflow-probe"
      style={{ fontSize: 10, whiteSpace: "pre-wrap", padding: 8 }}
    />
  );
}
