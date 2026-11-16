import { z } from "zod";

export const experienceSchema = z.object({
  position: z.string().trim().min(1).max(100),

  company: z.string().trim().min(1).max(100),

  employmentType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "freelance",
    "internship",
  ]),

  location: z.string().trim().min(1),

  workMode: z.enum(["remote", "hybrid", "on-site"]),

  // Supports YYYY or YYYY-MM to preserve resume date precision.
  startDate: z.string().regex(/^\d{4}(-\d{2})?$/),

  endDate: z
    .string()
    .regex(/^\d{4}(-\d{2})?$/)
    .nullable(),

  isCurrent: z.boolean().default(false),

  description: z.string().trim().min(1).max(500),

  achievements: z.array(z.string().trim().min(1)).default([]),

  technologies: z.array(z.string().trim().min(1)).default([]),

  order: z.number().int().nonnegative().default(0),
});

export const createExperienceSchema = experienceSchema;

export const updateExperienceSchema = experienceSchema.partial();
