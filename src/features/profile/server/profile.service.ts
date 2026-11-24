import { connectToDatabase } from "@/lib/db/connection";
import ProfileModel from "./profile.model";
import { Profile } from "../types/profile.types";

export async function getProfile(): Promise<Profile | null> {
  await connectToDatabase();

  return ProfileModel.findById("main").lean<Profile>().exec();
}
