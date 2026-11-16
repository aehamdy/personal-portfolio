import "server-only";

import { connectToDatabase } from "@/lib/db/connection";
import EducationModel from "./education.model";

export async function getEducation() {
  await connectToDatabase();

  return EducationModel.find().sort({ order: 1 }).lean().exec();
}
