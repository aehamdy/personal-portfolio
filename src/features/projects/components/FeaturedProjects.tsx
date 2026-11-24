import Container from "@/components/layout/Container";
import type { Project } from "@/features/projects/types/project.types";
import ROUTES from "@/config/routes";
import SectionHeading from "@/components/layout/SectionHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { serializeProject } from "../utils/serialize-project";

type FeaturedProjectsProps = {
  projects: Project[];
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Serialize MongoDB ObjectId & Date objects for Client Component safety
  const featuredProjects = [...projects]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(serializeProject);

  if (featuredProjects.length === 0) return null;

  return (
    <Container
      id="featured-projects"
      ariaLabelledby="featured-projects-heading"
      edges="primary"
      surface="primary"
      className="relative"
    >
      <SectionHeading
        support="SELECTED WORK"
        heading="Featured Projects"
        description="Production-grade applications built with scalable frontend architecture, clean user flows, and measurable business impact."
      />

      {/* Stacked Alternating Showcase */}
      <div className="space-y-10 md:space-y-16 lg:space-y-14">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectCard
            key={project._id}
            project={project}
            index={index}
          />
        ))}
      </div>

      <div className="mt-10">
        <ActionLink
          href={ROUTES.projects}
          label="Explore All Work"
          variant="secondary"
          size="secondary"
        />
      </div>
    </Container>
  );
}
