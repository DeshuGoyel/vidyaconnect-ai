import { NextResponse } from "next/server";
import { z } from "zod";
import { getTeachers } from "@/lib/supabase/queries";
import { matchTeacherSchema } from "@/lib/validations/teacher.schema";

const resultSchema = z.array(z.object({
  teacherId: z.string(),
  matchScore: z.number().min(0).max(100),
  reason: z.string(),
  whyBestFit: z.string()
}));

export async function POST(request: Request) {
  const parsed = matchTeacherSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", code: "VALIDATION_ERROR", details: parsed.error.flatten() }, { status: 400 });
  }

  const allTeachers = await getTeachers();

  const ranked = allTeachers
    .filter((teacher) => teacher.subjects.some((subject) => subject.toLowerCase().includes(parsed.data.subject.toLowerCase())))
    .slice(0, 3)
    .map((teacher, index) => ({
      teacherId: teacher.id,
      matchScore: teacher.ai_match_score ?? (90 - index * 6),
      reason: "Yeh teacher aapke area, budget aur subject need ke hisaab se strong match hain.",
      whyBestFit: `${teacher.user?.name || "Teacher"} has ${teacher.experience_years}+ years experience and strong parent reviews.`,
      teacher
    }));

  return NextResponse.json(resultSchema.parse(ranked.map(({ teacher: _teacher, ...item }) => item)).map((item, index) => ({ ...item, teacher: ranked[index]?.teacher })));
}
