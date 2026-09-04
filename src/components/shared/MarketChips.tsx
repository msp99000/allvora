import Link from "next/link";

import { markets } from "@/data/markets";
import { cn } from "@/lib/utils";

/** Market links as chips. Used on the home markets strip and in the footer. */
export function MarketChips({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {markets.map((market) => (
        <li key={market.slug}>
          <Link
            href={`/markets/${market.slug}`}
            className={cn(
              "form-badge inline-block transition-colors",
              onDark
                ? "border-rule-invert text-ivory-50/85 hover:border-gold-500 hover:text-gold-300"
                : "hover:border-peacock-600 hover:text-peacock-900"
            )}
          >
            {market.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Plain non-linked chips, for listing buyer types. */
export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item} className="form-badge">
          {item}
        </li>
      ))}
    </ul>
  );
}
