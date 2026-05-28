import { TeacherMapPin } from "@/components/teacher/TeacherMapPin";

export function TeacherMap() {
  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-ink-100 bg-[radial-gradient(circle_at_20%_20%,#d9f99d,transparent_20%),linear-gradient(135deg,#e0f2fe,#fef3c7)]">
      <div className="absolute left-[45%] top-[48%]">
        <span className="absolute inline-flex h-9 w-9 animate-pulse-ring rounded-full bg-navy-500" />
        <span className="relative block h-5 w-5 rounded-full border-4 border-white bg-navy-500 shadow-elevated" />
      </div>
      <div className="absolute left-[20%] top-[30%]"><TeacherMapPin tone="home" /></div>
      <div className="absolute left-[65%] top-[38%]"><TeacherMapPin tone="online" /></div>
      <div className="absolute left-[48%] top-[68%]"><TeacherMapPin tone="group" /></div>
    </div>
  );
}
