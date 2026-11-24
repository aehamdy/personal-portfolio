import type { z } from "zod";
import {
  createProcessSchema,
  processSchema,
  updateProcessSchema,
} from "../schmeas/process.schema";

export type ProcessStep = z.infer<typeof processSchema>;

export type CreateProcessInput = z.input<typeof createProcessSchema>;

export type UpdateProcessInput = z.input<typeof updateProcessSchema>;
