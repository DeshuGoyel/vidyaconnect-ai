import { Teacher } from "@/types/domain";

export const currentStudent = {
  id: "student-1",
  name: "Rohan",
  classGrade: "Class 8",
  locality: "Indiranagar",
  city: "Bengaluru",
  freeDemosRemaining: 3,
  vidyaPoints: 1240
};

export const teachers: Teacher[] = [
  {
    id: "teacher-1",
    name: "Ananya Sharma",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    locality: "Indiranagar",
    city: "Bengaluru",
    subject: "Mathematics",
    subjects: ["Mathematics", "Science"],
    classesTaught: ["Class 6", "Class 7", "Class 8", "Class 9"],
    sessionTypes: ["home", "online"],
    pricePerMonth: 3200,
    distanceKm: 0.8,
    experienceYears: 8,
    rating: 4.9,
    totalReviews: 184,
    totalStudents: 72,
    isVerified: true,
    freeDemos: 3,
    bio: "CBSE and ICSE math specialist focused on concept clarity, weekly tests, and confidence building."
  },
  {
    id: "teacher-2",
    name: "Imran Khan",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    locality: "Koramangala",
    city: "Bengaluru",
    subject: "Science",
    subjects: ["Physics", "Chemistry", "Science"],
    classesTaught: ["Class 8", "Class 9", "Class 10"],
    sessionTypes: ["online", "group"],
    pricePerMonth: 2800,
    distanceKm: 2.4,
    experienceYears: 6,
    rating: 4.7,
    totalReviews: 119,
    totalStudents: 54,
    isVerified: true,
    freeDemos: 3,
    bio: "Practical science teacher using experiments, visuals, and exam-focused revision plans."
  },
  {
    id: "teacher-3",
    name: "Meera Iyer",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    locality: "HAL 2nd Stage",
    city: "Bengaluru",
    subject: "English",
    subjects: ["English", "Social Studies"],
    classesTaught: ["Class 5", "Class 6", "Class 7", "Class 8"],
    sessionTypes: ["home", "group"],
    pricePerMonth: 2400,
    distanceKm: 1.2,
    experienceYears: 10,
    rating: 4.8,
    totalReviews: 206,
    totalStudents: 91,
    isVerified: true,
    freeDemos: 4,
    bio: "Language mentor for grammar, writing, spoken English, and school exam preparation."
  }
];

export const categories = ["Math", "Science", "English", "Hindi", "Coding", "Commerce"];

export const availableDates = [
  "2026-05-26",
  "2026-05-27",
  "2026-05-29",
  "2026-05-30",
  "2026-06-01"
];

export const timeSlots = [
  { label: "07:00 AM", available: true },
  { label: "08:00 AM", available: false },
  { label: "04:00 PM", available: true },
  { label: "05:00 PM", available: true },
  { label: "06:00 PM", available: false },
  { label: "07:00 PM", available: true }
];
