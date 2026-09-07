"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/data/site";

const secondaryLinks = [
  { href: "/", label: "Home" },
  { href: "/markets", label: "Markets" },
  { href: "/quality-and-certifications", label: "Quality & certifications" },
  { href: "/private-label-and-packaging", label: "Private label & packaging" },
  { href: "/about", label: "About" },
  { href: "/about/sourcing-and-traceability", label: "Sourcing & traceability" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/** Section 6: mobile nav is a Sheet with accordion product groups. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-[2px] text-peacock-900 transition-colors hover:bg-ivory-100 lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>

      <SheetContent aria-describedby="mobile-nav-desc">
        <div className="border-b border-rule px-5 py-4">
          <SheetTitle asChild>
            <span>
              <Logo compact />
            </span>
          </SheetTitle>
          <SheetDescription id="mobile-nav-desc" className="sr-only">
            Site navigation
          </SheetDescription>
        </div>

        <nav aria-label="Main" className="flex-1 px-5 py-5">
          <p className="eyebrow mb-3">Products</p>
          <ul className="space-y-0">
            {categories.map((category) => {
              const inCategory = products.filter((p) => p.category === category.slug);
              const expanded = openCategory === category.slug;
              return (
                <li key={category.slug} className="border-b border-rule">
                  <div className="flex items-center justify-between">
                    <SheetClose asChild>
                      <Link
                        href={`/products/${category.slug}`}
                        className="flex-1 py-3 font-display text-[1.0625rem] text-peacock-900"
                      >
                        {category.name}
                      </Link>
                    </SheetClose>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${category.name}`}
                      onClick={() => setOpenCategory(expanded ? null : category.slug)}
                      className="p-2 text-ink-500"
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-200 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {expanded ? (
                    <ul className="pb-3 pl-3">
                      {inCategory.map((product) => (
                        <li key={product.slug}>
                          <SheetClose asChild>
                            <Link
                              href={`/products/${category.slug}/${product.slug}`}
                              className="block py-2 text-[0.9375rem] text-ink-600"
                            >
                              {product.name}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <ul className="mt-6 space-y-0">
            {secondaryLinks.map((link) => (
              <li key={link.href} className="border-b border-rule">
                <SheetClose asChild>
                  <Link href={link.href} className="block py-3 text-[0.9375rem] text-ink-600">
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-rule px-5 py-5">
          <SheetClose asChild>
            <Button asChild variant="gold" size="lg" className="w-full">
              <Link href="/request-a-quote">Request a quote</Link>
            </Button>
          </SheetClose>
          <p className="eyebrow mt-3 text-center">Response {site.responseWindow}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
