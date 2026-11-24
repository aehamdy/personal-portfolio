"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Experience } from "@/features/experience/types/experience.types";

type ExperienceItemProps = {
  experience: Experience;
  index: number;
  isReached: boolean;
};

function formatDate(date: string) {
  const [year, month] = date.split("-");
  if (!month) return year;

  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceItem({
  experience,
  index,
  isReached,
}: ExperienceItemProps) {
  const {
    position,
    company,
    employmentType,
    workMode,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    achievements,
    technologies,
  } = experience;

  const itemRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(isCurrent || index === 0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  // Reveal item when entering viewport
  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Cursor spotlight tracking on card
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <article
      ref={itemRef}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={[
        "group relative grid gap-6 pl-10 transition-all duration-700 ease-out md:grid-cols-[10rem_minmax(0,1fr)] md:gap-12 md:pl-0",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      ].join(" ")}
    >
      {/* Left Rail: Sticky Desktop Date & Index */}
      <div className="relative md:pt-2">
        {/* Timeline Node */}
        <span
          className={[
            "absolute left-[-2.05rem] top-2.5 flex size-3.5 items-center justify-center rounded-full border-2 border-background transition-all duration-500 md:right-[-1.95rem] md:left-auto",
            isCurrent || isReached
              ? "scale-110 bg-accent shadow-[0_0_12px_var(--color-accent)]"
              : "bg-muted",
          ].join(" ")}
        >
          {isCurrent && (
            <span className="absolute inset-0 animate-beacon rounded-full bg-accent" />
          )}
        </span>

        <div className="md:sticky md:top-28 md:text-right">
          <span className="inline-block font-mono text-xs tracking-widest text-accent">
            / {String(index + 1).padStart(2, "0")}
          </span>

          <h4 className="mt-1 font-heading font-bold text-3xl tracking-wide">
            {isCurrent ? "PRESENT" : formatDate(endDate ?? startDate)}
          </h4>

          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
            {formatDate(startDate)} —{" "}
            {isCurrent ? "Now" : formatDate(endDate ?? startDate)}
          </p>
        </div>
      </div>

      {/* Right Rail: Interactive Experience Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          "relative overflow-hidden rounded-2xl border bg-surface p-6 transition-all duration-300 md:p-8",
          isCurrent
            ? "border-accent/40 shadow-[0_0_40px_-15px_var(--color-accent)]"
            : "border-border hover:border-accent/40",
        ].join(" ")}
      >
        {/* Subtle Radial Hover Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(450px circle at ${spotlight.x}px ${spotlight.y}px, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 65%)`,
          }}
        />

        <div className="relative z-10">
          {/* Top Metadata Row */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
                {employmentType.replace("-", " ")}
              </span>

              {workMode && (
                <span className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-muted">
                  {workMode}
                </span>
              )}
            </div>

            {isCurrent && (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Currently active
              </span>
            )}
          </div>

          {/* Role & Company */}
          <h3 className="font-heading font-bold uppercase text-3xl sm:text-5xl group-hover:text-accent tracking-wide transition-colors duration-normal">
            {position}
          </h3>

          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-medium text-muted">
            <span className="text-foreground">{company}</span>
            <span className="text-border">•</span>
            <span>{location}</span>
          </p>

          {/* Summary */}
          <p className="mt-6 leading-relaxed text-muted">{description}</p>

          {/* Key Contributions (Expandable Accordion) */}
          {achievements.length > 0 && (
            <div className="mt-6 border-t border-border/70 pt-5">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between text-left text-sm font-semibold transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex items-center gap-2">
                  Key contributions
                  <span className="rounded-full bg-background px-2 py-0.5 font-mono text-xs text-muted">
                    {achievements.length}
                  </span>
                </span>

                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  {isExpanded ? "Collapse −" : "Expand +"}
                </span>
              </button>

              <div
                className={[
                  "grid transition-all duration-300 ease-in-out",
                  isExpanded
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-3">
                    {achievements.map((achievement, achievementIndex) => (
                      <li
                        key={achievementIndex}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {technologies.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
