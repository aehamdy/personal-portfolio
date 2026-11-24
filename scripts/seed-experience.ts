import { experienceSchema } from "../src/features/experience/schemas/experience.schema";

const experienceData = experienceSchema.array().parse([
  {
    position: "Freelance Frontend Developer",
    company: "Self-employed",
    employmentType: "freelance",
    location: "Remote",
    workMode: "remote",
    startDate: "2025",
    endDate: null,
    isCurrent: true,
    description:
      "Building production-oriented web applications with modern frontend technologies, focusing on accessible interfaces, reusable architecture, and performance.",
    achievements: [
      "Designed and delivered Athlo, an enterprise-grade sports retail dashboard, architecting 9 feature modules in React 19 with TypeScript, achieving a 95+ Lighthouse score, reducing API calls by 60% through TanStack Query caching, and meeting WCAG AA accessibility standards.",
      "Translated Figma mockups into pixel-perfect, accessible interfaces using custom React Hooks and reusable component architecture, reducing feature development time by approximately 30%.",
      "Built and deployed Next.js applications using SSR and SSG, integrated REST APIs, and achieved 90+ Lighthouse performance scores.",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Next.js",
      "TanStack Query",
      "REST APIs",
    ],
    order: 0,
  },
  {
    position: "Frontend Developer Intern",
    company: "Huma Volve",
    employmentType: "internship",
    location: "Remote",
    workMode: "remote",
    startDate: "2025-04",
    endDate: "2025-05",
    isCurrent: false,
    description:
      "Developed frontend features for car rental, e-commerce, and online course applications.",
    achievements: [
      "Implemented pixel-perfect UI components from Figma designs for a car rental application.",
      "Built dynamic routing and real-time debounced search for an e-commerce frontend using React.js and Tailwind CSS.",
      "Integrated JWT authentication and role-based access control (RBAC) into a React course platform.",
      "Collaborated in Agile sprints using Git and GitHub, contributing to code reviews, daily stand-ups, and task tracking.",
    ],
    technologies: ["React.js", "Tailwind CSS", "JWT", "Git", "GitHub"],
    order: 1,
  },
]);

async function seedExperience() {
  const { connectToDatabase } = await import("../src/lib/db/connection");
  const ExperienceModel = (
    await import("../src/features/experience/server/experience.model")
  ).default;

  try {
    await connectToDatabase();

    for (const experience of experienceData) {
      await ExperienceModel.findOneAndUpdate(
        {
          position: experience.position,
          company: experience.company,
        },
        {
          $set: experience,
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      ).exec();
    }

    console.log("Experience data seeded successfully.");
  } finally {
    await (await import("mongoose")).default.disconnect();
  }
}

seedExperience().catch((error) => {
  console.error("Failed to seed experience data:", error);
  process.exitCode = 1;
});
