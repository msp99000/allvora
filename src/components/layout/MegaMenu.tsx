"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/shared/Container";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

/**
 * Section 6: four columns, one per category, product links beneath, and a
 * "View all" footer link. Variety counts come from the data, so the menu can
 * never disagree with the catalogue.
 */
export function MegaMenu() {
  return (
    <Container className="py-9">
      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const inCategory = products.filter((p) => p.category === category.slug);
          return (
            <div key={category.slug}>
              <NavigationMenuLink asChild>
                <Link
                  href={`/products/${category.slug}`}
                  className="group block border-b border-rule pb-2.5"
                >
                  <span className="font-display text-[1.0625rem] text-peacock-900 transition-colors group-hover:text-peacock-600">
                    {category.name}
                  </span>
                </Link>
              </NavigationMenuLink>
              <ul className="mt-3 space-y-0.5">
                {inCategory.map((product) => (
                  <li key={product.slug}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/products/${category.slug}/${product.slug}`}
                        className="group flex items-baseline justify-between gap-3 py-1.5 text-[0.9375rem] text-ink-600 transition-colors hover:text-peacock-900"
                      >
                        <span className="decoration-gold-500 decoration-1 underline-offset-4 group-hover:underline">
                          {product.name}
                        </span>
                        <span className="eyebrow shrink-0 text-[0.5625rem] tabular-nums opacity-60">
                          {product.varieties.length}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
        <p className="max-w-md text-[0.875rem] text-ink-500">
          Every product can be supplied to buyer-specific specifications with
          supporting documentation.
        </p>
        <NavigationMenuLink asChild>
          <Link
            href="/products"
            className="eyebrow group inline-flex items-center gap-2 text-gold-700"
          >
            View all products
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </NavigationMenuLink>
      </div>
    </Container>
  );
}
