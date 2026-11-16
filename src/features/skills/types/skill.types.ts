import type { z } from "zod";

import {
  createSkillSchema,
  skillSchema,
  updateSkillSchema,
} from "../schemas/skill.schema";

export type Skill = z.infer<typeof skillSchema>;

export type CreateSkillInput = z.input<typeof createSkillSchema>;

export type UpdateSkillInput = z.input<typeof updateSkillSchema>;
