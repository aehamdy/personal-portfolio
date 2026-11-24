import Image from "next/image";
import type { SerializedProject } from "@/features/projects/types/project.types";
import SectionHeading from "@/components/layout/SectionHeading";

type ProjectOverviewProps = {
  project: SerializedProject;
};

export default function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <section className="mb-24">
      {project.thumbnail?.url && (
        <div className="relative mb-16 aspect-video overflow-hidden rounded-2xl bg-surface">
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt || project.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      )}

      <SectionHeading
        level="h2"
        support="Overview"
        heading="About the project"
        description={project.overview && project.overview}
        headingDot={false}
      />

      {project.keyHighlights?.length > 0 && (
        <ul className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {project.keyHighlights.map((highlight, index) => (
            <li key={`${highlight}-${index}`} className="flex gap-3">
              <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-foreground">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
