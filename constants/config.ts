export const config = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "",
  googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  agoraAppId: process.env.EXPO_PUBLIC_AGORA_APP_ID ?? "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID ?? ""
};
