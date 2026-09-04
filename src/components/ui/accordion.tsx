"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-rule", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-start justify-between gap-6 py-5 text-left font-display text-[1.0625rem] leading-snug text-peacock-900 transition-colors hover:text-peacock-600",
          className
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="mt-1 size-4 shrink-0 text-gold-700 transition-transform duration-200 group-data-[state=open]:rotate-45"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-none"
      {...props}
    >
      <div className={cn("max-w-2xl pb-6 pr-10 text-[0.9375rem] text-ink-600", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
