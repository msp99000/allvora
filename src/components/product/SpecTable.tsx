import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * THE SPECIFICATION LEDGER. Section 6, the site's signature component.
 *
 * A real semantic table: variety names are row headers, spec values are mono,
 * the grade is a stamped badge, rules are hairlines, and the whole thing closes
 * with a document footer line. It should read as an export document, not as a
 * pricing table.
 *
 * Below 768px it scrolls horizontally inside an edge-faded container rather
 * than squashing four columns (Section 6, explicit).
 */
export function SpecTable({
  product,
  categorySlug,
  caption,
  className,
}: {
  product: Product;
  categorySlug: string;
  /** Visually hidden by default; supply one for screen reader context. */
  caption?: string;
  className?: string;
}) {
  const subjectHeading = product.varieties.some((v) => v.name.includes(product.name))
    ? "Product"
    : "Variety";

  return (
    <div className={cn("w-full", className)}>
      <div className="ledger-scroll">
        <table className="ledger">
          <caption className="sr-only">
            {caption ?? `${product.name} varieties, grades, buyer specifications and available forms`}
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
            {product.varieties.map((variety) => {
              const href = `/products/${categorySlug}/${product.slug}/${variety.slug}`;
              const hasPage = variety.priority === "P1";
              return (
                <tr key={variety.slug}>
                  <th scope="row">
                    {hasPage ? (
                      <Link
                        href={href}
                        className="text-peacock-900 underline decoration-rule-strong underline-offset-4 transition-colors hover:text-peacock-600 hover:decoration-gold-500"
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
                  <td className="ledger-spec min-w-[16rem]">
                    {variety.specs.join(" · ")}
                  </td>
                  <td className="ledger-spec whitespace-nowrap">
                    {variety.forms.join(" / ")}
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

/**
 * A single variety's row expanded into a labelled spec list, for the variety
 * page. Section 5.9.
 */
export function SpecList({
  gradeType,
  specs,
  forms,
  className,
}: {
  gradeType: string;
  specs: string[];
  forms: string[];
  className?: string;
}) {
  const rows: { label: string; value: React.ReactNode; mono?: boolean }[] = [
    { label: "Grade / Type", value: <Badge variant="stamp">{gradeType}</Badge> },
    ...specs.map((spec, index) => ({
      label: index === 0 ? "Key buyer specifications" : "",
      value: spec,
      mono: true,
    })),
    { label: "Available forms", value: forms.join(" / "), mono: true },
    { label: "Origin", value: "India", mono: true },
  ];

  return (
    <div className={cn("w-full", className)}>
      <table className="ledger">
        <caption className="sr-only">Specification summary</caption>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.label}-${index}`}>
              <th scope="row" className="ledger-label">
                {row.label}
              </th>
              <td className={row.mono ? "ledger-spec" : undefined}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="ledger-foot">
        COA available on request · Specifications confirmed before shipment
      </p>
    </div>
  );
}
