import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Hairline grid.
 *
 * The usual "gap-px over a coloured background" trick paints the empty cells of
 * a ragged grid, so a 5-item list in 3 columns shows a grey block where the
 * sixth cell would be. Borders on the items themselves avoid that, and keep the
 * hairline register the ledger uses.
 */
const colClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function RuleGrid({
  cols = 3,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & { cols?: 2 | 3 | 4 }) {
  return (
    <ul
      className={cn(
        "grid border-l border-t border-rule",
        colClasses[cols],
        "[&>li]:border-b [&>li]:border-r [&>li]:border-rule [&>li]:bg-ivory-50",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}
