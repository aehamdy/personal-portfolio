import { z } from "zod";
import { createServiceSchema } from "@/features/services/schemas/service.schema";

const mockServices = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, interactive, and accessible interfaces using modern frontend technologies.",
    points: [
      "React and Next.js applications",
      "Responsive layouts and reusable components",
      "Accessible and maintainable UI architecture",
    ],
    order: 1,
  },
  {
    title: "UI Development & Implementation",
    description:
      "Turning design concepts and Figma files into polished, production-ready interfaces.",
    points: [
      "Figma-to-code implementation",
      "Pixel-conscious design translation",
      "Consistent design systems and UI components",
    ],
    order: 2,
  },
  {
    title: "Web Application Development",
    description:
      "Developing feature-rich web applications with reliable data handling and seamless user experiences.",
    points: [
      "API integration and data fetching",
      "Authentication and application workflows",
      "State management and form handling",
    ],
    order: 3,
  },
  {
    title: "Performance & Optimization",
    description:
      "Improving application speed, usability, and overall frontend quality.",
    points: [
      "Performance auditing and optimization",
      "Core Web Vitals improvements",
      "Accessibility and responsive improvements",
    ],
    order: 4,
  },
];

const validatedServices = z.array(createServiceSchema).parse(mockServices);

async function seedServices() {
  const [{ connectToDatabase }, { default: ServiceModel }, mongoose] =
    await Promise.all([
      import("@/lib/db/connection"),
      import("@/features/services/server/service.model"),
      import("mongoose"),
    ]);

  try {
    await connectToDatabase();

    const operations = validatedServices.map((service) => ({
      updateOne: {
        filter: { title: service.title },
        update: { $set: service },
        upsert: true,
      },
    }));

    const result = await ServiceModel.bulkWrite(operations);

    console.log("Services seeded successfully.");
    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Updated: ${result.modifiedCount}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedServices().catch((error) => {
  console.error("Failed to seed services:", error);
  process.exit(1);
});
