import SectionHeading from "@/components/layout/SectionHeading";
import type { ProcessStep } from "../types/process.types";

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="px-6 md:px-10 py-24 md:py-32 text-foreground bg-surface"
    >
      <div className="mx-auto">
        {/* Section introduction */}
        <div className="max-w-3xl mb-16">
          <SectionHeading
            support="THE PROCESS"
            heading="FROM IDEA TO REALITY"
            description="Every great digital experience starts with a clear understanding of
            the problem. Here's how I approach turning ideas into
            meaningful products."
          />
        </div>

        {/* Process steps */}
        <ol className="border-t border-border">
          {steps.map((item) => (
            <li key={item.step}>
              <article className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-start gap-5 md:gap-10 py-8 md:py-10 border-b border-border">
                {/* Step number and label */}
                <div className="font-mono text-sm text-accent tracking-wide">
                  {String(item.step).padStart(2, "0")} / {item.label}
                </div>

                {/* Step content */}
                <div className="min-w-0">
                  <h3 className="mb-4 font-display font-semibold uppercase text-2xl md:text-4xl tracking-wide">
                    {item.title}
                  </h3>

                  <p className="max-w-2xl text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Keywords */}
                <ul className="flex md:justify-end flex-wrap gap-2 md:max-w-52 font-mono text-[10px] text-muted md:text-right tracking-wide">
                  {item.keywords.map((keyword, index) => (
                    <li key={keyword}>
                      {index > 0 && (
                        <span aria-hidden="true" className="me-2">
                          ·
                        </span>
                      )}
                      {keyword}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
