import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().min(1, "Provide wallet name"),
  amount: z
    .string()
    .min(1, "Provide amount")
    .transform((val) => Number(val.replace(/\./g, "")))
    .refine((val) => !isNaN(val), "Amount must be a number")
    .refine((val) => val > 0, "Amount must be positive"),
});
