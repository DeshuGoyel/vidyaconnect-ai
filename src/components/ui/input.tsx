import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-ink-100 bg-white px-4 text-sm font-semibold text-ink-800 placeholder:text-ink-300",
        className
      )}
      {...props}
    />
  );
}
