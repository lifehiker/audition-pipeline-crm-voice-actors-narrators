import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)]",
        className,
      )}
      {...props}
    />
  );
}
