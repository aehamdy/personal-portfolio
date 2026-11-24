import { createProcessSchema } from "@/features/process/schmeas/process.schema";
import { z } from "zod";

const mockProcessSteps = [
  {
    step: 1,
    label: "DISCOVER",
    title: "Understanding the Idea",
    description:
      "I start by understanding the project's goals, target audience, requirements, and challenges to establish a clear direction.",
    keywords: ["RESEARCH", "REQUIREMENTS", "PLANNING"],
    order: 1,
  },
  {
    step: 2,
    label: "PLAN",
    title: "Planning the Experience",
    description:
      "I organize the structure, define the user flows, and identify the technical approach needed to build a scalable solution.",
    keywords: ["STRUCTURE", "USER FLOWS", "ARCHITECTURE"],
    order: 2,
  },
  {
    step: 3,
    label: "DESIGN & BUILD",
    title: "Bringing It to Life",
    description:
      "I translate the concept into a functional interface, focusing on visual consistency, responsive layouts, and reusable components.",
    keywords: ["IMPLEMENTATION", "COMPONENTS", "RESPONSIVENESS"],
    order: 3,
  },
  {
    step: 4,
    label: "REFINE",
    title: "Testing & Refinement",
    description:
      "I test the experience, address issues, and refine performance, accessibility, and usability to ensure everything works as expected.",
    keywords: ["TESTING", "OPTIMIZATION", "QUALITY"],
    order: 4,
  },
  {
    step: 5,
    label: "DELIVER",
    title: "Launching the Product",
    description:
      "Once everything is ready, I prepare the application for deployment and ensure the final result is ready for real users.",
    keywords: ["DEPLOYMENT", "DELIVERY", "SUPPORT"],
    order: 5,
  },
];

const validatedProcessSteps = z
  .array(createProcessSchema)
  .parse(mockProcessSteps);

async function seedProcess() {
  const [{ connectToDatabase }, { default: ProcessModel }, mongoose] =
    await Promise.all([
      import("@/lib/db/connection"),
      import("@/features/process/server/process.model"),
      import("mongoose"),
    ]);

  try {
    await connectToDatabase();

    const operations = validatedProcessSteps.map((processStep) => ({
      updateOne: {
        filter: { step: processStep.step },
        update: { $set: processStep },
        upsert: true,
      },
    }));

    const result = await ProcessModel.bulkWrite(operations);

    console.log("Process steps seeded successfully.");
    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Updated: ${result.modifiedCount}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedProcess().catch((error) => {
  console.error("Failed to seed process steps:", error);
  process.exit(1);
});
