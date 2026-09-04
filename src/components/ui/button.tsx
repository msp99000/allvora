import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * shadcn Button, restyled to the Allvora tokens.
 *
 * Section 3.2 allows one gold use per screen. `gold` is the RFQ conversion
 * button and nothing else. Corners stay near-square: this site is a document,
 * not an app shell.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-peacock-900 text-ivory-50 hover:bg-peacock-700 active:bg-peacock-800",
        gold: "bg-gold-500 text-ink-900 hover:bg-gold-300 active:bg-gold-500",
        outline:
          "border border-rule-strong bg-transparent text-peacock-900 hover:border-peacock-600 hover:bg-ivory-100",
        ghost: "text-peacock-900 hover:bg-ivory-100",
        onDark:
          "border border-rule-invert bg-transparent text-ivory-50 hover:border-gold-500 hover:text-gold-300",
        link: "text-peacock-600 underline underline-offset-4 decoration-peacock-600/40 hover:decoration-gold-500 h-auto p-0",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.8125rem]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-[0.9375rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
