import z from "zod";
import {
  profileImageSchema,
  profileSchema,
  resumeSchema,
  socialLinkSchema,
  updateProfileSchema,
} from "../schemas/profile.schema";

export type ProfileImage = z.infer<typeof profileImageSchema>;

export type Resume = z.infer<typeof resumeSchema>;

export type SocialLink = z.infer<typeof socialLinkSchema>;

export type Profile = z.infer<typeof profileSchema>;

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
