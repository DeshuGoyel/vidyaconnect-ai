export type UserRole = "student" | "teacher" | "parent";
export type SessionType = "home" | "online" | "group";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
export type PaymentStatus = "pending" | "success" | "failed" | "refunded";
export type AlertLevel = "good" | "watch" | "urgent";
export type VerificationStatus = "pending" | "verified" | "rejected";

export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  avatar_url: string | null;
  email: string | null;
  location_lat: number | null;
  location_lng: number | null;
  locality: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  is_active: boolean;
  fcm_token: string | null;
  whatsapp_opted_in: boolean;
  referral_code: string | null;
  referred_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeacherProfile {
  id: string;
  user?: Pick<User, "id" | "name" | "avatar_url" | "locality" | "city">;
  bio: string | null;
  tagline: string | null;
  experience_years: number;
  qualification: string | null;
  subjects: string[];
  classes_taught: string[];
  session_types: SessionType[];
  price_home: number | null;
  price_online: number | null;
  price_group: number | null;
  service_radius_km: number;
  total_students: number;
  total_classes: number;
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  aadhaar_verified: boolean;
  background_checked: boolean;
  verification_status: VerificationStatus;
  free_demo_count: number;
  is_available: boolean;
  is_featured: boolean;
  intro_video_url: string | null;
  demo_video_url: string | null;
  earnings_total: number;
  earnings_pending: number;
  created_at: string;
  updated_at: string;
  distance_km?: number;
  ai_match_score?: number;
}

export interface StudentProfile {
  id: string;
  class_grade: string | null;
  board: string | null;
  school_name: string | null;
  parent_id: string | null;
  target_exam: string | null;
  weak_subjects: string[];
  strong_subjects: string[];
  learning_style: string | null;
  preferred_timing: string | null;
  free_demos_remaining: number;
  vidya_points: number;
  streak_days: number;
  last_active: string;
}

export interface Booking {
  id: string;
  student_id: string;
  teacher_id: string;
  subject: string;
  class_grade: string | null;
  session_type: SessionType;
  scheduled_at: string;
  duration_minutes: number;
  status: BookingStatus;
  is_free_trial: boolean;
  amount: number;
  platform_fee: number;
  teacher_earning: number;
  payment_status: PaymentStatus;
  meeting_link: string | null;
  agora_channel: string | null;
  notes: string | null;
  is_rated: boolean;
  created_at: string;
}

export interface AIReport {
  id: string;
  student_id: string;
  parent_id: string | null;
  week_start: string;
  week_end: string;
  overall_score: number;
  attendance_percentage: number;
  summary_text: string;
  subject_scores: Record<string, number>;
  recommendations: Array<{ title: string; body: string }>;
  alerts: Array<{ level: AlertLevel; title: string; body: string }>;
  learning_dna: Record<string, string>;
  generated_at: string;
  is_sent: boolean;
}
