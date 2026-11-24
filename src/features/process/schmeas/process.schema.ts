import { z } from "zod";

export const processSchema = z.object({
  step: z.number().int().positive(),
  label: z.string().trim().min(1).max(80),
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).max(1000),
  keywords: z.array(z.string().trim().min(1).max(80)).min(1),
  order: z.number().int().nonnegative().default(0),
});

export const createProcessSchema = processSchema;

export const updateProcessSchema = processSchema.partial();
