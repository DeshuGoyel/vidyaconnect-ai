import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ checked: 1, urgent: 0 });
}
