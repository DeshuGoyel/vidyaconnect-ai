export type UserRole = "student" | "teacher" | "parent";
export type SessionType = "home" | "online" | "group";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Teacher = {
  id: string;
  name: string;
  avatarUrl: string;
  locality: string;
  city: string;
  subject: string;
  subjects: string[];
  classesTaught: string[];
  sessionTypes: SessionType[];
  pricePerMonth: number;
  distanceKm: number;
  experienceYears: number;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  isVerified: boolean;
  freeDemos: number;
  bio: string;
};

export type Booking = {
  id: string;
  teacherId: string;
  subject: string;
  sessionType: SessionType;
  scheduledAt: string;
  status: BookingStatus;
  isFreeTrial: boolean;
  amount: number;
};
