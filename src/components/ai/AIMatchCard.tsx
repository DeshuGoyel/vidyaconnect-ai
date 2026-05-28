import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherMiniCard } from "@/components/teacher/TeacherMiniCard";
import { TeacherProfile } from "@/types/database";

export function AIMatchCard({ teacher, reason, top = false }: { teacher: TeacherProfile; reason: string; top?: boolean }) {
  return (
    <div className={`rounded-3xl bg-gradient-to-br from-ink-900 to-navy-900 p-5 text-white ${top ? "shadow-ai ring-2 ring-warning" : "shadow-card"}`}>
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-saffron-500/15 px-3 py-1 text-xs font-extrabold text-saffron-300">
          <Sparkles className="h-3.5 w-3.5" />
          AI Match
        </span>
        <span className="font-heading text-4xl font-extrabold">{teacher.ai_match_score}%</span>
      </div>
      <TeacherMiniCard teacher={teacher} />
      <details className="mt-4 rounded-2xl bg-white/8 p-4" open={top}>
        <summary className="cursor-pointer font-heading font-extrabold">Why This Teacher?</summary>
        <p className="mt-2 text-sm leading-6 text-white/75">{reason}</p>
      </details>
      <Button className="mt-4 w-full" variant="primary">
        <Link href={`/booking/${teacher.id}`}>Book Free Demo</Link>
      </Button>
    </div>
  );
}
