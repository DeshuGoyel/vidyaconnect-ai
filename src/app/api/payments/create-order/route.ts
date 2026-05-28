import { NextResponse } from "next/server";
import { createOrderSchema } from "@/lib/validations/payment.schema";

export async function POST(request: Request) {
  const parsed = createOrderSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payment request", code: "VALIDATION_ERROR" }, { status: 400 });

  return NextResponse.json({
    orderId: `order_${Date.now()}`,
    amount: parsed.data.amount,
    currency: "INR",
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""
  });
}
