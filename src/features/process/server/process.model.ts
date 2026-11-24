import "server-only";

import { model, models, Schema } from "mongoose";
import type { ProcessStep } from "../types/process.types";

const processSchema = new Schema<ProcessStep>(
  {
    step: {
      type: Number,
      required: true,
      min: 1,
    },
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    keywords: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length >= 1,
        message: "A process step must have at least one keyword.",
      },
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "process_steps",
  },
);

processSchema.index({ order: 1 });
processSchema.index({ step: 1 }, { unique: true });

const ProcessModel =
  models.Process || model<ProcessStep>("Process", processSchema);

export default ProcessModel;
