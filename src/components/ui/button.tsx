import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "text"
  | "accent"
  | "accent-outline";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-ui font-medium cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",

  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-hover",

  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface-hover",

  ghost: "bg-transparent text-foreground hover:bg-surface-hover",

  text: "bg-transparent text-foreground underline-offset-4 hover:underline",

  accent: "bg-accent text-white hover:bg-accent-hover",

  "accent-outline":
    "border border-accent bg-transparent text-accent hover:bg-accent/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
