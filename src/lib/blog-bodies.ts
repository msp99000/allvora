/**
 * Post bodies, mapped explicitly rather than by template-literal import, so a
 * missing MDX file is a type error at build time rather than a runtime 404.
 */

import type { ComponentType } from "react";

type MdxModule = { default: ComponentType };

export const blogBodies: Record<string, () => Promise<MdxModule>> = {
  "1121-vs-1509-basmati": () => import("@/content/blog/1121-vs-1509-basmati.mdx"),
  "black-pepper-grades-explained": () =>
    import("@/content/blog/black-pepper-grades-explained.mdx"),
  "how-to-verify-an-indian-exporter": () =>
    import("@/content/blog/how-to-verify-an-indian-exporter.mdx"),
};
