import { Heading } from "@/components/ui/heading";
import type { Skill } from "../types/skill.types";
import SkillTag from "./SkillTag";

type SkillGroupProps = Pick<Skill, "category" | "skills"> & {
  index: number;
};

function SkillGroup({ category, skills, index }: SkillGroupProps) {
  return (
    <article className="group isolate relative flex flex-col gap-5 py-6 px-3 border-t border-border overflow-hidden">
      {/* Pass-through upward fill layer */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-top scale-y-0 bg-accent group-hover:origin-bottom group-hover:scale-y-100 transition-transform ease-in-out duration-700 pointer-events-none"
      />

      <div className="flex justify-between items-center gap-4">
        <Heading
          as="h3"
          className="font-heading font-semibold uppercase text-3xl md:text-5xl text-foreground group-hover:text-background tracking-wider md:tracking-wide transition-colors duration-slower"
        >
          {category}
        </Heading>

        <span className="font-mono text-xs text-muted group-hover:text-background transition-colors duration-normal">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <ul className="flex flex-wrap gap-2.5" aria-label={category}>
        {skills.map((skill) => (
          <li key={skill}>
            <SkillTag name={skill} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default SkillGroup;
