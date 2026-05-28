import { NextResponse } from "next/server";
import { verifyPaymentSchema } from "@/lib/validations/payment.schema";

export async function POST(request: Request) {
  const parsed = verifyPaymentSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid verification payload", code: "VALIDATION_ERROR" }, { status: 400 });
  return NextResponse.json({ success: true });
}
