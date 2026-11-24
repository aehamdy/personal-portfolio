import "server-only";

import { connectToDatabase } from "@/lib/db/connection";
import FAQModel from "./faq.model";

export async function getFAQ() {
  await connectToDatabase();

  return FAQModel.findOne({ key: "main" }).lean().exec();
}
