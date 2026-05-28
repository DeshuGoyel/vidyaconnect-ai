import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ studentId: z.string() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid learning DNA request", code: "VALIDATION_ERROR" }, { status: 400 });
  return NextResponse.json({
    learningStyle: "visual",
    bestPerformanceTime: "evening",
    conceptSpeed: "moderate",
    bestTeachingStyle: "examples + practice",
    attentionSpan: "medium",
    peerLearningPreference: "small group"
  });
}
