import "server-only";

import { model, models, Schema } from "mongoose";

import type { Project } from "../types/project.types";

// Reusable schemas
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
      maxlength: 300,
    },
    width: {
      type: Number,
      min: 1,
    },
    height: {
      type: Number,
      min: 1,
    },
  },
  { _id: false },
);

const projectLinksSchema = new Schema(
  {
    liveDemo: {
      type: String,
      default: null,
    },
    sourceCode: {
      type: String,
      default: null,
    },
    design: {
      type: String,
      default: null,
    },
    other: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

const projectColorThemeSchema = new Schema(
  {
    accent: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    primaryForeground: {
      type: String,
      required: true,
    },
    secondaryForeground: {
      type: String,
      required: true,
    },
    contrastForeground: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const projectFeatureSchema = new Schema(
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
  },
  { _id: false },
);

const projectChallengeSchema = new Schema(
  {
    problem: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    solution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
  },
  { _id: false },
);

const projectCollaboratorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    url: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

// Main project schema
const projectSchema = new Schema<Project>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    overview: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    thumbnail: {
      type: projectImageSchema,
      default: undefined,
    },

    gallery: {
      type: [projectImageSchema],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    features: {
      type: [projectFeatureSchema],
      default: [],
    },

    keyHighlights: {
      type: [String],
      default: [],
    },

    challenges: {
      type: [projectChallengeSchema],
      default: [],
    },

    collaborators: {
      type: [projectCollaboratorSchema],
      default: [],
    },

    colorTheme: {
      type: projectColorThemeSchema,
      required: true,
    },

    links: {
      type: projectLinksSchema,
      required: true,
    },

    blocks: {
      type: Schema.Types.Mixed,
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
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
      min: 0,
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

// -----------------------------------------------------------------------------
// Indexes
// -----------------------------------------------------------------------------

projectSchema.index({ status: 1, order: 1, publishedAt: -1 });
projectSchema.index({ status: 1, isFeatured: 1, order: 1 });

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

const ProjectModel = models.Project || model<Project>("Project", projectSchema);

export default ProjectModel;
