import mongoose, { Schema } from "mongoose";
import "server-only";

const profileImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false },
);

const resumeSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    fileName: { type: String, required: true },
  },
  { _id: false },
);

const socialLinkSchema = new Schema(
  {
    platform: {
      type: String,
      enum: ["github", "linkedin", "other"],
      required: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// MAIN PROFILE SCHEMA
const profileModelSchema = new Schema(
  {
    _id: { type: String, default: "main" },
    firstName: { type: String, required: true, trim: true, maxLength: 100 },
    lastName: { type: String, required: true, trim: true, maxLength: 100 },
    role: { type: String, required: true, trim: true, maxLength: 100 },
    about: {
      heading: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },
      paragraphs: {
        type: [String],
        required: true,
        validate: {
          validator: (paragraphs: string[]) => paragraphs.length > 0,
          message: "About section must contain at least one paragraph.",
        },
      },
    },
    headline: { type: String, required: true, trim: true, maxLength: 120 },
    tagline: { type: String, required: true, trim: true, maxLength: 200 },
    introduction: { type: String, required: true, trim: true, maxLength: 500 },
    biography: { type: [String], default: [] },
    profileImage: { type: profileImageSchema, default: undefined },
    location: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    resume: { type: resumeSchema, default: undefined },
    socialLinks: { type: [socialLinkSchema], default: [] },
    availability: {
      isAvailable: { type: Boolean, default: true },

      opportunities: {
        type: [
          {
            type: String,
            enum: ["full-time", "freelance", "internship"],
          },
        ],
        default: ["full-time"],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false, // Disable __v field
    collection: "profile", // Specifies the exact MongoDB collection where Mongoose should store the documents.
  },
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileModelSchema);

export default Profile;
