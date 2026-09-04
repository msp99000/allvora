/**
 * RFQ submissions. PROJECT_BRIEF.md Section 5.6.
 *
 * Sends through Resend when RESEND_API_KEY is set. Without a key (local
 * development, or before the account is provisioned) it logs the enquiry to the
 * console and still returns success, so the form can be exercised end to end.
 *
 * TODO before launch: set RESEND_API_KEY, RFQ_TO_EMAIL and RFQ_FROM_EMAIL in
 * the Vercel project. Listed in CONTENT_REVIEW.md.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getProduct, getVariety } from "@/data/products";
import { getCategory } from "@/data/categories";
import { rfqSchema } from "@/lib/rfq-schema";

export const runtime = "nodejs";

const TO = process.env.RFQ_TO_EMAIL ?? "";
const FROM = process.env.RFQ_FROM_EMAIL ?? "";
const KEY = process.env.RESEND_API_KEY ?? "";

function line(label: string, value: string | undefined): string {
  return value ? `${label.padEnd(20)} ${value}` : "";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = rfqSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Some fields need attention.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot: accept silently so a bot cannot tell it was filtered.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const category = getCategory(data.category);
  const product = getProduct(data.product);
  const variety = data.variety ? getVariety(data.product, data.variety)?.variety : undefined;

  const subject = `RFQ: ${product?.name ?? data.product}${
    variety ? ` / ${variety.name}` : ""
  } from ${data.company} (${data.country})`;

  const body = [
    line("Name", data.name),
    line("Company", data.company),
    line("Country", data.country),
    line("Email", data.email),
    line("Phone / WhatsApp", data.phone),
    "",
    line("Category", category?.name ?? data.category),
    line("Product", product?.name ?? data.product),
    line("Variety / grade", variety?.name ?? data.variety),
    line("Quantity", data.quantity),
    line("Destination port", data.destinationPort),
    line("Incoterm", data.incoterm),
    "",
    data.targetSpecs ? `Target specifications:\n${data.targetSpecs}` : "",
    "",
    line("Found us via", data.source),
    line("Received", new Date().toISOString()),
  ]
    .filter(Boolean)
    .join("\n");

  if (!KEY || !TO || !FROM) {
    // eslint-disable-next-line no-console
    console.info(`[rfq] ${subject}\n${body}\n[rfq] RESEND_API_KEY not set, not sent.`);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject,
      text: body,
    });
    if (error) {
      // eslint-disable-next-line no-console
      console.error("[rfq] Resend error", error);
      return NextResponse.json(
        { error: "We could not send that just now. Please email us directly." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (cause) {
    // eslint-disable-next-line no-console
    console.error("[rfq] send failed", cause);
    return NextResponse.json(
      { error: "We could not send that just now. Please email us directly." },
      { status: 502 }
    );
  }
}
