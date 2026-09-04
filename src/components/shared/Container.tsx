import type * as React from "react";

import { cn } from "@/lib/utils";

/** The 12-column field. Everything on the site sits inside this measure. */
export function Container({
  className,
  as: Comp = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Comp
      className={cn("mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}
