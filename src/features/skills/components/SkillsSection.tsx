import { Skill } from "../types/skill.types";
import SkillGroup from "./SkillGroup";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/layout/SectionHeading";

type SkillsSectionProps = {
  skills: Skill[];
};

export default async function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills.length) {
    return null;
  }

  return (
    <Container
      id="skills"
      ariaLabelledby="skills-heading"
      edges="primary"
      surface="secondary"
    >
      <SectionHeading
        support="SKILLS"
        heading="My Tech Stack"
        description="A collection of technologies and tools I use to build modern,
            responsive, and reliable digital experiences."
      />

      <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group, index) => (
          <SkillGroup
            key={String(group._id)}
            category={group.category}
            skills={group.skills}
            index={index + 1}
          />
        ))}
      </div>
    </Container>
  );
}
