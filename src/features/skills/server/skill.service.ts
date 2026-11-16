import "server-only";

import { connectToDatabase } from "@/lib/db/connection";
import SkillModel from "./skill.model";

export async function getSkills() {
  await connectToDatabase();

  return SkillModel.find().sort({ order: 1 }).lean().exec();
}
