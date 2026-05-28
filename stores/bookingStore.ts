import { create } from "zustand";
import { Booking, SessionType } from "@/types/domain";

type BookingDraft = {
  teacherId: string | null;
  sessionType: SessionType;
  date: string | null;
  time: string | null;
};

type BookingState = {
  draft: BookingDraft;
  bookings: Booking[];
  updateDraft: (draft: Partial<BookingDraft>) => void;
  addBooking: (booking: Booking) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  draft: { teacherId: null, sessionType: "home", date: null, time: null },
  bookings: [],
  updateDraft: (draft) => set((state) => ({ draft: { ...state.draft, ...draft } })),
  addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] }))
}));
