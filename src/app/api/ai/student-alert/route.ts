import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ teacherId: z.string() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid alert request", code: "VALIDATION_ERROR" }, { status: 400 });

  return NextResponse.json({
    alerts: [
      { studentId: "1", studentName: "Rohan Singh", subject: "Maths", level: "watch", weakTopic: "Fractions", recommendedAction: "Assign mixed fraction drills." },
      { studentId: "2", studentName: "Amit Verma", subject: "Science", level: "urgent", weakTopic: "Attendance", recommendedAction: "Call parent today." }
    ]
  });
}
