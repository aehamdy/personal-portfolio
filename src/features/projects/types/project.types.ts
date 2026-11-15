import z from "zod";
import {
  createProjectSchema,
  projectBlockSchema,
  projectImageSchema,
  projectLinkSchema,
  projectSchema,
  richTextContentSchema,
  updateProjectSchema,
} from "../schemas/project.schema";

export type ProjectImage = z.infer<typeof projectImageSchema>;

export type ProjectLink = z.infer<typeof projectLinkSchema>;

export type RichTextContent = z.infer<typeof richTextContentSchema>;

export type ProjectBlock = z.infer<typeof projectBlockSchema>;

export type Project = z.infer<typeof projectSchema>;

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
