"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline focus-visible:outline-4 focus-visible:outline-saffron-500/30",
        variant === "primary" && "bg-saffron-500 text-white shadow-card hover:bg-saffron-600",
        variant === "secondary" && "border border-ink-200 bg-white text-ink-800 hover:bg-ink-50",
        variant === "dark" && "bg-ink-800 text-white hover:bg-ink-700",
        variant === "ghost" && "text-ink-700 hover:bg-saffron-50",
        size === "sm" && "h-9 px-3 text-sm",
        size === "md" && "h-12 px-5 text-sm",
        size === "lg" && "h-14 px-6 text-base",
        className
      )}
      {...props}
    />
  );
}
