import z from "zod";

export const profileImageSchema = z.object({
  url: z.url(),
  publicId: z.string().min(1),
  alt: z.string().min(1),
});

export const resumeSchema = z.object({
  url: z.url(),
  publicId: z.string().min(1),
  fileName: z.string().min(1),
});

export const socialLinkSchema = z.object({
  platform: z.enum(["github", "linkedin", "other"]),
  label: z.string().trim().min(1),
  url: z.url(),
});

// Profile Schema
export const profileSchema = z.object({
  firstName: z.string().trim().min(1).max(100),

  lastName: z.string().trim().min(1).max(100),

  headline: z.string().trim().min(1).max(120),

  tagline: z.string().trim().min(1).max(200),

  introduction: z.string().trim().min(1).max(500),

  biography: z.array(z.string().trim().min(1)).default([]),

  profileImage: profileImageSchema.optional(),

  location: z.string().trim().min(1),

  email: z.email().trim(),

  resume: resumeSchema.optional(),

  socialLinks: z.array(socialLinkSchema).default([]),

  availability: z.object({
    isAvailable: z.boolean().default(true),

    opportunities: z
      .array(z.enum(["full-time", "freelance", "internship"]))
      .default(["full-time"]),
  }),
});

export const updateProfileSchema = profileSchema.partial();
