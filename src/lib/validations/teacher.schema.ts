import { z } from "zod";

export const matchTeacherSchema = z.object({
  subject: z.string().min(2),
  classGrade: z.string().min(1),
  budget: z.number().int().positive(),
  timing: z.string().min(2),
  location: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    locality: z.string().min(2)
  }),
  sessionType: z.enum(["home", "online", "group"]),
  studentId: z.string().uuid()
});
