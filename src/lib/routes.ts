/**
 * One place that knows every route the site generates.
 *
 * `sitemap.ts`, the internal-link components and `npm run routes` all read from
 * here, so a variety added to products.ts shows up everywhere at once.
 *
 * Launch policy, from PROJECT_BRIEF.md Section 4: P1 varieties get their own
 * page at launch. P2 varieties stay in the product page Specification Ledger as
 * data, and their pages are held back rather than shipped as thin content
 * (Section 7.8 rules out doorway pages). Flip `LAUNCH_P2_VARIETIES` to true when
 * the P2 intros are written and reviewed.
 */

import { blogPosts } from "@/data/blog";
import { categories } from "@/data/categories";
import { markets } from "@/data/markets";
import { products } from "@/data/products";

export const LAUNCH_P2_VARIETIES = false;

export type RouteKind =
  | "home"
  | "company"
  | "conversion"
  | "product-hub"
  | "category"
  | "product"
  | "variety"
  | "market-hub"
  | "market"
  | "blog-hub"
  | "blog-post";

export interface SiteRoute {
  path: string;
  kind: RouteKind;
  priority: "P1" | "P2";
  /** False when the route is planned but deliberately not built at launch. */
  built: boolean;
  /** Sitemap weight, 0 to 1. */
  weight: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}

const staticRoutes: SiteRoute[] = [
  { path: "/", kind: "home", priority: "P1", built: true, weight: 1.0, changeFrequency: "weekly" },
  { path: "/about", kind: "company", priority: "P1", built: true, weight: 0.7, changeFrequency: "monthly" },
  { path: "/about/sourcing-and-traceability", kind: "company", priority: "P1", built: true, weight: 0.7, changeFrequency: "monthly" },
  { path: "/quality-and-certifications", kind: "company", priority: "P1", built: true, weight: 0.8, changeFrequency: "monthly" },
  { path: "/private-label-and-packaging", kind: "company", priority: "P1", built: true, weight: 0.7, changeFrequency: "monthly" },
  { path: "/contact", kind: "conversion", priority: "P1", built: true, weight: 0.8, changeFrequency: "yearly" },
  { path: "/request-a-quote", kind: "conversion", priority: "P1", built: true, weight: 0.9, changeFrequency: "yearly" },
  { path: "/products", kind: "product-hub", priority: "P1", built: true, weight: 0.9, changeFrequency: "monthly" },
  { path: "/markets", kind: "market-hub", priority: "P1", built: true, weight: 0.7, changeFrequency: "monthly" },
  { path: "/blog", kind: "blog-hub", priority: "P1", built: true, weight: 0.6, changeFrequency: "weekly" },
];

export function allRoutes(): SiteRoute[] {
  const routes: SiteRoute[] = [...staticRoutes];

  for (const category of categories) {
    routes.push({
      path: `/products/${category.slug}`,
      kind: "category",
      priority: "P1",
      built: true,
      weight: 0.8,
      changeFrequency: "monthly",
    });
    for (const product of products.filter((p) => p.category === category.slug)) {
      routes.push({
        path: `/products/${category.slug}/${product.slug}`,
        kind: "product",
        priority: "P1",
        built: true,
        weight: 0.8,
        changeFrequency: "monthly",
      });
      for (const variety of product.varieties) {
        const built = variety.priority === "P1" || LAUNCH_P2_VARIETIES;
        routes.push({
          path: `/products/${category.slug}/${product.slug}/${variety.slug}`,
          kind: "variety",
          priority: variety.priority,
          built,
          weight: variety.priority === "P1" ? 0.7 : 0.5,
          changeFrequency: "monthly",
        });
      }
    }
  }

  for (const market of markets) {
    routes.push({
      path: `/markets/${market.slug}`,
      kind: "market",
      priority: market.priority,
      built: true,
      weight: market.priority === "P1" ? 0.7 : 0.5,
      changeFrequency: "monthly",
    });
  }

  for (const post of blogPosts) {
    routes.push({
      path: `/blog/${post.slug}`,
      kind: "blog-post",
      priority: "P1",
      built: true,
      weight: 0.6,
      changeFrequency: "yearly",
    });
  }

  return routes;
}

/** Routes that actually render, which is what belongs in the sitemap. */
export function builtRoutes(): SiteRoute[] {
  return allRoutes().filter((r) => r.built);
}

/** Path for a variety, resolving its category from the product. */
export function varietyPath(
  categorySlug: string,
  productSlug: string,
  varietySlug: string
): string {
  return `/products/${categorySlug}/${productSlug}/${varietySlug}`;
}

export function productPath(categorySlug: string, productSlug: string): string {
  return `/products/${categorySlug}/${productSlug}`;
}

export function categoryPath(categorySlug: string): string {
  return `/products/${categorySlug}`;
}
