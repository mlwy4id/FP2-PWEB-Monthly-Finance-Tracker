import { z } from "zod";

export const walletSchema = z.object({
  name: z.string().min(1, "Provide wallet name"),
});
