import type { HTMLAttributes } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingSize =
  | "display-lg"
  | "display-md"
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type HeadingWeight = "normal" | "medium" | "semibold" | "bold";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
};

const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "lg",
};

const sizeStyles: Record<HeadingSize, string> = {
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const weightStyles: Record<HeadingWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function Heading({
  as: Tag = "h2",
  size,
  weight = "bold",
  className,
  children,
  ...props
}: HeadingProps) {
  const classes = [
    "font-display leading-none tracking-[0.01em]",
    sizeStyles[size ?? defaultSizes[Tag]],
    weightStyles[weight],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
