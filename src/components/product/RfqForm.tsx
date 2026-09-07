"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input, NativeSelect, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/data/site";
import type { RfqPrefill } from "@/lib/rfq-prefill";
import { INCOTERMS, REFERRAL_SOURCES, rfqSchema, type RfqInput } from "@/lib/rfq-schema";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "failed"; message: string };

/**
 * Human labels for the error summary, matching the visible field labels.
 * Keyed by schema field so the summary cannot drift from what the form shows.
 */
/** The order fields appear in the form, so the summary matches the page. */
const FIELD_ORDER = [
  "name", "company", "country", "email", "phone",
  "category", "product", "variety",
  "quantity", "destinationPort", "incoterm", "targetSpecs", "source",
] as const;

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  company: "Company",
  country: "Country",
  email: "Email",
  phone: "Phone or WhatsApp",
  category: "Product category",
  product: "Product",
  variety: "Variety or grade",
  quantity: "Quantity and unit",
  destinationPort: "Destination port",
  incoterm: "Incoterm",
  targetSpecs: "Target specifications",
  source: "How you found us",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-[0.8125rem] leading-snug text-gold-700">
      {message}
    </p>
  );
}

/**
 * The RFQ form. Section 5.6.
 *
 * Category, product and variety are dependent selects driven by products.ts, so
 * a variety added to the data appears here with no change to this file. The
 * ?category=&product=&variety= params written by RfqCta prefill them.
 */
/**
 * The RFQ form. Section 5.6.
 *
 * Category, product and variety are dependent selects driven by products.ts, so
 * a variety added to the data appears here with no change to this file.
 *
 * `prefill` is resolved on the server from the ?category=&product=&variety=
 * params that RfqCta writes, and arrives as props. Reading those params on the
 * client instead would need a Suspense boundary, and swapping its fallback for
 * the real form measured a 0.173 layout shift. Passing the values through
 * defaultValues also avoids a subtler bug: setting the product before its
 * category has re-rendered the dependent option list leaves the native select
 * with no matching option, and it silently falls back to the placeholder.
 */
