import type { Project, SerializedProject } from "../types/project.types";

export function serializeProject(project: Project): SerializedProject {
  return {
    ...project,
    _id: String(project._id),
    publishedAt: project.publishedAt
      ? new Date(project.publishedAt).toISOString()
      : null,
    createdAt: project.createdAt
      ? new Date(project.createdAt).toISOString()
      : undefined,
    updatedAt: project.updatedAt
      ? new Date(project.updatedAt).toISOString()
      : undefined,
  };
}
