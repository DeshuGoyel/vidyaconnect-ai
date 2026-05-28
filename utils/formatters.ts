import { format } from "date-fns";

export function formatRupee(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatIndianDate(date: string | Date) {
  return format(new Date(date), "d MMMM yyyy");
}

export function sessionTypeLabel(type: string) {
  if (type === "home") return "Home Visit";
  if (type === "online") return "Online";
  return "Group";
}
