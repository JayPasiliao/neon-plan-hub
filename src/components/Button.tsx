import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "soft";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-accent text-accent-foreground hover:bg-accent-hover shadow-glow": variant === "primary",
            "bg-transparent text-text-muted hover:text-text hover:bg-surface/50": variant === "ghost",
            "bg-surface text-text hover:bg-panel border border-border": variant === "soft",
          },
          {
            "h-8 px-3 text-xs rounded-md": size === "sm",
            "h-10 px-4 py-2 rounded-lg": size === "md",
            "h-12 px-6 py-3 text-lg rounded-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };