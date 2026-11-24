import { z } from "zod";

// -----------------------------------------------------------------------------
// Reusable schemas
// -----------------------------------------------------------------------------

export const projectImageSchema = z.object({
  url: z.url(),
  publicId: z.string().trim().min(1),
  alt: z.string().trim().min(1).max(300),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const projectLinksSchema = z.object({
  liveDemo: z.url().nullable(),
  sourceCode: z.url().nullable(),
  design: z.url().nullable(),
  other: z.url().nullable(),
});

export const projectColorThemeSchema = z.object({
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  primaryForeground: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  secondaryForeground: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  contrastForeground: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export const projectFeatureSchema = z.object({
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().min(1).max(1000),
});

export const projectChallengeSchema = z.object({
  problem: z.string().trim().min(1).max(2000),
  solution: z.string().trim().min(1).max(2000),
});

export const projectCollaboratorSchema = z.object({
  name: z.string().trim().min(1).max(100),
  role: z.string().trim().min(1).max(100),
  url: z.url().nullable().default(null),
});

// -----------------------------------------------------------------------------
// Rich text schemas
// -----------------------------------------------------------------------------

export const richTextChildSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("link"),
    text: z.string(),
    url: z.url(),
  }),
]);

export const richTextNodeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("paragraph"),
    children: z.array(richTextChildSchema),
  }),
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    children: z.array(richTextChildSchema),
  }),
  z.object({
    type: z.literal("bulletList"),
    items: z.array(z.array(richTextChildSchema)),
  }),
  z.object({
    type: z.literal("orderedList"),
    items: z.array(z.array(richTextChildSchema)),
  }),
]);

// -----------------------------------------------------------------------------
// Content block schemas
// -----------------------------------------------------------------------------

export const richTextBlockSchema = z.object({
  type: z.literal("richText"),
  content: z.array(richTextNodeSchema),
});

export const imageBlockSchema = z.object({
  type: z.literal("image"),
  image: projectImageSchema,
});

export const galleryBlockSchema = z.object({
  type: z.literal("gallery"),
  layout: z.enum(["grid", "masonry"]),
  images: z.array(projectImageSchema).min(1),
});

export const featuresBlockSchema = z.object({
  type: z.literal("features"),
  title: z.string().trim().min(1).max(150),
  items: z.array(projectFeatureSchema).min(1),
});

export const twoColumnBlockSchema = z.object({
  type: z.literal("twoColumn"),
  left: z.array(richTextNodeSchema),
  right: z.array(richTextNodeSchema),
});

export const codeBlockSchema = z.object({
  type: z.literal("code"),
  language: z.string().trim().min(1).max(50),
  code: z.string().min(1),
});

export const projectBlockSchema = z.discriminatedUnion("type", [
  richTextBlockSchema,
  imageBlockSchema,
  galleryBlockSchema,
  featuresBlockSchema,
  twoColumnBlockSchema,
  codeBlockSchema,
]);

// -----------------------------------------------------------------------------
// Main project schema
// -----------------------------------------------------------------------------

export const projectSchema = z.object({
  _id: z.string(),

  title: z.string().trim().min(1).max(150),

  slug: z
    .string()
    .trim()
    .min(1)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  summary: z.string().trim().min(1).max(300),
  overview: z.string().trim().min(1).max(3000),

  thumbnail: projectImageSchema.optional(),
  gallery: z.array(projectImageSchema).default([]),

  tags: z.array(z.string().trim().min(1).max(80)).default([]),
  technologies: z.array(z.string().trim().min(1).max(80)).default([]),

  role: z.string().trim().min(1).max(100),
  duration: z.string().trim().min(1).max(100),

  features: z.array(projectFeatureSchema).default([]),
  keyHighlights: z.array(z.string().trim().min(1).max(1000)).default([]),

  challenges: z.array(projectChallengeSchema).default([]),

  collaborators: z.array(projectCollaboratorSchema).default([]),

  colorTheme: projectColorThemeSchema,

  links: projectLinksSchema,

  blocks: z.array(projectBlockSchema).default([]),

  isFeatured: z.boolean().default(false),

  status: z.enum(["draft", "published"]).default("draft"),

  order: z.number().int().nonnegative().default(0),

  publishedAt: z.date().nullable().optional(),
});

// -----------------------------------------------------------------------------
// Create and update schemas
// -----------------------------------------------------------------------------

export const createProjectSchema = projectSchema;

export const updateProjectSchema = projectSchema
  .omit({ slug: true })
  .partial()
  .extend({
    slug: projectSchema.shape.slug.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
  });
