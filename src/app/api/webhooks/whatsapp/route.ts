import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const body = String(form.get("Body") ?? "").trim();
  const reply = body === "1"
    ? "Konsa subject? Aur aapki locality?"
    : "Namaste! Main VidyaConnect AI hoon. 1 Teacher dhundna, 2 Booking, 3 Progress report, 4 Help.";
  return new NextResponse(`<Response><Message>${reply}</Message></Response>`, {
    headers: { "Content-Type": "text/xml" }
  });
}
