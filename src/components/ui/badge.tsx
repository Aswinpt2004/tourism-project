import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-[var(--kerala-cream)] text-[var(--kerala-deep)] border border-[var(--kerala-sand)]",
        verified: "bg-[var(--kerala-cream)] text-[var(--kerala-deep)] gap-1",
        gold: "bg-[var(--kerala-gold)]/10 text-[var(--kerala-gold)]",
        outline: "border border-[var(--kerala-border)] text-stone-600",
        live: "bg-red-50 text-red-700 border border-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
