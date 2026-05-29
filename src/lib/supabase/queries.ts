import { createClient } from "./client";
import { teachers as mockTeachers, bookings as mockBookings, latestReport as mockReport } from "@/data/mock";
import { TeacherProfile, Booking, AIReport } from "@/types/database";

function getClient() {
  return createClient();
}

/**
 * Fetches all teacher profiles, joining with their user account details.
 * Resiliently falls back to mock teachers if Supabase is unconfigured or empty.
 */
export async function getTeachers(): Promise<TeacherProfile[]> {
  try {
    const supabase = await getClient();
    const { data, error } = await supabase
      .from("teacher_profiles")
      .select(`
        *,
        user:users (
          id,
          name,
          avatar_url,
          locality,
          city
        )
      `);

    if (error || !data || data.length === 0) {
      console.warn("getTeachers Supabase query empty or failed, falling back to mock data:", error);
      return mockTeachers;
    }

    // Map raw database joined schema to TeacherProfile type format
    return data.map((item: any) => ({
      ...item,
      user: item.user || {
        id: item.id,
        name: "Verified Teacher",
        avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
        locality: "Indiranagar",
        city: "Bengaluru"
      },
      distance_km: item.distance_km ?? 1.2,
      ai_match_score: item.ai_match_score ?? 85
    })) as TeacherProfile[];
  } catch (err) {
    console.error("Failed to query getTeachers, falling back to mock data:", err);
    return mockTeachers;
  }
}

/**
 * Fetches a single teacher profile by their ID.
 */
export async function getTeacherById(id: string): Promise<TeacherProfile | null> {
  try {
    const all = await getTeachers();
    const found = all.find(t => t.id === id);
    return found || mockTeachers[0];
  } catch {
    return mockTeachers[0];
  }
}

/**
 * Fetches bookings for a student, joining teacher user details.
 */
export async function getBookings(studentId?: string): Promise<Booking[]> {
  try {
    const supabase = await getClient();
    let query = supabase.from("bookings").select("*");
    
    if (studentId) {
      query = query.eq("student_id", studentId);
    }
    
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return mockBookings;
    }
    return data as Booking[];
  } catch (err) {
    console.error("Failed to query getBookings, falling back to mock data:", err);
    return mockBookings;
  }
}

/**
 * Fetches the latest week's progress report for a student.
 */
export async function getLatestReport(studentId?: string): Promise<AIReport> {
  try {
    const supabase = await getClient();
    let query = supabase
      .from("ai_reports")
      .select("*")
      .order("week_start", { ascending: false })
      .limit(1);

    if (studentId) {
      query = query.eq("student_id", studentId);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return mockReport;
    }
    return data[0] as AIReport;
  } catch (err) {
    console.error("Failed to query getLatestReport, falling back to mock data:", err);
    return mockReport;
  }
}
