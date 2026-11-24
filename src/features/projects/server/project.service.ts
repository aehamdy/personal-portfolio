import { connectToDatabase } from "@/lib/db/connection";
import ProjectModel from "./project.model";
import {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from "../types/project.types";

// PUBLIC QUERIES
export async function getFeaturedProjects(limit = 3) {
  await connectToDatabase();

  return ProjectModel.find({
    status: "published",
    isFeatured: true,
  })
    .select("_id title slug summary thumbnail technologies colorTheme")
    .sort({ order: 1, publishedAt: -1 })
    .limit(limit)
    .lean()
    .exec();
}

export async function getPublishedProjects() {
  await connectToDatabase();

  return ProjectModel.find({ status: "published" })
    .sort({
      order: 1,
      publishedAt: -1,
    })
    .lean()
    .exec();
}

export async function getPublishedProjectBySlug(slug: string) {
  await connectToDatabase();

  return ProjectModel.findOne({ slug, status: "published" }).lean().exec();
}

// ADMIN QUERIES
export async function getAdminProjects(status?: Project["status"]) {
  await connectToDatabase();

  const filter = status ? { status } : {};

  return ProjectModel.find(filter)
    .sort({ order: 1, updatedAt: -1 })
    .lean()
    .exec();
}

export async function getProjectById(id: string) {
  await connectToDatabase();

  return ProjectModel.findById(id).lean().exec();
}

// Mutations
export async function createProject(data: CreateProjectInput) {
  await connectToDatabase();

  return ProjectModel.create(data);
}

export async function updateProject(id: string, data: UpdateProjectInput) {
  await connectToDatabase();

  if (Object.keys(data).length === 0) {
    throw new Error("At least one field must be provided for an update.");
  }

  const existingProject = await ProjectModel.findById(id);

  if (!existingProject) {
    return null;
  }

  const updateData: UpdateProjectInput = { ...data };

  // Set the publication date the first time a project is published.
  if (
    data.status === "published" &&
    existingProject !== "published" &&
    !data.publishedAt
  ) {
    updateData.publishedAt = new Date();
  }

  return ProjectModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).exec();
}

export async function deleteProject(id: string) {
  await connectToDatabase();

  return ProjectModel.findByIdAndDelete(id).exec();
}
