import { connectToDatabase } from "@/lib/db/connection";
import ServiceModel from "./service.model";

export async function getServices() {
  await connectToDatabase();

  return ServiceModel.find({}).sort({ order: 1 }).lean().exec();
}
