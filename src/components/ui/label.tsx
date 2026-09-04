import type * as React from "react";

import { cn } from "@/lib/utils";

/** Field labels use the mono eyebrow register, like a form on an export doc. */
export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "eyebrow mb-1.5 block text-ink-600",
        "[&>span]:text-gold-700",
        className
      )}
      {...props}
    />
  );
}
