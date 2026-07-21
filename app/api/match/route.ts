import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

const MOCK_MATCH = {
  topMatch: {
    teacherId: "t1",
    score: 97,
    reason: "Priya's IIT background and JEE specialisation perfectly match your Class 11 Maths needs. Her visual teaching style aligns with how you learn best.",
  },
  insights: [
    "Based on your evening preference, 3 teachers have slots at 5–7 PM",
    "Your struggle with concepts (not practice) suggests you need an explanation-first teacher",
    "Hindi medium instruction will help you grasp concepts 40% faster",
  ],
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { answers } = body as { answers: string[] };

  // If no API key, return mock response for demo
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "sk-placeholder") {
    await new Promise((r) => setTimeout(r, 1500)); // simulate latency
    return NextResponse.json({ ...MOCK_MATCH, mock: true });
  }

  try {
    const prompt = `You are an expert education counsellor. A student has answered 5 diagnostic questions:

1. Class/Grade: ${answers[0]}
2. Subject needing help: ${answers[1]}  
3. Learning style: ${answers[2]}
4. Preferred session time: ${answers[3]}
5. Biggest challenge: ${answers[4]}

Based on this, provide:
1. A match recommendation for the BEST teacher from our platform (pick from: Priya Sharma - Maths/JEE, Arjun Mehta - Science/NEET, Kavya Nair - English, Rahul Gupta - Physics/JEE, Sunita Verma - Hindi, Dev Krishnan - Coding)
2. A match score (0-100)
3. A personalised reason (2 sentences, warm and encouraging)
4. 3 personalised insights about the student's learning profile

Respond in JSON: { topMatch: { teacherId: string, teacherName: string, score: number, reason: string }, insights: string[] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const result = JSON.parse(response.choices[0].message.content ?? "{}");
    return NextResponse.json(result);
  } catch (err) {
    console.error("Match API error:", err);
    return NextResponse.json({ ...MOCK_MATCH, mock: true });
  }
}
