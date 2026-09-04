import { defaultBuyerSpecNote } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * The Section 5.4 standing paragraph, reused on every product and variety page.
 * Styled as a marginal note on the ledger rather than as a marketing callout.
 */
export function BuyerSpecNote({
  note,
  className,
}: {
  note?: string;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "border-l-2 border-gold-500 bg-ivory-100/60 py-5 pl-5 pr-6 sm:pl-7",
        className
      )}
    >
      <p className="eyebrow mb-2 text-gold-700">Buyer-specific specifications available</p>
      <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-600">
        {note ?? defaultBuyerSpecNote}
      </p>
    </aside>
  );
}
