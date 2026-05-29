import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { appConfig } from "@/constants/config";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      }
    }
  });
}
