import { z } from "zod";

export const projectImageSchema = z.object({
  url: z.url(),
  publicId: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export const projectLinkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
  type: z.enum(["live-demo", "repo", "design", "other"]),
});

// Rich text schemas
const textNodeSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  marks: z.array(z.enum(["bold", "italic", "code"])).optional(),
});

const linkNodeSchema = z.object({
  type: z.literal("link"),
  href: z.url(),
  text: z.string(),
});

const inlineNodeSchema = z.discriminatedUnion("type", [
  textNodeSchema,
  linkNodeSchema,
]);

const paragraphNodeSchema = z.object({
  type: z.literal("paragraph"),
  children: z.array(inlineNodeSchema),
});

const headingNodeSchema = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3)]),
  children: z.array(inlineNodeSchema),
});

const listNodeSchema = z.object({
  type: z.enum(["bulletList", "orderedList"]),
  items: z.array(z.array(inlineNodeSchema)),
});

export const richTextContentSchema = z.array(
  z.discriminatedUnion("type", [
    paragraphNodeSchema,
    headingNodeSchema,
    listNodeSchema,
  ]),
);

// Project content blocks

const richTextBlockSchema = z.object({
  type: z.literal("richText"),
  content: richTextContentSchema,
});

const imageBlockSchema = z.object({
  type: z.literal("image"),
  image: projectImageSchema,
  caption: z.string().optional(),
});

const galleryBlockSchema = z.object({
  type: z.literal("features"),
  title: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: z.string().optional(),
      }),
    )
    .min(1),
});

const featuresBlockSchema = z.object({
  type: z.literal("features"),
  title: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        icon: z.string().optional(),
      }),
    )
    .min(1),
});

const twoColumnBlockSchema = z.object({
  type: z.literal("twoColumn"),
  left: richTextContentSchema,
  right: richTextContentSchema,
});

const codeBlockSchema = z.object({
  type: z.literal("code"),
  language: z.string().min(1),
  code: z.string().min(1),
  filename: z.string().optional(),
});

export const projectBlockSchema = z.discriminatedUnion("type", [
  richTextBlockSchema,
  imageBlockSchema,
  galleryBlockSchema,
  featuresBlockSchema,
  twoColumnBlockSchema,
  codeBlockSchema,
]);

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(120),
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  summary: z.string().trim().min(1).max(300),
  overview: z.string().trim().default(""),
  thumbnail: projectImageSchema.optional(),
  gallery: z.array(projectImageSchema).default([]),
  technologies: z.array(z.string().trim().min(1)).default([]),
  links: z.array(projectLinkSchema).default([]),
  blocks: z.array(projectBlockSchema).default([]),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  order: z.number().int().default(0),
  publishedAt: z.coerce.date().nullable().optional(),
});

export const createProjectSchema = projectSchema;

export const updateProjectSchema = projectSchema.partial();
