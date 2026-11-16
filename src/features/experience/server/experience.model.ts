import "server-only";

import mongoose, { Schema } from "mongoose";

const experienceModelSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "freelance", "internship"],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    workMode: {
      type: String,
      enum: ["remote", "hybrid", "on-site"],
      required: true,
    },
    startDate: {
      type: String,
      required: true,
      match: /^\d{4}(-\d{2})?$/,
    },
    endDate: {
      type: String,
      default: null,
      match: [/^\d{4}(-\d{2})?$/, "Invalid end date format"],
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    achievements: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "experiences",
  },
);

experienceModelSchema.index({ order: 1 });

const Experience =
  mongoose.models.Experience ||
  mongoose.model("Experience", experienceModelSchema);

export default Experience;
