import { format } from "date-fns";
import { SessionType } from "@/types/database";

export function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatIndianDate(value: string | Date) {
  return format(new Date(value), "d MMMM yyyy");
}

export function sessionTypeLabel(value: SessionType) {
  const labels: Record<SessionType, string> = {
    home: "Home Visit",
    online: "Online",
    group: "Group"
  };
  return labels[value];
}

export function timeGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
