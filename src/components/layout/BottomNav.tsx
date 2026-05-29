"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calendar, Home, Map, UserRound, Users, IndianRupee, Group } from "lucide-react";
import { cn } from "@/utils/helpers";

const studentItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/my-bookings", label: "Bookings", icon: Calendar },
  { href: "/groups", label: "Colony Groups", icon: Group },
  { href: "/dashboard", label: "Progress", icon: BarChart3 }
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

export function BottomNav() {
  const pathname = usePathname();

  // Determine active items based on active route prefix
  let items = studentItems;
  if (pathname?.startsWith("/parent")) {
    items = parentItems;
  } else if (pathname?.startsWith("/teacher")) {
    items = teacherItems;
  }

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-ink-100 bg-white/95 px-2 pt-2 shadow-elevated backdrop-blur md:hidden">
      <div className={cn(
        "mx-auto grid max-w-md",
        items.length === 5 ? "grid-cols-5" : "grid-cols-4"
      )}>
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-extrabold text-ink-400 transition",
                active && "scale-105 text-saffron-500"
              )}
              onClick={() => navigator.vibrate?.(8)}
            >
              <Icon className="h-5 w-5" />
              <span className="truncate max-w-[70px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
