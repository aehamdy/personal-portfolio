import { z } from "zod";

export const faqItemSchema = z.object({
  title: z.string().trim().min(1).max(150),
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(2000),
  order: z.number().int().nonnegative().default(0),
});

export const faqSchema = z.object({
  key: z.literal("main").default("main"),
  description: z.string().trim().min(1).max(500),
  items: z.array(faqItemSchema).min(1),
});

export const createFAQSchema = faqSchema;

export const updateFAQSchema = faqSchema
  .omit({ key: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });
