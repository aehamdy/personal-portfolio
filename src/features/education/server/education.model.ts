import "server-only";

import mongoose, { Schema } from "mongoose";

const educationModelSchema = new Schema(
  {
    qualification: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      default: null,
      match: [/^\d{4}(-\d{2})?$/, "Invalid start date format"],
    },
    endDate: {
      type: String,
      default: null,
      match: [/^\d{4}(-\d{2})?$/, "Invalid end date format"],
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    achievements: {
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
    collection: "education",
  },
);

educationModelSchema.index({ order: 1 });

const Education =
  mongoose.models.Education ||
  mongoose.model("Education", educationModelSchema);

export default Education;
