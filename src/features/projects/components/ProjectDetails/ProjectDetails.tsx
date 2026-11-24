import type { SerializedProject } from "@/features/projects/types/project.types";
import ProjectHeader from "./ProjectHeader";
import ProjectOverview from "./ProjectOverview";
import ProjectGallery from "./ProjectGallery";
import ProjectFeatures from "./ProjectFeatures";
import ProjectChallenges from "./ProjectChallenges";
import FAQSection from "@/features/faq/components/FAQSection";

type ProjectDetailsProps = {
  project: SerializedProject;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <main className="">
      <section className="mx-auto max-w-7xl page-padding">
        <ProjectHeader project={project} />

        <ProjectOverview project={project} />

        {project.gallery?.length > 0 && (
          <ProjectGallery gallery={project.gallery} title={project.title} />
        )}

        {project.features?.length > 0 && (
          <ProjectFeatures features={project.features} />
        )}

        {project.challenges?.length > 0 && (
          <ProjectChallenges challenges={project.challenges} />
        )}
      </section>

      <FAQSection />
    </main>
  );
}
