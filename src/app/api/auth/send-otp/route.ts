import { NextResponse } from "next/server";
import { sendOtpSchema } from "@/lib/validations/auth.schema";

export async function POST(request: Request) {
  const parsed = sendOtpSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid phone number", code: "VALIDATION_ERROR" }, { status: 400 });
  return NextResponse.json({ success: true, message: "OTP sent" });
}
