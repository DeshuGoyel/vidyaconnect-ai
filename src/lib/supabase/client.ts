import { createBrowserClient } from "@supabase/ssr";
import { appConfig } from "@/constants/config";

export function createClient() {
  return createBrowserClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey);
}
