import { BookOpen, Clock, Flame, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Classes", value: "12", icon: BookOpen },
  { label: "Study Hours", value: "18", icon: Clock },
  { label: "Streak", value: "7", icon: Flame },
  { label: "VidyaPoints", value: "1240", icon: Trophy }
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-l-4 border-l-saffron-500">
            <Icon className="h-5 w-5 text-saffron-500" />
            <p className="mt-3 font-heading text-3xl font-extrabold text-ink-800">{stat.value}</p>
            <p className="text-xs font-extrabold text-ink-400">{stat.label}</p>
          </Card>
        );
      })}
    </div>
  );
}
