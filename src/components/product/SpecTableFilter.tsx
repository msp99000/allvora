"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/shared/Eyebrow";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * The Specification Ledger with a form filter.
 *
 * A buyer who needs powder should not have to read seven rows to find which
 * varieties offer it. The filter is the one piece of interaction the ledger
 * earns: it answers a question buyers actually arrive with.
 *
 * The server renders every row; this only hides them, so the full table is in
 * the HTML for crawlers and for anyone without JavaScript.
 */
export function SpecTableFilter({
  product,
  categorySlug,
}: {
  product: Product;
  categorySlug: string;
}) {
  const forms = useMemo(
    () => [...new Set(product.varieties.flatMap((v) => v.forms))],
    [product]
  );
  const [active, setActive] = useState<string | null>(null);

  const rows = active
    ? product.varieties.filter((v) => v.forms.includes(active))
    : product.varieties;

  const subjectHeading = product.varieties.some((v) => v.name.includes(product.name))
    ? "Product"
    : "Variety";

  return (
    <div className="w-full">
      {forms.length > 1 ? (
        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-rule pb-5">
          <Eyebrow className="shrink-0">Filter by form</Eyebrow>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="All"
              count={product.varieties.length}
              pressed={active === null}
              onClick={() => setActive(null)}
            />
            {forms.map((form) => (
              <FilterChip
                key={form}
                label={form}
                count={product.varieties.filter((v) => v.forms.includes(form)).length}
                pressed={active === form}
                onClick={() => setActive(active === form ? null : form)}
              />
            ))}
          </div>
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {active
          ? `${rows.length} of ${product.varieties.length} varieties available as ${active}`
          : `Showing all ${product.varieties.length} varieties`}
      </p>

      <div className="ledger-scroll">
        <table className="ledger">
          <caption className="sr-only">
            {product.name} varieties, grades, buyer specifications and available forms
          </caption>
          <thead>
            <tr>
              <th scope="col" className="md:sticky md:top-[4.25rem] md:z-10 pl-0">
                {subjectHeading}
              </th>
              <th scope="col" className="md:sticky md:top-[4.25rem] md:z-10">
                Grade / Type
              </th>
              <th scope="col" className="md:sticky md:top-[4.25rem] md:z-10">
                Key buyer specifications
              </th>
              <th scope="col" className="md:sticky md:top-[4.25rem] md:z-10">
                Available forms
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((variety) => {
              const href = `/products/${categorySlug}/${product.slug}/${variety.slug}`;
              const hasPage = variety.priority === "P1";
              return (
                <tr key={variety.slug}>
                  <th scope="row">
                    {hasPage ? (
                      <Link
                        href={href}
                        className="text-peacock-900 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-[color:var(--cat,var(--color-peacock-600))] hover:decoration-[color:var(--cat,var(--color-gold-500))]"
                      >
                        {variety.name}
                      </Link>
                    ) : (
                      variety.name
                    )}
                  </th>
                  <td>
                    <Badge variant="stamp">{variety.gradeType}</Badge>
                  </td>
                  <td className="ledger-spec min-w-[16rem]">{variety.specs.join(" · ")}</td>
                  <td className="ledger-spec whitespace-nowrap">
                    {variety.forms.map((form, i) => (
                      <span key={form}>
                        {i > 0 ? <span className="opacity-40"> / </span> : null}
                        <span
                          className={cn(
                            active === form && "font-semibold text-[color:var(--cat,var(--color-peacock-600))]"
                          )}
                        >
                          {form}
                        </span>
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="ledger-foot">
        COA available on request · Specifications confirmed before shipment
      </p>
    </div>
  );
}

function FilterChip({
  label,
  count,
  pressed,
  onClick,
}: {
  label: string;
  count: number;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "form-badge cursor-pointer gap-1.5 transition-colors",
        pressed
          ? "border-[color:var(--cat,var(--color-peacock-600))] bg-[color:var(--cat-tint,var(--color-ivory-100))] text-[color:var(--cat,var(--color-peacock-900))]"
          : "hover:border-[color:var(--cat,var(--color-peacock-600))]"
      )}
    >
      {label}
      <span className="tabular-nums opacity-55">{count}</span>
    </button>
  );
}
