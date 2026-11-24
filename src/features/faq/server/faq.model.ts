import "server-only";

import { model, models, Schema } from "mongoose";
import type { FAQ } from "../types/faq.types";

const faqItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const faqSchema = new Schema<FAQ>(
  {
    key: {
      type: String,
      required: true,
      default: "main",
      unique: true,
      immutable: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    items: {
      type: [faqItemSchema],
      required: true,
      validate: {
        validator: (value: unknown[]) => value.length >= 1,
        message: "The FAQ section must have at least one item.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "faq",
  },
);

const FAQModel = models.FAQ || model<FAQ>("FAQ", faqSchema);

export default FAQModel;
