type MatchTeacherInput = {
  subject: string;
  classGrade: string;
  budget: number;
  timing: string;
  location: string;
  sessionType: string;
  teacherDataFromSupabase: unknown[];
};

export async function matchTeachersWithClaude(input: MatchTeacherInput) {
  const response = await fetch("/api/ai/match-teacher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    throw new Error("AI matching abhi available nahi hai. Please try again.");
  }

  return response.json() as Promise<
    Array<{ teacherId: string; matchScore: number; reason: string; whyBestFit: string }>
  >;
}
