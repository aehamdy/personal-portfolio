import ProjectCard from "./ProjectCard";
import SectionHeading from "@/components/layout/SectionHeading";
import { connection } from "next/server";
import { getPublishedProjects } from "../server/project.service";
import { serializeProject } from "../utils/serialize-project";

async function ProjectsPageContent() {
  await connection();

  const projects = await getPublishedProjects();

  const serializedProjects = projects.map(serializeProject);

  return (
    <section className="mx-auto page-padding">
      <SectionHeading
        level="h1"
        support="Work"
        heading="PROJECTS & EXPERIMENTS"
        description="A collection of projects I've worked on, exploring ideas,
            solving problems, and building meaningful digital experiences."
      />

      {/* Project count */}
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <p className="text-sm text-muted">All projects</p>

        <p className="font-mono text-sm text-muted">
          {String(projects.length).padStart(2, "0")} Projects
        </p>
      </div>

      {/* Projects */}
      {serializedProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center text-center">
          <SectionHeading
            level="h2"
            heading="No projects available yet"
            description="I'm currently working on adding projects. Check back soon!"
          />
        </div>
      )}
    </section>
  );
}

export default ProjectsPageContent;
