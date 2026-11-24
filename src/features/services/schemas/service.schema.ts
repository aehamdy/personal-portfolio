import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).max(1000),
  points: z.array(z.string().trim().min(1).max(200)).min(1),
  order: z.number().int().nonnegative().default(0),
});

export const createServiceSchema = serviceSchema;

export const updateServiceSchema = serviceSchema.partial();
