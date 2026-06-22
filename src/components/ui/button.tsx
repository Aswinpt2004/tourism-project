"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kerala-green)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--kerala-green)] text-white hover:bg-[var(--kerala-deep)] shadow-sm",
        secondary:
          "bg-white text-stone-800 border border-[var(--kerala-border)] hover:bg-stone-50",
        outline:
          "border border-[var(--kerala-green)] text-[var(--kerala-green)] hover:bg-[var(--kerala-cream)]",
        ghost: "text-stone-700 hover:bg-stone-100",
        gold:
          "bg-[var(--kerala-gold)] text-white hover:opacity-90 shadow-sm",
        dark: "bg-stone-900 text-white hover:bg-stone-800",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
