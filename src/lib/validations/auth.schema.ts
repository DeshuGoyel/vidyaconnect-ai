import { z } from "zod";
import { phoneSchema } from "@/utils/validators";

export const sendOtpSchema = z.object({
  phone: phoneSchema
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: z.string().length(6)
});

export const signupSchema = z.object({
  name: z.string().min(2).max(100),
  phone: phoneSchema,
  role: z.enum(["student", "teacher", "parent"]),
  locality: z.string().min(2),
  city: z.string().min(2)
});
