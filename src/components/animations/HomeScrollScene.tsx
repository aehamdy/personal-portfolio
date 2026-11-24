"use client";

import type { ReactNode } from "react";

type HomeScrollSceneProps = {
  hero: ReactNode;
  content: ReactNode;
};

export default function HomeScrollScene({
  hero,
  content,
}: HomeScrollSceneProps) {
  return (
    <div className="relative">
      {/* Fixed hero: stays in place while the page scrolls */}
      <div className="fixed inset-x-0 top-0 z-0 h-dvh">{hero}</div>

      {/* Empty first screen so the hero is visible before scrolling starts */}
      <div aria-hidden="true" className="h-dvh" />

      {/* Opaque content slides up over the hero */}
      <div className="relative z-20">{content}</div>
    </div>
  );
}
