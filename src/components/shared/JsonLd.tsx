/**
 * Emits a JSON-LD block. Server component, no client JS.
 *
 * Values come from the typed data layer, never from user input, so the only
 * escaping needed is the "</script>" guard.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
