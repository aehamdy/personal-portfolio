import { connectToDatabase } from "@/lib/db/connection";
import ProfileModel from "./profile.model";

export async function getProfile() {
  await connectToDatabase();

  return ProfileModel.findById("main").lean().exec();
}
