import "server-only";

import { model, models, Schema } from "mongoose";
import type { Service } from "../types/service.types";

const serviceSchema = new Schema<Service>(
  {
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
    points: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length >= 1,
        message: "A service must have at least one point.",
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
    collection: "services",
  },
);

serviceSchema.index({ order: 1 });

const ServiceModel = models.Service || model<Service>("Service", serviceSchema);

export default ServiceModel;
