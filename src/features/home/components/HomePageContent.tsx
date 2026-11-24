import HomeScrollScene from "@/components/animations/HomeScrollScene";
import Hero from "@/features/home/components/Hero";
import AboutSection from "../../about/components/AboutSection";
import SkillsSection from "@/features/skills/components/SkillsSection";
import FeaturedProjects from "@/features/projects/components/FeaturedProjects";
import { ServicesSection } from "@/features/services/components/ServicesSection";
import { connection } from "next/server";
import { getHomePageData } from "../server/home.service";
import { notFound } from "next/navigation";
import FAQSection from "@/features/faq/components/FAQSection";

export default async function HomePageContent() {
  await connection();

  const data = await getHomePageData();
  const { profile, services, projects, skills } = data;

  if (!profile) {
    notFound();
  }

  return (
    <HomeScrollScene
      hero={
        <section className="h-full">
          <Hero profile={profile} />
        </section>
      }
      content={
        <section className="mx-auto text-accent-contrast bg-surface-elevated rounded-t-main overflow-hidden">
          <AboutSection about={profile.about} actionLink />

          <ServicesSection services={services} />

          <FeaturedProjects projects={projects} />

          <SkillsSection skills={skills} />

          <FAQSection />
        </section>
      }
    />
  );
}
