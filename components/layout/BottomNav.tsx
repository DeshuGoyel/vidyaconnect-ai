"use client";

import { cn } from "@/lib/utils";
import { Home, Search, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/home",     icon: Home,     label: "Home"     },
  { href: "/teachers", icon: Search,   label: "Discover" },
  { href: "/session",  icon: Sparkles, label: "AI Copilot"},
  { href: "/profile",  icon: User,     label: "Profile"  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200">
      <div className="flex items-center justify-around px-4 py-2 max-w-[700px] mx-auto min-h-[56px]">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== "/home" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-[8px] transition-colors min-h-[44px] min-w-[64px]",
                isActive ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.75}
                aria-hidden="true"
              />
              <span className={cn("text-[11px] leading-none", isActive ? "font-medium" : "font-normal")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
