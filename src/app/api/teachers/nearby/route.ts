import { NextResponse } from "next/server";
import { teachers } from "@/data/mock";

export async function GET() {
  return NextResponse.json({ teachers });
}