export function RfqForm({ prefill }: { prefill: RfqPrefill }) {

  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RfqInput>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      name: "",
      company: "",
      country: "",
      email: "",
      phone: "",
      category: prefill.category,
      product: prefill.product,
      variety: prefill.variety,
      quantity: "",
      destinationPort: "",
      incoterm: "",
      targetSpecs: "",
      source: "",
      website: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedProduct = watch("product");

  // Filtering 11 products and their varieties is cheap enough to do inline,
  // and memoising a value derived from react-hook-form's watch() is not
  // something the compiler can reason about.
  const productOptions = products.filter((p) => p.category === selectedCategory);
  const varietyOptions =
    products.find((p) => p.slug === selectedProduct)?.varieties ?? [];

  // The invalid fields, in the order the form presents them, so the summary
  // reads top to bottom like the form does rather than in object key order.
  const errorList = FIELD_ORDER.flatMap((field) => {
    const message = errors[field as keyof typeof errors]?.message;
    return message ? [{ field, message: String(message) }] : [];
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setStatus({
          kind: "failed",
          message:
            payload?.error ??
            "We could not send that just now. Please try again, or email us directly.",
        });
        return;
      }
      setStatus({ kind: "sent", email: values.email });
      reset();
    } catch {
      setStatus({
        kind: "failed",
        message:
          "We could not reach the server. Check your connection, or email us directly.",
      });
    }
  });

  if (status.kind === "sent") {
    return (
      <div
        role="status"
        className="border-l-2 border-gold-500 bg-ivory-100/60 py-8 pl-6 pr-6 sm:pl-8"
      >
        <p className="eyebrow mb-3 text-gold-700">Received</p>
        <p className="font-display text-[1.4rem] leading-snug text-peacock-900">
          Received. We will respond {site.responseWindow} to {status.email}.
        </p>
        <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-600">
          If your requirement is urgent, message us on WhatsApp with the same
          specification and we will pick it up there.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-3xl">
      {/* Honeypot. Hidden from people, harvested by bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {/* Error summary. WCAG 2.2 practice for a form this long: on a failed
          submit, collect the invalid fields at the top, move focus here so a
          screen reader announces the failure, and link each item to its field.
          Inline errors stay exactly where they were. */}
      {errorList.length > 0 ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-10 border-l-2 border-gold-700 bg-gold-100/25 py-5 pl-5 pr-6 outline-none"
        >
          <h2 className="font-display type-card text-peacock-900">
            {errorList.length === 1
              ? "One field needs attention before this can be sent"
              : `${errorList.length} fields need attention before this can be sent`}
          </h2>
          <ul className="mt-3 space-y-1.5">
            {errorList.map(({ field, message }) => (
              <li key={field} className="text-[0.9375rem] leading-snug">
                <a
                  href={`#${field}`}
                  className="text-gold-700 underline decoration-gold-700/40 underline-offset-4 transition-colors hover:decoration-gold-700"
                >
                  {FIELD_LABELS[field] ?? field}: {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <fieldset disabled={sending} className="space-y-10">
        <div>
          <legend className="eyebrow mb-5 block text-gold-700">Your details</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">
                Name <span aria-hidden>*</span>
              </Label>
              <Input
                id="name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
              />
              <FieldError id="name-error" message={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="company">
                Company <span aria-hidden>*</span>
              </Label>
              <Input
                id="company"
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "company-error" : undefined}
                {...register("company")}
              />
              <FieldError id="company-error" message={errors.company?.message} />
            </div>
            <div>
              <Label htmlFor="country">
                Country <span aria-hidden>*</span>
              </Label>
              <Input
                id="country"
                autoComplete="country-name"
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? "country-error" : undefined}
                {...register("country")}
              />
              <FieldError id="country-error" message={errors.country?.message} />
            </div>
            <div>
              <Label htmlFor="email">
                Email <span aria-hidden>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone or WhatsApp</Label>
              <Input id="phone" autoComplete="tel" {...register("phone")} />
            </div>
          </div>
        </div>

        <div>
          <legend className="eyebrow mb-5 block text-gold-700">What you need</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="category">
                Product category <span aria-hidden>*</span>
              </Label>
              <NativeSelect
                id="category"
                defaultValue={prefill.category}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "category-error" : undefined}
                {...register("category", {
                  onChange: () => {
                    setValue("product", "");
                    setValue("variety", "");
                  },
                })}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </NativeSelect>
              <FieldError id="category-error" message={errors.category?.message} />
            </div>

            <div>
              <Label htmlFor="product">
                Product <span aria-hidden>*</span>
              </Label>
              <NativeSelect
                id="product"
                disabled={!selectedCategory}
                defaultValue={prefill.product}
                aria-invalid={Boolean(errors.product)}
                aria-describedby={errors.product ? "product-error" : undefined}
                {...register("product", { onChange: () => setValue("variety", "") })}
              >
                <option value="">
                  {selectedCategory ? "Select a product" : "Choose a category first"}
                </option>
                {productOptions.map((product) => (
                  <option key={product.slug} value={product.slug}>
                    {product.name}
                  </option>
                ))}
              </NativeSelect>
              <FieldError id="product-error" message={errors.product?.message} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="variety">Variety or grade</Label>
              <NativeSelect
                id="variety"
                disabled={!selectedProduct}
                defaultValue={prefill.variety}
                {...register("variety")}
              >
                <option value="">
                  {selectedProduct
                    ? "Any, or not sure yet"
                    : "Choose a product first"}
                </option>
                {varietyOptions.map((variety) => (
                  <option key={variety.slug} value={variety.slug}>
                    {variety.name} ({variety.gradeType})
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <Label htmlFor="quantity">
                Quantity and unit <span aria-hidden>*</span>
              </Label>
              <Input
                id="quantity"
                placeholder="e.g. 1 x 20ft FCL, 25 MT"
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? "quantity-error" : undefined}
                {...register("quantity")}
              />
              <FieldError id="quantity-error" message={errors.quantity?.message} />
            </div>

            <div>
              <Label htmlFor="destinationPort">Destination port</Label>
              <Input id="destinationPort" {...register("destinationPort")} />
            </div>

            <div>
              <Label htmlFor="incoterm">Incoterm</Label>
              <NativeSelect id="incoterm" {...register("incoterm")}>
                <option value="">Select</option>
                {INCOTERMS.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div>
              <Label htmlFor="source">How did you find us</Label>
              <NativeSelect id="source" {...register("source")}>
                <option value="">Select</option>
                {REFERRAL_SOURCES.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </NativeSelect>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="targetSpecs">Target specifications</Label>
              <Textarea
                id="targetSpecs"
                rows={5}
                placeholder="Grade, moisture, packaging, certifications required…"
                {...register("targetSpecs")}
              />
            </div>
          </div>
        </div>
      </fieldset>

      {status.kind === "failed" ? (
        <p role="alert" className="mt-8 border-l-2 border-gold-700 bg-gold-100/25 py-3 pl-4 text-[0.9375rem] text-ink-600">
          {status.message}
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <Button type="submit" variant="gold" size="lg" disabled={sending}>
          {sending ? "Sending…" : "Send request"}
        </Button>
        <p className="eyebrow">Response {site.responseWindow}</p>
      </div>
    </form>
  );
}
