import type { z } from "zod";

import {
  createProjectSchema,
  projectBlockSchema,
  projectChallengeSchema,
  projectCollaboratorSchema,
  projectColorThemeSchema,
  projectFeatureSchema,
  projectImageSchema,
  projectLinksSchema,
  projectSchema,
  updateProjectSchema,
} from "../schemas/project.schema";

export type ProjectImage = z.infer<typeof projectImageSchema>;

export type ProjectLinks = z.infer<typeof projectLinksSchema>;

export type ProjectColorTheme = z.infer<typeof projectColorThemeSchema>;

export type ProjectFeature = z.infer<typeof projectFeatureSchema>;

export type ProjectChallenge = z.infer<typeof projectChallengeSchema>;

export type ProjectCollaborator = z.infer<typeof projectCollaboratorSchema>;

export type ProjectBlock = z.infer<typeof projectBlockSchema>;

export type Project = z.infer<typeof projectSchema> & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type SerializedProject = Omit<
  Project,
  "_id" | "publishedAt" | "createdAt" | "updatedAt"
> & {
  _id: string;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateProjectInput = z.input<typeof createProjectSchema>;

export type UpdateProjectInput = z.input<typeof updateProjectSchema>;
