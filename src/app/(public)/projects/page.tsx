import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsPageContent from "@/features/projects/components/ProjectsPageContent";
import ProjectsPageFallback from "@/features/projects/components/ProjectsPageFallback";
import FAQSection from "@/features/faq/components/FAQSection";

export const metadata: Metadata = {
  title: "Projects | Ahmed Essam",
  description:
    "Explore my frontend development projects, featuring modern web applications built with React, Next.js, TypeScript, and other web technologies.",
  openGraph: {
    title: "Projects | Ahmed Essam",
    description:
      "Browse my selected projects and discover the technologies, features, and ideas behind each one.",
    type: "website",
  },
};

function ProjectsPage() {
  return (
    <main className="min-h-dvh">
      <Suspense fallback={<ProjectsPageFallback />}>
        <ProjectsPageContent />

        <FAQSection />
      </Suspense>
    </main>
  );
}

export default ProjectsPage;
