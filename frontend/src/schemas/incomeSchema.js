import { z } from "zod";

export const incomeSchema = z.object({
  date: z.string().min(1, "Provide the income date"),
  title: z.string().min(1, "Provide income title"),
  amount: z
    .string()
    .min(1, "Provide amount")
    .transform((val) => Number(val.replace(/\./g, "")))
    .refine((val) => !isNaN(val), "Amount must be a number")
    .refine((val) => val > 0, "Amount must be positive"),
  wallet: z.string().min(1, "Select your wallet"),
});
