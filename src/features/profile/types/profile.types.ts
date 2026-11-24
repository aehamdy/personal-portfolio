import z from "zod";
import {
  aboutSchema,
  profileImageSchema,
  profileSchema,
  resumeSchema,
  socialLinkSchema,
  updateProfileSchema,
} from "../schemas/profile.schema";

export type ProfileImage = z.infer<typeof profileImageSchema>;

export type Resume = z.infer<typeof resumeSchema>;

export type SocialLink = z.infer<typeof socialLinkSchema>;

export type About = z.infer<typeof aboutSchema>;

export type Profile = z.infer<typeof profileSchema>;

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
