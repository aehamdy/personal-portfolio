import "server-only";

import { connectToDatabase } from "@/lib/db/connection";
import ExperienceModel from "./experience.model";

export async function getExperiences() {
  await connectToDatabase();

  return ExperienceModel.find().sort({ order: 1 }).lean().exec();
}
