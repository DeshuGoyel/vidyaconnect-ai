import { HTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "saffron" | "green" | "blue" | "gold" | "dark" | "red";
}

export function Badge({ className, tone = "saffron", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold",
        tone === "saffron" && "bg-saffron-500 text-white",
        tone === "green" && "bg-success text-white",
        tone === "blue" && "bg-navy-500 text-white",
        tone === "gold" && "bg-warning text-ink-900",
        tone === "dark" && "bg-ink-800 text-white",
        tone === "red" && "bg-danger text-white",
        className
      )}
      {...props}
    />
  );
}
