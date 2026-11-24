import { faqSchema } from "../src/features/faq/schemas/faq.schema";

const faqData = faqSchema.parse({
  key: "main",
  description:
    "Here are some answers to frequently asked questions about my services, development process, technical expertise, and collaboration.",
  items: [
    {
      title: "Services & Expertise",
      question: "What types of projects do you work on?",
      answer:
        "I focus on building modern web applications and responsive user interfaces. My work includes React and Next.js development, Figma-to-code implementation, API integration, and improving the performance, accessibility, and usability of existing applications.",
      order: 1,
    },
    {
      title: "Technologies & Tools",
      question: "What technologies do you use to build web applications?",
      answer:
        "I primarily work with React, Next.js, TypeScript, and modern CSS technologies. Depending on the project, I also use tools such as Tailwind CSS, TanStack Query, React Hook Form, Zod, Node.js, Express, and MongoDB.",
      order: 2,
    },
    {
      title: "Project Collaboration",
      question: "Can you work with an existing design or development team?",
      answer:
        "Yes. I can collaborate with designers, developers, and other stakeholders. I can implement existing Figma designs, work with established component systems, integrate frontend features into existing applications, and contribute through Git-based workflows.",
      order: 3,
    },
    {
      title: "Development Process",
      question: "How do you approach a new project?",
      answer:
        "I start by understanding the project goals, requirements, and target users. Then I plan the structure and technical approach, implement the interface and functionality, and refine the result through testing, performance improvements, and responsive checks before delivery.",
      order: 4,
    },
    {
      title: "Responsive Design & Quality",
      question: "Do you build responsive and accessible websites?",
      answer:
        "Yes. I aim to build interfaces that work consistently across desktop, tablet, and mobile screens. I also consider accessibility best practices, semantic HTML, keyboard navigation, and clear visual hierarchy throughout development.",
      order: 5,
    },
    {
      title: "Availability & Communication",
      question:
        "Are you available for freelance projects or full-time opportunities?",
      answer:
        "I'm open to discussing suitable freelance projects and full-time opportunities. You can reach me through the contact section or my professional social profiles to share your requirements and discuss potential collaboration.",
      order: 6,
    },
  ],
});

async function seedFAQ() {
  const [{ connectToDatabase }, { default: FAQModel }, mongoose] =
    await Promise.all([
      import("../src/lib/db/connection"),
      import("../src/features/faq/server/faq.model"),
      import("mongoose"),
    ]);

  try {
    await connectToDatabase();

    const result = await FAQModel.updateOne(
      { key: faqData.key },
      { $set: faqData },
      {
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    ).exec();

    console.log("FAQ data seeded successfully.");
    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Modified: ${result.modifiedCount}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedFAQ().catch((error) => {
  console.error("Failed to seed FAQ data:", error);
  process.exitCode = 1;
});
