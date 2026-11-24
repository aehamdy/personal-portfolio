import { Suspense, cache } from "react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import ProjectDetails from "@/features/projects/components/ProjectDetails/ProjectDetails";
import { getPublishedProjectBySlug } from "@/features/projects/server/project.service";
import { serializeProject } from "@/features/projects/utils/serialize-project";
import type { Metadata } from "next";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ahmed Essam",
      description: "The project you're looking for could not be found.",
    };
  }

  const title = `${project.title} | Ahmed Essam`;
  const description =
    project.shortDescription ||
    `Explore ${project.title}, a frontend development project by Ahmed Essam. Discover its features, technologies, and implementation details.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

// Reuse the project lookup between metadata and page rendering.
const getProject = cache((slug: string) => {
  return getPublishedProjectBySlug(slug);
});

async function ProjectDetailsContent({ params }: ProjectPageProps) {
  await connection();

  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={serializeProject(project)} />;
}

function ProjectDetailsFallback() {
  return (
    <main className="min-h-screen animate-pulse pb-24 pt-32">
      <div className="mx-auto max-w-7xl space-y-8 px-6">
        <div className="h-6 w-32 rounded bg-surface" />
        <div className="h-20 w-3/4 rounded bg-surface" />
        <div className="h-8 w-1/2 rounded bg-surface" />
        <div className="aspect-video rounded-xl bg-surface" />
      </div>
    </main>
  );
}

export default function ProjectDetailsPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<ProjectDetailsFallback />}>
      <ProjectDetailsContent params={params} />
    </Suspense>
  );
}
