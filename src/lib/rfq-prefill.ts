/**
 * Resolves the ?category=&product=&variety= params that RfqCta writes into
 * starting values for the RFQ form.
 *
 * Pure and framework-free so the server component can run it and hand the
 * result to the form as props. Reading the params on the client instead forces
 * a Suspense boundary, and swapping its fallback for the real form measured a
 * 0.173 layout shift.
 */

import { categories } from "@/data/categories";
import { products } from "@/data/products";

export interface RfqPrefill {
  category: string;
  product: string;
  variety: string;
}

export const emptyPrefill: RfqPrefill = { category: "", product: "", variety: "" };

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function resolvePrefill(params: {
  category?: string | string[];
  product?: string | string[];
  variety?: string | string[];
}): RfqPrefill {
  const productParam = first(params.product);
  const match = products.find((p) => p.slug === productParam);

  // The product is the more specific signal, so its category wins.
  const category =
    match?.category ??
    categories.find((c) => c.slug === first(params.category))?.slug ??
    "";

  const varietyParam = first(params.variety);
  const variety =
    match && match.varieties.some((v) => v.slug === varietyParam) ? varietyParam : "";

  return { category, product: match?.slug ?? "", variety };
}
