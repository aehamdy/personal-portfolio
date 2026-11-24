import ExperienceTimeline from "./ExperienceTimeline";
import type { Experience } from "../types/experience.types";
import SectionHeading from "@/components/layout/SectionHeading";

type ExperienceSectionProps = {
  experiences: Experience[];
};

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  if (!sortedExperiences.length) {
    return null;
  }

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-container-main bg-surface-elevated px-5 py-24 sm:px-8"
    >
      <div className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          support="CAREER"
          heading="Experience"
          description="A look at my professional journey, the teams I've collaborated
            with, and the products I've helped bring to life."
        />

        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-muted">
          <span className="size-2 rounded-full bg-accent" />
          <span>
            {String(sortedExperiences.length).padStart(2, "0")} ROLES LOGGED
          </span>
        </div>
      </div>

      <ExperienceTimeline experiences={sortedExperiences} />
    </section>
  );
}
