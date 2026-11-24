import SectionHeading from "@/components/layout/SectionHeading";
import type { SerializedProject } from "@/features/projects/types/project.types";

type ProjectChallengesProps = {
  challenges: SerializedProject["challenges"];
};

export default function ProjectChallenges({
  challenges,
}: ProjectChallengesProps) {
  return (
    <section className="mb-24">
      <SectionHeading
        level="h2"
        support="Problem solving"
        heading="Challenges & solutions"
        headingDot={false}
      />

      <div className="space-y-12">
        {challenges.map((challenge, index) => (
          <article
            key={`${challenge.problem}-${index}`}
            className="grid gap-6 border-t border-border pt-8 md:grid-cols-2"
          >
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
                Challenge {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                {challenge.problem}
              </h3>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
                Solution
              </p>

              <p className="text-sm leading-relaxed text-muted md:text-base">
                {challenge.solution}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
