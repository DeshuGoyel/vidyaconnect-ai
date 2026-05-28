import { create } from "zustand";
import { SessionType } from "@/types/database";

interface BookingState {
  teacherId: string | null;
  sessionType: SessionType;
  date: string;
  slot: string;
  setDraft: (draft: Partial<Omit<BookingState, "setDraft">>) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  teacherId: null,
  sessionType: "home",
  date: "",
  slot: "",
  setDraft: (draft) => set(draft)
}));
