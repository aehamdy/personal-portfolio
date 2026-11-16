import type { z } from "zod";

import {
  createExperienceSchema,
  experienceSchema,
  updateExperienceSchema,
} from "../schemas/experience.schema";

export type Experience = z.infer<typeof experienceSchema>;

export type CreateExperienceInput = z.input<typeof createExperienceSchema>;

export type UpdateExperienceInput = z.input<typeof updateExperienceSchema>;
