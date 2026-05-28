import { AlertLevel, SessionType, TeacherProfile } from "@/types/database";

export interface ApiError {
  error: string;
  code: string;
}

export interface MatchTeacherRequest {
  subject: string;
  classGrade: string;
  budget: number;
  timing: string;
  location: { lat: number; lng: number; locality: string };
  sessionType: SessionType;
  studentId: string;
}

export interface MatchTeacherResult {
  teacherId: string;
  matchScore: number;
  reason: string;
  whyBestFit: string;
  teacher?: TeacherProfile;
}

export interface StudentAlert {
  studentId: string;
  studentName: string;
  subject: string;
  level: AlertLevel;
  weakTopic: string;
  recommendedAction: string;
}
