import { z } from "zod";

export const expenseSchema = z.object({
  date: z.string().min(1, "Provide the expense date"),
  title: z.string().min(1, "Provide expense title"),
  amount: z
    .number({
        invalid_type_error: "Amount must be a number"
    })
    .positive("Amount must positive"),
  wallet: z.string().min(1, "Select your wallet"),
  category: z.string().min(1, "Select one category"),
});
