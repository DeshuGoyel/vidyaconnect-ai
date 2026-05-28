"use client";

import { bookings } from "@/data/mock";

export function useBookings() {
  return { bookings, isLoading: false, error: null };
}
