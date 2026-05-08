import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        neutral: "bg-[var(--paper)] text-[var(--muted-ink)]",
        accent: "bg-[var(--accent-soft)] text-[var(--ink)]",
        success: "bg-[#e6f5ef] text-[#2e6c55]",
        warning: "bg-[#fff0db] text-[#9a5d1f]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export function Badge({
  className,
  variant,
  children,
}: {
  className?: string;
  variant?: "neutral" | "accent" | "success" | "warning";
  children: React.ReactNode;
}) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
