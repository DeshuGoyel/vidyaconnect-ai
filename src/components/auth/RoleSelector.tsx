import Link from "next/link";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const roles = [
  { href: "/signup?role=student", title: "Student", body: "Find teachers and book free demo classes.", icon: BookOpen },
  { href: "/signup?role=teacher", title: "Teacher", body: "Build your profile and manage students.", icon: GraduationCap },
  { href: "/signup?role=parent", title: "Parent", body: "Track progress, reports, and payments.", icon: Users }
];

export function RoleSelector() {
  return (
    <div className="grid gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        return (
          <Link key={role.title} href={role.href}>
            <Card className="flex items-center gap-4 transition hover:-translate-y-0.5 hover:shadow-elevated">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron-50 text-saffron-500">
                <Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-heading text-lg font-extrabold text-ink-800">{role.title}</span>
                <span className="text-sm font-semibold text-ink-400">{role.body}</span>
              </span>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
