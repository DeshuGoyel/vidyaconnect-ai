import { z } from "zod";

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Kripya valid 10 digit mobile number daalein");

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  locality: z.string().min(2, "Locality is required"),
  classOrSubject: z.string().min(1, "Class or subject is required")
});
