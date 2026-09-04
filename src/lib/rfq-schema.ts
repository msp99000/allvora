/**
 * RFQ schema. PROJECT_BRIEF.md Section 5.6.
 *
 * Shared by the client form and the /api/rfq route handler, so the browser and
 * the server validate the same shape. Error messages name the field and the
 * fix, as Section 5.6 requires.
 */

import { z } from "zod";

export const INCOTERMS = ["FOB", "CIF", "CFR", "EXW", "Other or not sure"] as const;

export const REFERRAL_SOURCES = [
  "Search engine",
  "Referral or recommendation",
  "Trade show or exhibition",
  "Trade directory or marketplace",
  "Social media",
  "Other",
] as const;

export const rfqSchema = z.object({
  name: z.string().trim().min(2, "Enter your name, at least 2 characters."),
  company: z.string().trim().min(2, "Enter your company name."),
  country: z.string().trim().min(2, "Enter the country you are buying for."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address, for example buyer@company.com"),
  phone: z.string().trim().max(40, "Phone number is too long.").optional().or(z.literal("")),

  category: z.string().trim().min(1, "Choose a product category."),
  product: z.string().trim().min(1, "Choose a product."),
  variety: z.string().trim().optional().or(z.literal("")),

  quantity: z
    .string()
    .trim()
    .min(2, "Enter a quantity and unit, for example 1 x 20ft FCL or 25 MT."),
  destinationPort: z.string().trim().max(120).optional().or(z.literal("")),
  incoterm: z.enum(INCOTERMS).optional().or(z.literal("")),
  targetSpecs: z.string().trim().max(4000, "Please keep this under 4000 characters.").optional().or(z.literal("")),
  source: z.enum(REFERRAL_SOURCES).optional().or(z.literal("")),

  /**
   * Honeypot. Real buyers never see this field, so any value means a bot.
   * Deliberately NOT constrained here: if the schema rejected it, the 422 would
   * name the field and tell a bot exactly how to get past it. The route accepts
   * a filled honeypot silently instead.
   */
  website: z.string().optional(),
});

export type RfqInput = z.infer<typeof rfqSchema>;
