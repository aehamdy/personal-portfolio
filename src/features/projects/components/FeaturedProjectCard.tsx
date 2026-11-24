"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type {
  Project,
  SerializedProject,
} from "@/features/projects/types/project.types";
import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { ActionLink } from "@/components/ui/ActionLink";
import ROUTES from "@/config/routes";

type FeaturedProjectCardProps = {
  project: SerializedProject;
  index: number;
};

function resolveProjectAccent(colorTheme?: Project["colorTheme"]): string {
  if (!colorTheme) return "var(--color-accent)";
  return (
    colorTheme.accent ||
    Object.values(colorTheme).find(
      (val) => typeof val === "string" && val.startsWith("#"),
    ) ||
    "var(--color-accent)"
  );
}

function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  const { slug, title, summary, thumbnail, colorTheme, technologies } = project;

  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const projectAccent = resolveProjectAccent(colorTheme);
  const isReversed = index % 2 === 1;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ["--project-accent" as string]: projectAccent,
      }}
      className={[
        "group relative overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-700 ease-out hover:border-[color-mix(in_srgb,var(--project-accent)_45%,transparent)]",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      ].join(" ")}
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, color-mix(in srgb, var(--project-accent) 12%, transparent), transparent 65%)`,
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-12">
        {/* Visual Stage / Interactive Architecture Window */}
        <div
          className={[
            "relative flex flex-col justify-between overflow-hidden border-b border-border/80 bg-background/60 p-6 sm:p-8 lg:col-span-5 lg:border-b-0",
            isReversed
              ? "lg:order-2 lg:border-l lg:border-border/80"
              : "lg:border-r lg:border-border/80",
          ].join(" ")}
        >
          {/* Ambient Brand Mesh Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125"
            style={{
              background:
                "color-mix(in srgb, var(--project-accent) 18%, transparent)",
            }}
          />

          {/* Top Bar: Index + Tags */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            <span
              className="font-mono text-xs font-semibold tracking-widest"
              style={{ color: "var(--project-accent)" }}
            >
              PROJECT / {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Center Preview: Gallery Image OR Stylized App Window Mockup */}
          <div className="relative z-10 my-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
              {/* Mock Browser Chrome */}
              <div className="flex items-center justify-between border-b border-border/80 bg-background/80 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                </div>
                <span className="truncate font-mono text-[11px] text-muted">
                  /{slug}
                </span>
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: "var(--project-accent)" }}
                />
              </div>

              {thumbnail ? (
                <div className="aspect-16/10 w-full overflow-hidden">
                  <Image
                    src={thumbnail.url}
                    alt={thumbnail.alt}
                    width={800}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                /* Architectural Blueprint Preview when gallery is empty */
                <div className="relative space-y-4 p-5">
                  {/* Mini KPI / Architecture Blocks */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="rounded-xl border border-border/80 bg-background/60 p-3">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                        Role
                      </span>
                    </div>

                    <div className="rounded-xl border border-border/80 bg-background/60 p-3">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                        Timeline
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Tech Stack Pills */}
          <div className="relative z-10 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface/90 px-3 py-1 font-mono text-[11px] text-muted transition-colors duration-200 group-hover:border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Content & Interactive Case Study Dossier */}
        <div
          className={[
            "flex flex-col justify-between gap-4 lg:col-span-7 p-6 sm:p-8 lg:p-10 ",
            isReversed ? "lg:order-1" : "",
          ].join(" ")}
        >
          <div>
            {/* Title & Summary */}
            <Heading
              as="h3"
              className="font-heading uppercase font-bold text-3xl sm:text-8xl text-foreground group-hover:text-[(--project-accent)] tracking-wide transition-colors duration-normal"
            >
              {title}
            </Heading>

            <p className="mt-3 text-base leading-relaxed text-muted">
              {summary}
            </p>
          </div>

          <ActionLink
            href={`${ROUTES.projects}/${slug}`}
            label="View Project"
            variant="secondary"
            size="secondary"
          />
        </div>
      </div>
    </article>
  );
}

export default FeaturedProjectCard;
