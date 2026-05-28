import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  teacherId: z.string(),
  studentId: z.string(),
  subject: z.string(),
  sessionsPerWeek: z.number().int().min(1).max(7),
  preferredTiming: z.string()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid schedule request", code: "VALIDATION_ERROR" }, { status: 400 });

  return NextResponse.json({
    suggestions: [
      { day: "Monday", time: "5:00 PM", reason: "Student preference aur teacher availability dono match ho rahe hain." },
      { day: "Wednesday", time: "5:00 PM", reason: "Mid-week revision ke liye ideal slot." },
      { day: "Saturday", time: "10:00 AM", reason: "Weekend practice session ke liye low-conflict timing." }
    ]
  });
}
