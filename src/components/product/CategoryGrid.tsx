import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type * as React from "react";

import { Eyebrow } from "@/components/shared/Eyebrow";
import { Media } from "@/components/shared/Media";
import { RuleGrid } from "@/components/shared/RuleGrid";
import { categories } from "@/data/categories";
import { categoryImage } from "@/data/images";
import { products } from "@/data/products";

/** Home and /products/ category grid. Section 5.1. */
export function CategoryGrid() {
  return (
    <RuleGrid cols={2}>
      {categories.map((category) => {
        const count = products.filter((p) => p.category === category.slug).length;
        return (
          <li
            key={category.slug}
            style={
              {
                "--cat": category.accent,
                "--cat-tint": category.accentTint,
              } as React.CSSProperties
            }
          >
            <Link
              href={`/products/${category.slug}`}
              className="group flex h-full flex-col transition-colors hover:bg-[var(--cat-tint)]"
            >
              <div className="relative">
                <Media
                  image={categoryImage(category.slug)}
                  ratio="16 / 9"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
                {/* The line that tells you which product line this is, before
                    you have read anything. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[var(--cat)] transition-transform duration-300 group-hover:scale-y-[2]"
                />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <Eyebrow className="mb-4 tabular-nums text-[color:var(--cat)]">
                  {count} {count === 1 ? "product" : "products"}
                </Eyebrow>
                <h3 className="type-card-lg transition-colors group-hover:text-[color:var(--cat)]">
                  {category.name}
                </h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
                  {category.cardLine}
                </p>
                {/* mt-auto, not mt-6: the card lines are different lengths, so a
                    fixed margin left these links at different heights across the row. */}
                <span className="eyebrow mt-auto inline-flex items-center gap-2 pt-6 text-[color:var(--cat)]">
                  View {category.shortName.toLowerCase()}
                  <ArrowRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </RuleGrid>
  );
}
