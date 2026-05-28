export interface PushPayload {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export async function sendPushNotification(payload: PushPayload) {
  if (!process.env.FIREBASE_ADMIN_SDK_KEY) return { skipped: true, payload };
  return { queued: true, payload };
}
