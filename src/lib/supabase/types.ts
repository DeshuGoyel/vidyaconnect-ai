export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: { Row: import("@/types/database").User; Insert: Partial<import("@/types/database").User>; Update: Partial<import("@/types/database").User> };
      teacher_profiles: { Row: import("@/types/database").TeacherProfile; Insert: Partial<import("@/types/database").TeacherProfile>; Update: Partial<import("@/types/database").TeacherProfile> };
      student_profiles: { Row: import("@/types/database").StudentProfile; Insert: Partial<import("@/types/database").StudentProfile>; Update: Partial<import("@/types/database").StudentProfile> };
      bookings: { Row: import("@/types/database").Booking; Insert: Partial<import("@/types/database").Booking>; Update: Partial<import("@/types/database").Booking> };
      ai_reports: { Row: import("@/types/database").AIReport; Insert: Partial<import("@/types/database").AIReport>; Update: Partial<import("@/types/database").AIReport> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: import("@/types/database").UserRole;
      session_type: import("@/types/database").SessionType;
      booking_status: import("@/types/database").BookingStatus;
      payment_status: import("@/types/database").PaymentStatus;
      alert_level: import("@/types/database").AlertLevel;
      verification_status: import("@/types/database").VerificationStatus;
    };
  };
}
