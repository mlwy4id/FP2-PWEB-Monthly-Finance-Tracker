import { z } from "zod";

export const expenseSchema = z.object({
  date: z.string().min(1, "Provide the expense date"),
  title: z.string().min(1, "Provide expense title"),
  amount: z
    .string()
    .min(1, "Provide amount")
    .transform((val) => Number(val.replace(/\./g, "")))
    .refine((val) => !isNaN(val), "Amount must be a number")
    .refine((val) => val > 0, "Amount must be positive"),
  wallet: z.string().min(1, "Select your wallet"),
  category: z.string().min(1, "Select one category"),
});
