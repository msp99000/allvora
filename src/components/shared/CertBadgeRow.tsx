import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

/**
 * Certification badge row.
 *
 * Section 5.4 forbids displaying an unconfirmed certification. Every entry is
 * currently `confirmed: false`, so in development the row carries a visible
 * "pending confirmation" marker. Set NEXT_PUBLIC_SHOW_UNCONFIRMED_CERTS=false
 * (or confirm the entries in certifications.ts) and unconfirmed items stop
 * rendering entirely.
 */
const SHOW_UNCONFIRMED = process.env.NEXT_PUBLIC_SHOW_UNCONFIRMED_CERTS !== "false";

export function CertBadgeRow({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const shown = certifications.filter((c) => c.confirmed || SHOW_UNCONFIRMED);
  if (shown.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {shown.map((cert) => (
        <li
          key={cert.id}
          className={cn(
            "form-badge",
            onDark && "border-rule-invert text-ivory-50/85",
            !cert.confirmed && "border-dashed"
          )}
          title={cert.confirmed ? cert.name : `${cert.name} (pending confirmation)`}
        >
          {cert.short}
          {!cert.confirmed ? (
            <span aria-hidden className={cn("ml-1.5", onDark ? "text-gold-300" : "text-gold-700")}>
              *
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function certRowHasUnconfirmed(): boolean {
  return certifications.some((c) => !c.confirmed);
}
