import NextLink from "next/link";
import type { ComponentProps } from "react";

type LinkVariant = "default" | "accent" | "muted" | "button";

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: LinkVariant;
  external?: boolean;
};

const variantStyles: Record<LinkVariant, string> = {
  default: "text-foreground hover:text-accent",

  accent: "text-accent hover:text-accent-hover",

  muted: "text-muted hover:text-foreground",

  button:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover",
};

export function Link({
  variant = "default",
  external = false,
  className,
  children,
  ...props
}: LinkProps) {
  const classes = [
    "transition-colors duration-200",
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NextLink
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </NextLink>
  );
}
