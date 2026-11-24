"use client";

import { useEffect, useRef, useState } from "react";
import type { Experience } from "@/features/experience/types/experience.types";
import ExperienceItem from "./ExperienceItem";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling when the top of the timeline hits 65% of the viewport
      const startTrigger = windowHeight * 0.65;
      const totalDistance = rect.height;
      const scrolled = startTrigger - rect.top;

      const clamped = Math.min(Math.max(scrolled / totalDistance, 0), 1);
      setScrollProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Static Base Track */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-3 top-2 w-px bg-border md:inset-s-46"
      />

      {/* Animated Scroll-Driven Beam */}
      <div
        aria-hidden="true"
        style={{ height: `${scrollProgress * 100}%` }}
        className="pointer-events-none absolute left-3 top-2 w-0.5 translate-x-[-0.5px] bg-linear-to-b from-accent/40 via-accent to-accent transition-[height] duration-75 ease-out md:inset-s-46"
      >
        {/* Glowing Tip Following Scroll */}
        <span className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
      </div>

      <div className="space-y-16 md:space-y-20">
        {experiences.map((experience, index) => {
          // Determine if the animated beam has reached this item's approximate vertical threshold
          const itemThreshold =
            experiences.length > 1 ? index / experiences.length : 0;
          const isReached = scrollProgress >= itemThreshold * 0.85;

          return (
            <ExperienceItem
              key={
                experience.company
                  ? String(experience.company)
                  : `${experience.company}-${index}`
              }
              experience={experience}
              index={index}
              isReached={isReached}
            />
          );
        })}
      </div>
    </div>
  );
}
