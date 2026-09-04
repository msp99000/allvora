import type * as React from "react";

import { cn } from "@/lib/utils";

/** Mono eyebrow. Section 3.2. Pairs with an editorial left-aligned headline. */
export function Eyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("eyebrow", className)} {...props}>
      {children}
    </p>
  );
}
