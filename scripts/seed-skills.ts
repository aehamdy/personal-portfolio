import { skillSchema } from "../src/features/skills/schemas/skill.schema";

const skillsData = skillSchema.array().parse([
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
    order: 0,
  },
  {
    category: "Frontend",
    skills: [
      "React 19",
      "Next.js",
      "React Router",
      "Vite",
      "Tailwind CSS 4",
      "MUI",
      "Shadcn/ui",
      "Radix UI",
      "Framer Motion",
      "SASS",
    ],
    order: 1,
  },
  {
    category: "Backend & Databases",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST API Development",
      "JWT Authentication",
    ],
    order: 2,
  },
  {
    category: "State Management & Data Fetching",
    skills: [
      "TanStack Query (React Query)",
      "Redux Toolkit",
      "Zustand",
      "Axios",
    ],
    order: 3,
  },
  {
    category: "Forms & Data Visualization",
    skills: ["React Hook Form", "Zod", "TanStack Table", "Recharts"],
    order: 4,
  },
  {
    category: "Tools & Practice",
    skills: [
      "Git",
      "GitHub",
      "Figma-to-Code",
      "WCAG AA Accessibility",
      "Vercel",
      "Netlify",
      "ESLint",
      "Prettier",
      "Lighthouse Optimization",
      "Agile/Scrum",
    ],
    order: 5,
  },
]);

async function seedSkills() {
  const { connectToDatabase } = await import("../src/lib/db/connection");
  const SkillModel = (await import("../src/features/skills/server/skill.model"))
    .default;

  try {
    await connectToDatabase();

    for (const skillGroup of skillsData) {
      await SkillModel.findOneAndUpdate(
        { category: skillGroup.category },
        { $set: skillGroup },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      ).exec();
    }

    console.log("Skills data seeded successfully.");
  } finally {
    await (await import("mongoose")).default.disconnect();
  }
}

seedSkills().catch((error) => {
  console.error("Failed to seed skills data:", error);
  process.exitCode = 1;
});
