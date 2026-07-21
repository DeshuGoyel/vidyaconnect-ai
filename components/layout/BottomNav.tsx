"use client";

import { cn } from "@/lib/utils";
import { Home, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Only 3 demo-ready screens are active ─────────────────────────────────────
const NAV_ITEMS = [
  { href: "/home",     icon: Home,     label: "Home",    active: true  },
  { href: "/teachers", icon: Search,   label: "Discover", active: true  },
  { href: "/session",  icon: Sparkles, label: "AI Copilot", active: true },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-ink-100">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200",
                isActive ? "text-brand-500" : "text-ink-400 hover:text-ink-700"
              )}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.75}
                className={cn("transition-transform duration-200", isActive && "scale-110")}
              />
              <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
