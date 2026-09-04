import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Product, Variety } from "@/data/products";

/**
 * Section 6: name, grade badge, top 3 specs, forms badges, arrow link.
 * Hover is a 2px lift plus a gold underline on the name. Nothing else moves.
 */
export function VarietyCard({
  product,
  variety,
  categorySlug,
}: {
  product: Product;
  variety: Variety;
  categorySlug: string;
}) {
  const href = `/products/${categorySlug}/${product.slug}/${variety.slug}`;

  return (
    <article className="lift group relative flex h-full flex-col border border-rule bg-ivory-50 p-6 hover:border-rule-strong">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-[1.25rem] leading-tight">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-200 group-hover:bg-[length:100%_1px] group-hover:text-peacock-600 [background-image:linear-gradient(var(--color-gold-500),var(--color-gold-500))]">
              {variety.name}
            </span>
          </Link>
        </h3>
        <ArrowRight
          aria-hidden
          className="mt-1 size-4 shrink-0 text-ink-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gold-700"
        />
      </div>

      <Badge variant="stamp" className="mb-4 self-start">
        {variety.gradeType}
      </Badge>

      <dl className="mb-5 space-y-1.5 border-t border-rule pt-4">
        <dt className="sr-only">Key buyer specifications</dt>
        {variety.specs.slice(0, 3).map((spec) => (
          <dd key={spec} className="ledger-spec flex gap-2.5 leading-snug">
            <span aria-hidden className="mt-[0.6em] h-px w-2.5 shrink-0 bg-gold-500" />
            <span>{spec}</span>
          </dd>
        ))}
      </dl>

      <ul className="mt-auto flex flex-wrap gap-1.5">
        {variety.forms.map((form) => (
          <li key={form}>
            <Badge variant="form">{form}</Badge>
          </li>
        ))}
      </ul>
    </article>
  );
}
