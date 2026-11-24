import { z } from "zod";

import { createProjectSchema } from "@/features/projects/schemas/project.schema";

// -----------------------------------------------------------------------------
// Mock projects
// -----------------------------------------------------------------------------

const mockProjects = [
  {
    title: "Athlo Dashboard",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      publicId: "projects/athlo-dashboard/thumbnail",
      alt: "Athlo Dashboard analytics and business performance overview",
    },
    slug: "athlo-dashboard",
    summary:
      "An enterprise sports retail dashboard designed to simplify business operations and provide actionable insights.",
    overview:
      "A comprehensive management platform for managing products, monitoring business performance, and making data-driven decisions.",

    tags: ["Dashboard", "Enterprise", "Data Visualization"],
    technologies: [
      "React",
      "TypeScript",
      "Material UI",
      "TanStack Query",
      "Recharts",
    ],

    role: "Frontend Developer",
    duration: "4 months",

    features: [
      {
        title: "Analytics Dashboard",
        description:
          "Visualizes business performance through interactive charts and statistics.",
      },
      {
        title: "Product Management",
        description:
          "Allows administrators to manage products, categories, and inventory.",
      },
      {
        title: "User Management",
        description:
          "Provides tools for managing users and access permissions.",
      },
      {
        title: "Responsive Interface",
        description:
          "Adapts the dashboard experience to different screen sizes.",
      },
    ],

    keyHighlights: [
      "Reduced unnecessary API requests through optimized data fetching and caching.",
      "Achieved a Lighthouse performance score above 95.",
      "Developed reusable UI components across multiple modules.",
      "Implemented accessible interfaces following WCAG AA guidelines.",
    ],

    challenges: [
      {
        problem:
          "Frequent API requests were affecting application performance.",
        solution:
          "Implemented TanStack Query caching and optimized data-fetching strategies.",
      },
      {
        problem:
          "Multiple modules required consistent layouts and reusable interactions.",
        solution:
          "Created a reusable component system to improve consistency and maintainability.",
      },
    ],

    collaborators: [],

    colorTheme: {
      accent: "#6366F1",
      background: "#F5F3FF",
      primaryForeground: "#1E1B4B",
      secondaryForeground: "#514A75",
      contrastForeground: "#FFFFFF",
    },

    links: {
      liveDemo: "https://example.com/athlo-dashboard",
      sourceCode: "https://github.com/username/athlo-dashboard",
      design: null,
      other: null,
    },

    blocks: [],

    isFeatured: true,
    status: "published",
    order: 1,
    publishedAt: new Date("2026-10-15"),
  },

  {
    title: "Athlo Store",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      publicId: "projects/athlo-store/thumbnail",
      alt: "Athlo Store e-commerce shopping experience",
    },
    slug: "athlo-store",
    summary:
      "A modern sports e-commerce experience focused on product discovery, smooth navigation, and seamless shopping.",
    overview:
      "An e-commerce storefront that provides customers with an intuitive way to explore sports products, discover collections, and complete their shopping journey.",

    tags: ["E-commerce", "Online Store", "Retail"],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Axios",
    ],

    role: "Frontend Developer",
    duration: "3 months",

    features: [
      {
        title: "Product Catalog",
        description:
          "Displays products through organized categories and responsive grids.",
      },
      {
        title: "Product Search",
        description:
          "Allows customers to discover products using search and filtering.",
      },
      {
        title: "Shopping Cart",
        description:
          "Provides cart management with quantity updates and order summaries.",
      },
      {
        title: "Product Details",
        description:
          "Displays product descriptions, images, pricing, and available options.",
      },
    ],

    keyHighlights: [
      "Built reusable product cards and shopping interface components.",
      "Implemented centralized state management for shopping cart interactions.",
      "Designed responsive layouts for desktop, tablet, and mobile devices.",
    ],

    challenges: [
      {
        problem:
          "Managing shopping cart state across multiple pages created unnecessary complexity.",
        solution: "Centralized cart state and actions using Redux Toolkit.",
      },
      {
        problem:
          "Customers needed an efficient way to discover products in a large catalog.",
        solution:
          "Implemented search, filtering, and category-based navigation.",
      },
    ],

    collaborators: [],

    colorTheme: {
      accent: "#059669",
      background: "#ECFDF5",
      primaryForeground: "#064E3B",
      secondaryForeground: "#356B58",
      contrastForeground: "#FFFFFF",
    },

    links: {
      liveDemo: "https://example.com/athlo-store",
      sourceCode: "https://github.com/username/athlo-store",
      design: null,
      other: null,
    },

    blocks: [],

    isFeatured: true,
    status: "published",
    order: 2,
    publishedAt: new Date("2026-09-20"),
  },

  {
    title: "DriveNow",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      publicId: "projects/drivenow/thumbnail",
      alt: "DriveNow car rental vehicle showcase",
    },
    slug: "drivenow-car-rental",
    summary:
      "A modern car rental platform that makes discovering and booking vehicles simple and convenient.",
    overview:
      "A car rental web application that allows users to explore available vehicles, compare rental options, and manage reservations through a streamlined interface.",

    tags: ["Car Rental", "Booking", "Web Application"],
    technologies: [
      "React",
      "TypeScript",
      "React Router",
      "Tailwind CSS",
      "Axios",
    ],

    role: "Frontend Developer",
    duration: "6 weeks",

    features: [
      {
        title: "Vehicle Discovery",
        description:
          "Allows users to browse available vehicles and explore their details.",
      },
      {
        title: "Advanced Search",
        description:
          "Provides filtering options based on vehicle type, price, and availability.",
      },
      {
        title: "Booking Flow",
        description:
          "Guides users through selecting rental dates and submitting reservations.",
      },
      {
        title: "Reservation Management",
        description: "Displays booking information and reservation status.",
      },
    ],

    keyHighlights: [
      "Implemented dynamic routing for vehicle and booking pages.",
      "Created a reusable vehicle search and filtering interface.",
      "Focused on a straightforward and accessible booking experience.",
    ],

    challenges: [
      {
        problem:
          "Users needed to find suitable vehicles without navigating the entire catalog.",
        solution: "Implemented debounced search and filtering.",
      },
      {
        problem:
          "The booking process involved several related selections and form inputs.",
        solution:
          "Organized the booking journey into clear steps with structured form handling.",
      },
    ],

    collaborators: [
      {
        name: "Sarah Ahmed",
        role: "UI/UX Designer",
        url: "https://example.com/sarah",
      },
    ],

    colorTheme: {
      accent: "#EA580C",
      background: "#FFF7ED",
      primaryForeground: "#7C2D12",
      secondaryForeground: "#99552D",
      contrastForeground: "#FFFFFF",
    },

    links: {
      liveDemo: "https://example.com/drivenow",
      sourceCode: "https://github.com/username/drivenow",
      design: "https://example.com/drivenow-design",
      other: null,
    },

    blocks: [],

    isFeatured: true,
    status: "published",
    order: 3,
    publishedAt: new Date("2026-08-12"),
  },

  {
    title: "Learnify",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8",
      publicId: "projects/learnify/thumbnail",
      alt: "Learnify online learning and education platform",
    },
    slug: "learnify-learning-platform",
    summary:
      "An online learning platform that helps students discover courses, track progress, and manage their learning journey.",
    overview:
      "A learning management platform designed to connect students with educational content through course discovery, learning progress tracking, and personalized dashboards.",

    tags: ["Education", "SaaS", "Learning Management"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "Zod",
    ],

    role: "Full-Stack Developer",
    duration: "3 months",

    features: [
      {
        title: "Course Catalog",
        description:
          "Allows students to discover and explore available courses.",
      },
      {
        title: "Learning Dashboard",
        description:
          "Provides an overview of enrolled courses and learning progress.",
      },
      {
        title: "Authentication",
        description: "Supports secure user registration and login.",
      },
      {
        title: "Course Management",
        description:
          "Allows instructors to organize course content and lessons.",
      },
    ],

    keyHighlights: [
      "Built a full-stack application using Next.js and MongoDB.",
      "Implemented schema validation using Zod.",
      "Designed reusable interfaces for students and instructors.",
    ],

    challenges: [
      {
        problem:
          "Different user types required access to different application features.",
        solution:
          "Implemented role-based authorization and protected application routes.",
      },
      {
        problem:
          "Course content needed a flexible structure to support different lesson types.",
        solution:
          "Designed structured data models for reusable courses and lessons.",
      },
    ],

    collaborators: [
      {
        name: "Omar Hassan",
        role: "Backend Developer",
        url: "https://example.com/omar",
      },
      {
        name: "Mariam Ali",
        role: "UI/UX Designer",
        url: "https://example.com/mariam",
      },
    ],

    colorTheme: {
      accent: "#0D9488",
      background: "#F0FDFA",
      primaryForeground: "#134E4A",
      secondaryForeground: "#356B68",
      contrastForeground: "#FFFFFF",
    },

    links: {
      liveDemo: "https://example.com/learnify",
      sourceCode: "https://github.com/username/learnify",
      design: null,
      other: null,
    },

    blocks: [],

    isFeatured: false,
    status: "published",
    order: 4,
    publishedAt: new Date("2026-07-05"),
  },

  {
    title: "TaskFlow",
    thumbnail: {
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
      publicId: "projects/taskflow/thumbnail",
      alt: "TaskFlow project and task management workspace",
    },
    slug: "taskflow-productivity-app",
    summary:
      "A productivity application designed to help individuals organize tasks, manage projects, and stay focused.",
    overview:
      "A task management application that brings personal productivity tools together. Users can organize work, track progress, and manage daily activities through a clean interface.",

    tags: ["Productivity", "Task Management", "Personal Project"],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
    ],

    role: "Full-Stack Developer",
    duration: "2 months",

    features: [
      {
        title: "Task Management",
        description:
          "Allows users to create, update, prioritize, and complete tasks.",
      },
      {
        title: "Project Organization",
        description: "Groups related tasks into manageable projects.",
      },
      {
        title: "Progress Tracking",
        description: "Provides an overview of completed and pending work.",
      },
      {
        title: "User Preferences",
        description: "Allows users to customize their productivity experience.",
      },
    ],

    keyHighlights: [
      "Developed REST API endpoints using Express.js and TypeScript.",
      "Implemented reusable frontend components and custom hooks.",
      "Designed a responsive interface with customizable preferences.",
    ],

    challenges: [
      {
        problem:
          "Tasks needed to remain organized while supporting different priorities and project assignments.",
        solution:
          "Designed a flexible task model with project references, priorities, and completion states.",
      },
      {
        problem: "Frontend and backend validation needed to remain consistent.",
        solution: "Used structured Zod schemas for incoming API data.",
      },
    ],

    collaborators: [],

    colorTheme: {
      accent: "#7C3AED",
      background: "#F5F3FF",
      primaryForeground: "#3B0764",
      secondaryForeground: "#6B4B8A",
      contrastForeground: "#FFFFFF",
    },

    links: {
      liveDemo: "https://example.com/taskflow",
      sourceCode: "https://github.com/username/taskflow",
      design: null,
      other: null,
    },

    blocks: [],

    isFeatured: false,
    status: "published",
    order: 5,
    publishedAt: new Date("2026-06-10"),
  },

  {
    title: "Studio Portfolio",
    thumbnail: {
      url: "https://images.unsplash.com/photo- portfolio",
      publicId: "projects/studio-portfolio/thumbnail",
      alt: "Studio Portfolio creative website design",
    },
    slug: "studio-creative-portfolio",
    summary:
      "A visually engaging creative portfolio website built to showcase work, services, and a distinctive brand identity.",
    overview:
      "A creative presentation website designed for a digital design studio. It combines expressive typography, carefully selected colors, and smooth interactions to create a memorable browsing experience.",

    tags: ["Portfolio", "Creative", "Web Design", "Landing Page"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
    ],

    role: "Frontend Developer",
    duration: "4 weeks",

    features: [
      {
        title: "Animated Hero",
        description:
          "Introduces the studio through expressive typography and subtle motion.",
      },
      {
        title: "Project Showcase",
        description:
          "Displays selected projects through an editorial-style layout.",
      },
      {
        title: "Services Section",
        description: "Communicates the studio's capabilities and expertise.",
      },
      {
        title: "Contact Experience",
        description:
          "Provides clear ways for prospective clients to get in touch.",
      },
    ],

    keyHighlights: [
      "Built a responsive, component-based website using Next.js.",
      "Implemented subtle page and element transitions.",
      "Created a consistent visual system with reusable design tokens.",
    ],

    challenges: [
      {
        problem:
          "The design needed to feel visually distinctive without compromising readability.",
        solution:
          "Combined expressive typography with a controlled spacing system and clear content hierarchy.",
      },
      {
        problem: "Animations could negatively affect usability if overused.",
        solution:
          "Used purposeful transitions and respected reduced-motion preferences.",
      },
    ],

    collaborators: [
      {
        name: "Laila Mohamed",
        role: "Brand Designer",
        url: "https://example.com/laila",
      },
    ],

    colorTheme: {
      accent: "#E11D48",
      background: "#FFF1F2",
      primaryForeground: "#881337",
      secondaryForeground: "#9F5269",
      contrastForeground: "#FFFFFF",
    },

    links: {
      liveDemo: "https://example.com/studio-portfolio",
      sourceCode: "https://github.com/username/studio-portfolio",
      design: "https://example.com/studio-design",
      other: null,
    },

    blocks: [],

    isFeatured: false,
    status: "published",
    order: 6,
    publishedAt: new Date("2026-05-18"),
  },
];

// -----------------------------------------------------------------------------
// Validate and seed
// -----------------------------------------------------------------------------

async function seedProjects() {
  // Validate all data before connecting to the database.
  const validatedProjects = z.array(createProjectSchema).parse(mockProjects);

  // Import server-only modules after validating the seed data.
  const [{ connectToDatabase }, { default: ProjectModel }, mongoose] =
    await Promise.all([
      import("@/lib/db/connection"),
      import("@/features/projects/server/project.model"),
      import("mongoose"),
    ]);

  try {
    await connectToDatabase();

    const operations = validatedProjects.map((project) => ({
      updateOne: {
        filter: { slug: project.slug },
        update: {
          $set: project,
        },
        upsert: true,
      },
    }));

    const result = await ProjectModel.bulkWrite(operations);

    console.log("Projects seeded successfully!");
    console.log(`Projects provided: ${validatedProjects.length}`);
    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Modified: ${result.modifiedCount}`);
    console.log(`Matched: ${result.matchedCount}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedProjects().catch((error) => {
  console.error("Failed to seed projects:", error);
  process.exitCode = 1;
});
