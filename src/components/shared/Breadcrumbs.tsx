import Link from "next/link";

import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * The breadcrumb-eyebrow. Section 3.2: SPICES / RED CHILLI / TEJA S17.
 * Doubles as the page's mono eyebrow and emits BreadcrumbList JSON-LD.
 */
export function Breadcrumbs({
  crumbs,
  className,
  onDark = false,
}: {
  crumbs: Crumb[];
  className?: string;
  onDark?: boolean;
}) {
  const trail = crumbs.slice(1);
  const last = trail[trail.length - 1];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <nav aria-label="Breadcrumb" className={cn("eyebrow", onDark && "text-ivory-50/70", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb) => {
            const isLast = crumb === last;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className={onDark ? "text-gold-300" : "text-gold-700"}>
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className={cn(
                        "transition-colors",
                        onDark ? "hover:text-ivory-50" : "hover:text-peacock-600"
                      )}
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden className="opacity-45">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
