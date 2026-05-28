import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ studentId: z.string() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid dropout prediction request", code: "VALIDATION_ERROR" }, { status: 400 });
  return NextResponse.json({ risk: "low", score: 18, reason: "Attendance and progress are stable." });
}
