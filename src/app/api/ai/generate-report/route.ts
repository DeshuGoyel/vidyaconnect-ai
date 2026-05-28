import { NextResponse } from "next/server";
import { z } from "zod";
import { latestReport } from "@/data/mock";

const schema = z.object({
  studentId: z.string(),
  weekStart: z.string(),
  weekEnd: z.string()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid report request", code: "VALIDATION_ERROR" }, { status: 400 });
  return NextResponse.json(latestReport);
}
