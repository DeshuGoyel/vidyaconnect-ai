import { NextResponse } from "next/server";
import { getTeachers } from "@/lib/supabase/queries";

export async function GET() {
  const teachersList = await getTeachers();
  return NextResponse.json({ teachers: teachersList });
}
