import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export const Badge = ({ children, className, variant = "default" }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        {
          "bg-muted text-text border border-border": variant === "default",
          "bg-accent/10 text-accent border border-accent/20": variant === "accent",
        },
        className
      )}
    >
      {children}
    </span>
  );
};