"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Radix NavigationMenu without a Viewport: the mega-menu panel positions itself
 * against the header, which keeps it full-bleed without a second measured box.
 */
export function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root className={cn("relative flex", className)} {...props}>
      {children}
    </NavigationMenuPrimitive.Root>
  );
}

export const NavigationMenuList = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) => (
  <NavigationMenuPrimitive.List
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
);

export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;

const triggerClass =
  "group inline-flex h-9 items-center gap-1.5 rounded-[2px] px-3 text-sm text-peacock-900 transition-colors hover:text-peacock-600 data-[state=open]:text-peacock-600";

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger className={cn(triggerClass, className)} {...props}>
      {children}
      <ChevronDown
        aria-hidden
        className="size-3.5 text-ink-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { triggerClass as navigationTriggerClass };
