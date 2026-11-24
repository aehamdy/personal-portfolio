"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { navItems } from "@/config/navItems";
import { usePageTransition } from "@/components/providers/PageTransitionProvider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  // label?: string;
};

function resolvePageLabel(href: string): string {
  const pathname = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

  // Match known navigation routes.
  const navItem = navItems.find((item) => item.to === pathname);

  if (navItem) return navItem.label;

  // Fall back to the final URL segment for dynamic routes.
  const lastSegment = pathname.split("/").filter(Boolean).pop();

  if (!lastSegment) return "Home";

  return decodeURIComponent(lastSegment)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function TransitionLink({
  href,
  onClick,
  target,
  ...props
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  return (
    <Link
      {...props}
      href={href}
      target={target}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          target === "_blank"
        ) {
          return;
        }

        event.preventDefault();
        navigate(href, resolvePageLabel(href));
      }}
    />
  );
}
