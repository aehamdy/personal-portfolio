import type { z } from "zod";

import {
  createEducationSchema,
  educationSchema,
  updateEducationSchema,
} from "../schemas/education.schema";

export type Education = z.infer<typeof educationSchema>;

export type CreateEducationInput = z.input<typeof createEducationSchema>;

export type UpdateEducationInput = z.input<typeof updateEducationSchema>;
