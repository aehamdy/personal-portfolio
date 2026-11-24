import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  id: string;
  ariaLabelledby: string;
  edges?: "primary" | "secondary";
  surface?: "primary" | "secondary";
  className?: string;
};

function Container({
  children,
  id,
  ariaLabelledby,
  edges = "primary",
  surface = "primary",
  className,
}: ContainerProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`${edges === "primary" ? "primary-padding" : edges === "secondary" ? "secondary-padding" : ""} ${surface === "primary" ? "" : surface === "secondary" ? "text-foreground bg-surface" : ""} ${className}`}
    >
      <div className="w-full">{children}</div>
    </section>
  );
}

export default Container;
