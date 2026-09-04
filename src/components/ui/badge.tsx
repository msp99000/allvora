import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Badge. `stamp` is the grade stamp used inside the Specification Ledger,
 * `form` is the quieter available-forms chip. Both are defined in globals.css
 * so the ledger keeps its look wherever it is used.
 */
const badgeVariants = cva("", {
  variants: {
    variant: {
      stamp: "stamp",
      stampPeacock: "stamp stamp-peacock",
      form: "form-badge",
    },
  },
  defaultVariants: { variant: "stamp" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
