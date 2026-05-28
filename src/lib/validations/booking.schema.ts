import { z } from "zod";

export const bookingSchema = z.object({
  teacherId: z.string().uuid(),
  studentId: z.string().uuid(),
  subject: z.string().min(2),
  classGrade: z.string().min(1),
  sessionType: z.enum(["home", "online", "group"]),
  scheduledAt: z.string().datetime(),
  notes: z.string().max(500).optional()
});
