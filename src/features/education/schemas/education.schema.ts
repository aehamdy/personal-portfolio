import { z } from "zod";

export const educationSchema = z.object({
  qualification: z.string().trim().min(1).max(120),
  fieldOfStudy: z.string().trim().min(1).max(150),
  institution: z.string().trim().min(1).max(150),
  location: z.string().trim().min(1),
  startDate: z
    .string()
    .regex(/^\d{4}(-\d{2})?$/)
    .nullable()
    .default(null),
  endDate: z
    .string()
    .regex(/^\d{4}(-\d{2})?$/)
    .nullable(),
  isOngoing: z.boolean().default(false),
  description: z.string().trim().max(500).default(""),
  achievements: z.array(z.string().trim().min(1)).default([]),
  order: z.number().int().nonnegative().default(0),
});

export const createEducationSchema = educationSchema;
export const updateEducationSchema = educationSchema.partial();
