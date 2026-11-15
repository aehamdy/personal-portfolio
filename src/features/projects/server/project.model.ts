import "server-only";

import mongoose, { Schema } from "mongoose";

// Shared embedded schemas

const projectImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
    width: Number,
    height: Number,
  },
  { _id: false },
);

const projectLinkSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["live-demo", "repo", "design", "other"],
      required: true,
    },
  },
  { _id: false },
);

// Project content block schemas

// Rich-text content is validated by our Zod schema before reaching MongoDB.
// Mixed allows us to preserve the structured JSON nodes.
const richTextBlockSchema = new Schema(
  {
    content: {
      type: [Schema.Types.Mixed],
      default: [],
    },
  },
  { _id: false },
);

const imageBlockSchema = new Schema(
  {
    image: {
      type: projectImageSchema,
      required: true,
    },
    caption: String,
  },
  { _id: false },
);

const galleryBlockSchema = new Schema(
  {
    images: {
      type: [projectImageSchema],
      required: true,
    },
    layout: {
      type: String,
      enum: ["grid", "masonry"],
      default: "grid",
    },
  },
  { _id: false },
);

const featureItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: String,
  },
  { _id: false },
);

const featuresBlockSchema = new Schema(
  {
    title: String,
    items: {
      type: [featureItemSchema],
      required: true,
    },
  },
  { _id: false },
);

const twoColumnBlockSchema = new Schema(
  {
    left: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    right: {
      type: [Schema.Types.Mixed],
      default: [],
    },
  },
  { _id: false },
);

const codeBlockSchema = new Schema(
  {
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    filename: String,
  },
  { _id: false },
);

// The base schema defines the discriminator key shared by all block types.
const projectBlockBaseSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["richText", "image", "gallery", "features", "twoColumn", "code"],
    },
  },
  {
    _id: false,
    discriminatorKey: "type",
  },
);

// Main project schema

const projectModelSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    overview: {
      type: String,
      default: "",
      trim: true,
    },

    thumbnail: {
      type: projectImageSchema,
      default: undefined,
    },

    gallery: {
      type: [projectImageSchema],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    links: {
      type: [projectLinkSchema],
      default: [],
    },

    blocks: {
      type: [projectBlockBaseSchema],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "projects",
  },
);

// Register the schemas for each supported block type.
const blocksPath = projectModelSchema.path(
  "blocks",
) as mongoose.Schema.Types.DocumentArray;

blocksPath.discriminator("richText", richTextBlockSchema);
blocksPath.discriminator("image", imageBlockSchema);
blocksPath.discriminator("gallery", galleryBlockSchema);
blocksPath.discriminator("features", featuresBlockSchema);
blocksPath.discriminator("twoColumn", twoColumnBlockSchema);
blocksPath.discriminator("code", codeBlockSchema);

// Indexes

// Efficiently retrieve published projects in their display order.
projectModelSchema.index({
  status: 1,
  order: 1,
  publishedAt: -1,
});

// Efficiently retrieve featured projects.
projectModelSchema.index({
  isFeatured: 1,
  status: 1,
  order: 1,
});

// Model

const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectModelSchema);

export default ProjectModel;
