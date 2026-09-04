import { Container } from "@/components/shared/Container";
import { certifications, trustBarItems } from "@/data/certifications";
import { cn } from "@/lib/utils";

/**
 * Section 4: slim strip, mono type, dot-separated, not dismissible. Rendered
 * above the header and reprised as a pre-footer band.
 *
 * Items come from certifications.ts. Where a registration is not yet confirmed
 * by Allvora it carries an asterisk and the strip explains it, so nothing on
 * the page claims a certification that has not been verified (Section 5.4).
 */
export function TrustBar({
  className,
  variant = "top",
}: {
  className?: string;
  variant?: "top" | "prefooter";
}) {
  const hasUnconfirmed = certifications.some((c) => !c.confirmed);
  const onDark = variant === "prefooter";

  return (
    <div
      className={cn(
        onDark
          ? "on-peacock border-y border-rule-invert bg-peacock-800 text-ivory-50/80"
          : "border-b border-rule bg-ivory-100 text-ink-600",
        className
      )}
    >
      <Container className={onDark ? "py-4" : "py-2"}>
        <ul
          className={cn(
            "flex flex-wrap items-center gap-x-3 gap-y-1",
            onDark ? "justify-center sm:gap-x-5" : "justify-center sm:justify-start"
          )}
        >
          {trustBarItems.map((item, index) => (
            <li key={item} className="flex items-center gap-x-3">
              {index > 0 ? (
                <span aria-hidden className="opacity-40">
                  ·
                </span>
              ) : null}
              <span className="eyebrow text-[0.625rem] text-current">{item}</span>
            </li>
          ))}
        </ul>
        {hasUnconfirmed ? (
          <p
            className={cn(
              "eyebrow mt-2 text-center text-[0.5625rem]",
              onDark ? "text-ivory-50/75" : "text-ink-600"
            )}
          >
            * Registrations pending confirmation before launch
          </p>
        ) : null}
      </Container>
    </div>
  );
}
