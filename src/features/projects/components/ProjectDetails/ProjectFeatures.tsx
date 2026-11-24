import SectionHeading from "@/components/layout/SectionHeading";
import type { SerializedProject } from "@/features/projects/types/project.types";

type ProjectFeaturesProps = {
  features: SerializedProject["features"];
};

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <section className="mb-24">
      <SectionHeading
        level="h2"
        support="Functionality"
        heading="Key features"
        headingDot={false}
      />

      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {features.map((feature, index) => (
          <article
            key={`${feature.title}-${index}`}
            className="bg-background p-8"
          >
            <span className="font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="mt-5 text-xl font-semibold text-foreground">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
