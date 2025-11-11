import * as z from "zod";
import { FundType } from "@/app/generated/prisma/enums";

export const fundCreateSchema = z.object({
  name: z
    .string({ error: "Fund name is required." })
    .min(2, "Fund name must be at least 2 characters long."),
  type: z.enum(FundType, {
    error: "Please select a fund type.",
  }),
  icon: z.string({ error: "Icon is required." }),
  balance: z
    .number({ error: "Initial balance is required." })
    .gt(0, { error: "Balance must be greater than 0." }),
  notes: z
    .string()
    .max(200, "Notes should be 200 characters or less.")
    .optional(),
});

export type FundCreateInputs = z.infer<typeof fundCreateSchema>;
