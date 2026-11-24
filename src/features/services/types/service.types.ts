import type { z } from "zod";
import {
  createServiceSchema,
  serviceSchema,
  updateServiceSchema,
} from "../schemas/service.schema";

export type Service = z.infer<typeof serviceSchema>;

export type CreateServiceInput = z.input<typeof createServiceSchema>;

export type UpdateServiceInput = z.input<typeof updateServiceSchema>;
