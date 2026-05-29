"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TopBar({ title = "VidyaConnect AI" }: { title?: string }) {
  const pathname = usePathname();

  let homeUrl = "/home";
  if (pathname?.startsWith("/parent")) {
    homeUrl = "/parent/dashboard";
  } else if (pathname?.startsWith("/teacher")) {
    homeUrl = "/teacher/dashboard";
  }

  return (
    <header className="flex items-center justify-between">
      <Link href={homeUrl} className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-saffron-500 text-white shadow-card">
          <GraduationCap className="h-6 w-6" />
        </span>
        <span>
          <span className="block font-heading text-lg font-extrabold text-ink-800">{title}</span>
          <span className="block text-xs font-bold text-ink-400">Apni Gali Ka Best Teacher</span>
        </span>
      </Link>
      <button className="relative grid h-11 w-11 place-items-center rounded-full border border-ink-100 bg-white shadow-card">
        <Bell className="h-5 w-5 text-ink-700" />
        <Badge tone="saffron" className="absolute -right-1 -top-1 px-1.5 py-0.5">3</Badge>
      </button>
    </header>
  );
}
