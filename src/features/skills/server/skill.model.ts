import "server-only";

import mongoose, { Schema } from "mongoose";

const skillModelSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (skills: string[]) =>
          skills.length > 0 && skills.every((skill) => skill.trim().length > 0),
        message: "A skill category must contain at least one skill.",
      },
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
    collection: "skills",
  },
);

skillModelSchema.index({ order: 1 });

const Skill =
  mongoose.models.Skill || mongoose.model("Skill", skillModelSchema);

export default Skill;
