"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, GraduationCap, User, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TopBar({ title = "VidyaConnect AI" }: { title?: string }) {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let homeUrl = "/home";
  let profileUrl = "/profile-setup";
  
  if (pathname?.startsWith("/parent")) {
    homeUrl = "/parent/dashboard";
    profileUrl = "/profile-setup";
  } else if (pathname?.startsWith("/teacher")) {
    homeUrl = "/teacher/dashboard";
    profileUrl = "/teacher/profile-setup";
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
      
      <div className="flex items-center gap-3">
        <button className="relative grid h-11 w-11 place-items-center rounded-full border border-ink-100 bg-white shadow-card">
          <Bell className="h-5 w-5 text-ink-700" />
          <Badge tone="saffron" className="absolute -right-1 -top-1 px-1.5 py-0.5">3</Badge>
        </button>

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-ink-100 bg-white shadow-card transition-colors hover:bg-ink-50"
          >
            <User className="h-5 w-5 text-ink-700" />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-ink-100 bg-white p-2 shadow-elevated z-50 animate-in fade-in slide-in-from-top-2">
              <Link 
                href={profileUrl}
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-ink-700 hover:bg-ink-50 transition-colors"
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
              <Link 
                href="/login"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-danger hover:bg-red-50 transition-colors mt-1"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
