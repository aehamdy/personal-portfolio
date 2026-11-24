import ExperienceSection from "@/features/experience/components/ExperienceSection";
import { getExperiences } from "@/features/experience/server/experience.service";
import AboutSection from "@/features/about/components/AboutSection";
import { ProcessSection } from "@/features/process/components/ProcessSection";
import { getProcessSteps } from "@/features/process/server/process.services";
import { getProfile } from "@/features/profile/server/profile.service";
import SkillsSection from "@/features/skills/components/SkillsSection";
import { getSkills } from "@/features/skills/server/skill.service";
import { notFound } from "next/navigation";
import { connection } from "next/server";

async function AboutPageContent() {
  // Tell Next.js that the following work belongs to the incoming request.
  await connection();

  const [profile, skills, processSteps, experiences] = await Promise.all([
    getProfile(),
    getSkills(),
    getProcessSteps(),
    getExperiences(),
  ]);

  if (!profile) {
    notFound();
  }

  return (
    <section className="">
      <AboutSection about={profile.about} />

      <SkillsSection skills={skills} />

      <ProcessSection steps={processSteps} />

      <ExperienceSection experiences={experiences} />
    </section>
  );
}

export default AboutPageContent;
