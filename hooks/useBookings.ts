import { useBookingStore } from "@/stores/bookingStore";

export function useBookings() {
  return useBookingStore();
}
