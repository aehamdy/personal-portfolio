import { z } from "zod";

export const skillSchema = z.object({
  _id: z.string(),
  category: z.string().trim().min(1).max(80),
  skills: z.array(z.string().trim().min(1).max(80)).min(1),
  order: z.number().int().nonnegative().default(0),
});

export const createSkillSchema = skillSchema;
export const updateSkillSchema = skillSchema.partial();
