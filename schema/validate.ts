import { z } from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters!",
    })
    .max(40),
  email: z.string().email(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters!",
    })
    .max(40),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Your password must not be less than 8 characters!" })
    .max(16, { message: "Your password must not exceed 16 characters!" }),
});
