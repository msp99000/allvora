import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { builtRoutes } from "@/lib/routes";

/**
 * Generated from the data layer, not maintained by hand. Only routes that
 * actually render are listed: a sitemap entry for a URL that 404s is worse
 * than no entry. Dev routes are excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return builtRoutes()
    .filter((route) => !route.path.startsWith("/dev"))
    .map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.weight,
    }));
}
