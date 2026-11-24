import Link from "next/link";
import type { SerializedProject } from "@/features/projects/types/project.types";
import ROUTES from "@/config/routes";
import SectionHeading from "@/components/layout/SectionHeading";
import { ActionLink } from "@/components/ui/ActionLink";

type ProjectHeaderProps = {
  project: SerializedProject;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <section className="mb-20">
      <ActionLink
        href={ROUTES.projects}
        aria-label={`View ${project.title} project`}
        variant="none"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span>
        Back to projects
      </ActionLink>

      <SectionHeading
        level="h1"
        heading={project.title}
        description={project.summary}
        headingDot={false}
      />

      <div className="flex items-center flex-wrap gap-3 mt-6">
        {project.isFeatured && (
          <span className="rounded-full border border-accent/40 px-3 py-1 text-xs text-accent">
            Featured project
          </span>
        )}

        {project.tags.map((tag) => (
          <span
            key={tag}
            className="py-1 px-3 text-xs text-muted border border-border rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-8 border-y border-border py-6">
        {project.role && (
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
              My role
            </p>
            <p className="text-sm text-foreground">{project.role}</p>
          </div>
        )}

        {project.duration && (
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
              Duration
            </p>
            <p className="text-sm text-foreground">{project.duration}</p>
          </div>
        )}

        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
            Technologies
          </p>
          <p className="max-w-xl text-sm text-foreground">
            {project.technologies.join(" · ")}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.links.liveDemo && (
          <Link
            href={project.links.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Live project ↗
          </Link>
        )}

        {project.links.sourceCode && (
          <Link
            href={project.links.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
          >
            Source code ↗
          </Link>
        )}
      </div>
    </section>
  );
}
