import { NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/validations/auth.schema";

export async function POST(request: Request) {
  const parsed = verifyOtpSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid OTP", code: "VALIDATION_ERROR" }, { status: 400 });
  return NextResponse.json({ success: true, userId: "55555555-5555-4555-8555-555555555555" });
}
