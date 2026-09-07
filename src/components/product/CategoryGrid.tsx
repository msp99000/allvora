import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
          <li key={category.slug}>
            <Link
              href={`/products/${category.slug}`}
              className="group flex h-full flex-col transition-colors hover:bg-ivory-100/70"
            >
              <Media
                image={categoryImage(category.slug)}
                ratio="16 / 9"
                sizes="(min-width: 640px) 50vw, 100vw"
                className="border-b border-rule"
              />
              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <Eyebrow className="mb-4 tabular-nums">
                  {count} {count === 1 ? "product" : "products"}
                </Eyebrow>
                <h3 className="type-card-lg transition-colors group-hover:text-peacock-600">
                  {category.name}
                </h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
                  {category.cardLine}
                </p>
                {/* mt-auto, not mt-6: the card lines are different lengths, so a
                    fixed margin left these links at different heights across the row. */}
                <span className="eyebrow mt-auto inline-flex items-center gap-2 pt-6 text-gold-700">
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
