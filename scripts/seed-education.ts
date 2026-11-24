import { educationSchema } from "../src/features/education/schemas/education.schema";

const educationData = educationSchema.array().parse([
  {
    qualification: "Bachelor's Degree",
    fieldOfStudy: "Communication & Electronics Engineering",
    institution: "Thebes Higher Institute of Engineering",
    location: "Cairo, Egypt",
    startDate: null,
    endDate: "2020",
    isOngoing: false,
    description: "",
    achievements: [],
    order: 0,
  },
]);

async function seedEducation() {
  const { connectToDatabase } = await import("../src/lib/db/connection");
  const EducationModel = (
    await import("../src/features/education/server/education.model")
  ).default;

  try {
    await connectToDatabase();

    for (const education of educationData) {
      await EducationModel.findOneAndUpdate(
        {
          institution: education.institution,
          qualification: education.qualification,
        },
        {
          $set: education,
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      ).exec();
    }

    console.log("Education data seeded successfully.");
  } finally {
    await (await import("mongoose")).default.disconnect();
  }
}

seedEducation().catch((error) => {
  console.error("Failed to seed education data:", error);
  process.exitCode = 1;
});
