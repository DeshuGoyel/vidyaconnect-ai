import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

const MOCK_REPORT = {
  summary: "Great session on Quadratic Equations! Aryan showed strong understanding of factoring but needs more practice with the discriminant method.",
  mastered: ["Factoring simple quadratics", "Setting up word problems", "Understanding roots"],
  needsWork: ["Discriminant formula (b²-4ac)", "Complex quadratics with fractions", "Imaginary roots"],
  nextSession: "Focus on the quadratic formula with step-by-step practice. Recommend attempting 10 problems before next session.",
  score: 72,
  confidence: "Medium",
  recommended_topic: "Quadratic Formula Deep Dive",
  mock: true,
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic, notes, studentName, grade } = body as {
    topic: string;
    notes: string;
    studentName: string;
    grade: string;
  };

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-placeholder") {
    await new Promise((r) => setTimeout(r, 2500));
    return NextResponse.json({
      ...MOCK_REPORT,
      summary: `Great session on ${topic}! ${studentName} showed strong foundational understanding with room to grow.`,
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert education analyst. Generate insightful, encouraging post-session learning reports for students.`,
        },
        {
          role: "user",
          content: `Generate a learning report for ${studentName} (${grade}) after a session on "${topic}".
Session notes from teacher: "${notes}"

Return JSON with:
- summary: 2-sentence encouraging summary
- mastered: array of 3 concepts they understood well  
- needsWork: array of 2-3 concepts needing more practice
- nextSession: recommendation for next session (1 sentence)
- score: estimated understanding score 0-100
- confidence: "Low" | "Medium" | "High"
- recommended_topic: suggested next topic`,
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 600,
    });

    const result = JSON.parse(response.choices[0].message.content ?? "{}");
    return NextResponse.json({ ...result, mock: false });
  } catch (err) {
    console.error("Report API error:", err);
    return NextResponse.json({ ...MOCK_REPORT, mock: true });
  }
}
