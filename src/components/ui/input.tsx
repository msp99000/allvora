import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Form controls follow the ledger register: hairline rule underneath rather
 * than a boxed field, mono-free but squared, with an unmistakable focus state.
 */
const fieldClass =
  "w-full rounded-[2px] border border-rule-strong bg-white/50 px-3 py-2.5 text-[0.9375rem] text-ink-900 placeholder:text-ink-500/70 transition-colors hover:border-peacock-600/50 focus:border-peacock-600 aria-[invalid=true]:border-gold-700 aria-[invalid=true]:bg-gold-100/20 disabled:opacity-50";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldClass, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldClass, "min-h-28 resize-y", className)} {...props} />;
}

export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        fieldClass,
        "h-11 appearance-none bg-[length:14px] bg-[right_0.85rem_center] bg-no-repeat pr-9",
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%235A4A3C%22 stroke-width=%221.4%22><path d=%22M3 6l5 5 5-5%22/></svg>')]",
        className
      )}
      {...props}
    />
  );
}

export { fieldClass };
