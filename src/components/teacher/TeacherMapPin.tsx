import { GraduationCap } from "lucide-react";

export function TeacherMapPin({ tone = "home" }: { tone?: "home" | "online" | "group" }) {
  const bg = tone === "home" ? "bg-saffron-500" : tone === "online" ? "bg-navy-500" : "bg-success";
  return (
    <span className={`grid h-10 w-10 place-items-center rounded-full border-4 border-white ${bg} text-white shadow-elevated`}>
      <GraduationCap className="h-5 w-5" />
    </span>
  );
}
