import Image from "next/image";
import type { SerializedProject } from "@/features/projects/types/project.types";
import { ActionLink } from "@/components/ui/ActionLink";
import ROUTES from "@/config/routes";

type ProjectCardProps = {
  project: SerializedProject;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group">
      <ActionLink
        href={`${ROUTES.projects}/${project.slug}`}
        aria-label={`View ${project.title} project`}
        variant="none"
        className="block"
      >
        {/* Project image */}
        <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-xl bg-surface">
          {project.thumbnail?.url ? (
            <Image
              src={project.thumbnail.url}
              alt={project.thumbnail.alt || project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-5xl text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}

          {project.isFeatured && (
            <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 font-mono text-xs text-foreground backdrop-blur-sm">
              Featured
            </span>
          )}

          <span className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-background text-foreground transition-transform duration-300 group-hover:rotate-45">
            ↗
          </span>
        </div>

        {/* Project information */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-heading uppercase font-semibold text-4xl md:text-4xl lg:text-5xl text-foreground group-hover:text-accent tracking-wide transition-colors">
              {project.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>

          <span className="shrink-0 font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {technology}
              </li>
            ))}

            {project.technologies.length > 4 && (
              <li className="px-2 py-1 text-xs text-muted">
                +{project.technologies.length - 4}
              </li>
            )}
          </ul>
        )}
      </ActionLink>
    </article>
  );
}

export default ProjectCard;
