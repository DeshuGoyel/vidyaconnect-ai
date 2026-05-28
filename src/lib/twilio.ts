import twilio from "twilio";

export function getTwilioClient() {
  return twilio(process.env.TWILIO_ACCOUNT_SID ?? "", process.env.TWILIO_AUTH_TOKEN ?? "");
}

export async function sendWhatsAppMessage({ to, body }: { to: string; body: string }) {
  if (!process.env.TWILIO_WHATSAPP_FROM) return { skipped: true };
  return getTwilioClient().messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: `whatsapp:${to}`,
    body
  });
}
