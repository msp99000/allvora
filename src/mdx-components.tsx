import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Required by @next/mdx in the App Router. Blog bodies inherit the editorial
 * prose styles from globals.css; internal links go through next/link so posts
 * can link into product and variety pages without a full page load.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      const target = typeof href === "string" ? href : "";
      if (target.startsWith("/")) {
        return (
          <Link href={target} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={target} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    ...components,
  };
}
