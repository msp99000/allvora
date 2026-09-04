import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Eyebrow } from "@/components/shared/Eyebrow";
import { RuleGrid } from "@/components/shared/RuleGrid";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

/** Home and /products/ category grid. Section 5.1. */
export function CategoryGrid() {
  return (
    <RuleGrid cols={2}>
      {categories.map((category, index) => {
        const count = products.filter((p) => p.category === category.slug).length;
        return (
          <li key={category.slug}>
            <Link
              href={`/products/${category.slug}`}
              className="group flex h-full flex-col p-7 transition-colors hover:bg-ivory-100/70 sm:p-9"
            >
              <Eyebrow className="mb-4 tabular-nums">
                {String(index + 1).padStart(2, "0")} · {count}{" "}
                {count === 1 ? "product" : "products"}
              </Eyebrow>
              <h3 className="text-[1.4rem] leading-tight transition-colors group-hover:text-peacock-600">
                {category.name}
              </h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
                {category.cardLine}
              </p>
              <span className="eyebrow mt-6 inline-flex items-center gap-2 text-gold-700">
                View {category.shortName.toLowerCase()}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </RuleGrid>
  );
}
