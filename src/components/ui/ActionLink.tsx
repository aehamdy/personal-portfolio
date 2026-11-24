import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "./icon";
import TransitionLink from "./TransitionLink";

type ActionLinkVariant =
  | "outline"
  | "ghost"
  | "text"
  | "primary"
  | "secondary"
  | "huge"
  | "none";
type ActionLinkSize = "sm" | "md" | "lg" | "primary" | "secondary" | "huge";

type ActionLinkProps = ComponentProps<typeof Link> & {
  children?: ReactNode;
  href: string;
  label?: string;
  variant?: ActionLinkVariant;
  size?: ActionLinkSize;
  forwardArrow?: boolean;
};

const baseStyles = "group cursor-pointer transition-all duration-normal";

const variantStyles: Record<ActionLinkVariant, string> = {
  primary:
    "flex items-center gap-4 w-fit uppercase font-semibold text-2xl md:text-3xl text-foreground hover:tracking-wider bg-surface hover:bg-background rounded-5xl hover:scale-90 ",
  secondary:
    "flex items-center gap-4 w-fit uppercase font-semibold text-xl md:text-2xl text-foreground hover:tracking-widest bg-surface hover:bg-background rounded-5xl hover:scale-90 ",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface-hover",
  ghost: "bg-transparent text-foreground hover:bg-surface-hover",
  text: "rounded-none bg-transparent text-foreground underline-offset-4 hover:underline",
  huge: "flex items-center gap-4 w-fit uppercase font-normal text-2xl md:text-4xl lg:text-[10vh] hover:tracking-wider text-foreground bg-surface hover:bg-background rounded-5xl hover:scale-90 ",
  none: "",
};

const sizeStyles: Record<ActionLinkSize, string> = {
  sm: "py-1 px-3 text-xs",
  md: "py-2 px-4 text-sm",
  lg: "py-3 px-6 text-base",
  primary: "py-2 px-4",
  secondary: "py-2 px-4",
  huge: "py-3 md:py-5 px-5 md:px-7",
};

export function ActionLink({
  children,
  href,
  label,
  variant = "primary",
  size = "primary",
  className,
}: ActionLinkProps) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TransitionLink
      href={href}
      // label={label}
      // className="font-body uppercase font-medium text-sm lg:text-[1vw]"
      className={classes}
    >
      {children ?? label}

      {(variant === "primary" ||
        variant === "secondary" ||
        variant === "huge") && (
        <div className="flex items-center p-1 text-accent-contrast bg-accent rounded-full">
          <Icon
            name="arrow-forward"
            size={
              variant === "huge"
                ? "5xl"
                : variant === "primary" || variant === "secondary"
                  ? "xl"
                  : "md"
            }
          />
        </div>
      )}
    </TransitionLink>
  );
}
