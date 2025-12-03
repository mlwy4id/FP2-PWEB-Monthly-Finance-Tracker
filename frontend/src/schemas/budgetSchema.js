import { z } from "zod";

export const budgetSchema = z.object({
  category: z.string().min(1, "Provide category name"),
  amount: z
    .string()
    .min(1, "Provide amount")
    .transform((val) => Number(val.replace(/\./g, "")))
    .refine((val) => !isNaN(val), "Amount must be a number")
    .refine((val) => val > 0, "Amount must be positive"),
});
