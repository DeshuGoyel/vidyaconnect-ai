"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calendar, Home, Map, UserRound, Users, IndianRupee, Group, LogOut, Settings, Sparkles } from "lucide-react";
import { cn } from "@/utils/helpers";
import { GraduationCap } from "lucide-react";

const studentItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/tutors", label: "Tutors", icon: Users },
  { href: "/my-bookings", label: "Bookings", icon: Calendar },
  { href: "/dashboard", label: "Progress", icon: BarChart3 },
  { href: "/doubt-solver", label: "AI Solver", icon: Sparkles }
];

const parentItems = [
  { href: "/parent/dashboard", label: "Dashboard", icon: Home },
  { href: "/parent/report", label: "AI Report", icon: BarChart3 },
  { href: "/parent/teachers", label: "Teachers", icon: Users },
  { href: "/parent/payments", label: "Payments", icon: IndianRupee }
];

const teacherItems = [
  { href: "/teacher/dashboard", label: "Dashboard", icon: Home },
  { href: "/teacher/schedule", label: "Schedule", icon: Calendar },
  { href: "/teacher/students", label: "Students", icon: Users },
  { href: "/teacher/earnings", label: "Earnings", icon: IndianRupee }
];

export function Sidebar() {
  const pathname = usePathname();

  let items = studentItems;
  let homeUrl = "/home";
  
  if (pathname?.startsWith("/parent")) {
    items = parentItems;
    homeUrl = "/parent/dashboard";
  } else if (pathname?.startsWith("/teacher")) {
    items = teacherItems;
    homeUrl = "/teacher/dashboard";
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white/80 backdrop-blur-xl border-r border-ink-100 shadow-elevated h-screen sticky top-0">
      <div className="p-6">
        <Link href={homeUrl} className="flex items-center gap-3 transition hover:opacity-80">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron-500 text-white shadow-card">
            <GraduationCap className="h-6 w-6" />
          </span>
          <span>
            <span className="block font-heading text-lg font-extrabold text-ink-800">VidyaConnect</span>
            <span className="block text-[10px] font-bold text-ink-400">Apni Gali Ka Best Teacher</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200",
                active 
                  ? "bg-saffron-50 text-saffron-600 shadow-sm" 
                  : "text-ink-500 hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-saffron-500" : "text-ink-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-ink-100 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-ink-500 transition-all duration-200 hover:bg-ink-50 hover:text-ink-900">
          <Settings className="h-5 w-5 text-ink-400" />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-danger transition-all duration-200 hover:bg-red-50 hover:text-red-600">
          <LogOut className="h-5 w-5 text-danger" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
