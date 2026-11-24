import type { z } from "zod";
import {
  createFAQSchema,
  faqItemSchema,
  faqSchema,
  updateFAQSchema,
} from "../schemas/faq.schema";

export type FAQItem = z.infer<typeof faqItemSchema>;

export type FAQ = z.infer<typeof faqSchema>;

export type CreateFAQInput = z.input<typeof createFAQSchema>;

export type UpdateFAQInput = z.input<typeof updateFAQSchema>;
