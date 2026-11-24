import "server-only";

import { connectToDatabase } from "@/lib/db/connection";
import ExperienceModel from "./experience.model";

export async function getExperiences() {
  await connectToDatabase();

  const docs = await ExperienceModel.find().sort({ order: 1 }).lean();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  }));
}
