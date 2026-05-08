import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--ink)] px-5 py-3 text-white hover:bg-[#0f2741]",
        secondary:
          "border border-[var(--line)] bg-white px-5 py-3 text-[var(--ink)] hover:border-[var(--accent)] hover:bg-[var(--paper)]",
        ghost: "px-4 py-2 text-[var(--muted-ink)] hover:bg-white/70 hover:text-[var(--ink)]",
        danger: "bg-[#923b2f] px-5 py-3 text-white hover:bg-[#7c3127]",
      },
      size: {
        default: "",
        sm: "px-3 py-2 text-xs",
        lg: "px-6 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
