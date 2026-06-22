"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-[var(--kerala-border)] bg-white px-4 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[var(--kerala-green)] focus:outline-none focus:ring-1 focus:ring-[var(--kerala-green)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
