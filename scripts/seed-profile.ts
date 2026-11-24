async function seedProfile() {
  // Import after loading environment variables.
  const [{ connectToDatabase }, { default: ProfileModel }, { profileSchema }] =
    await Promise.all([
      import("../src/lib/db/connection"),
      import("../src/features/profile/server/profile.model"),
      import("../src/features/profile/schemas/profile.schema"),
    ]);

  const profileData = profileSchema.parse({
    firstName: "Ahmed",
    lastName: "Essam",

    role: "Frontend Developer",

    headline: "React.js | TypeScript | Next.js",

    about: {
      heading:
        "I'm Ahmed Essam, a Frontend Developer passionate about crafting digital experiences.",
      paragraphs: [
        "With a background in engineering and a strong focus on modern web technologies, I build intuitive, responsive, and accessible interfaces that bring ideas to life. I enjoy collaborating with teams, translating designs into functional products, and turning complex requirements into clean, maintainable solutions.",

        "I specialize in React, TypeScript, and Next.js, with experience in full-stack development, UI engineering, and performance optimization. My goal is to create thoughtful digital experiences that balance visual quality, usability, and technical excellence.",
      ],
    },

    tagline:
      "Building responsive, accessible, and high-performance web experiences with modern frontend technologies.",

    introduction:
      "I'm a Frontend Developer specializing in React.js, TypeScript, and Next.js. I enjoy turning complex requirements and designs into intuitive, maintainable web applications. My experience spans enterprise dashboards, e-commerce platforms, and full-stack applications.",

    biography: [
      "Freelance Frontend Developer working remotely since 2025, building production-oriented web applications and reusable frontend architectures.",
      "Previously worked as a Frontend Developer Intern at Huma Volve, contributing to car rental, e-commerce, and course platform projects.",
      "Experienced in integrating REST APIs, optimizing application performance, implementing accessible interfaces, and building responsive layouts.",
      "Holds a Bachelor's Degree in Communication and Electronics Engineering from Thebes Higher Institute of Engineering.",
    ],

    location: "Cairo, Egypt",

    email: "reach.ahmedessam@gmail.com",

    socialLinks: [
      {
        platform: "github",
        label: "GitHub",
        url: "https://github.com/aehamdy",
      },
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://linkedin.com/in/aehamdy",
      },
    ],

    availability: {
      isAvailable: true,
      opportunities: ["full-time", "freelance"],
    },
  });

  const mongoose = await connectToDatabase();

  try {
    const profile = await ProfileModel.findByIdAndUpdate(
      "main",
      { $set: profileData },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    )
      .lean()
      .exec();

    console.log("Profile seeded successfully!");
    console.log(JSON.stringify(profile, null, 2));
  } finally {
    await mongoose.disconnect();
  }
}

seedProfile().catch((error) => {
  console.error("Failed to seed profile:", error);
  process.exitCode = 1;
});
