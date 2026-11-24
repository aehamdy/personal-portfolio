import { connectToDatabase } from "@/lib/db/connection";
import ProcessModel from "./process.model";

export async function getProcessSteps() {
  await connectToDatabase();

  return ProcessModel.find({}).sort({ order: 1 }).lean().exec();
}
