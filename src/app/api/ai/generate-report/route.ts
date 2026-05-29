import { NextResponse } from "next/server";
import { z } from "zod";
import { getLatestReport } from "@/lib/supabase/queries";

const schema = z.object({
  studentId: z.string(),
  weekStart: z.string(),
  weekEnd: z.string()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid report request", code: "VALIDATION_ERROR" }, { status: 400 });
  const report = await getLatestReport(parsed.data.studentId);
  return NextResponse.json(report);
}
