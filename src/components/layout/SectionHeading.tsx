import { Heading } from "../ui/heading";

type SectionHeadingProps = {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  heading: string;
  support?: string;
  description?: string;
  headingDot?: boolean;
};

function SectionHeading({
  level,
  support,
  heading,
  description,
  headingDot = true,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mb-4 md:mb-16">
      {support && (
        <p className="font-mono uppercase text-accent text-xs tracking-wider">
          {support}
        </p>
      )}

      <Heading
        as={level ? level : "h2"}
        size="display-lg"
        weight="bold"
        className="uppercase text-foreground"
      >
        {heading}
        {headingDot && <span className="text-accent">.</span>}
      </Heading>

      {description && (
        <p className="max-w-2xl text-base md:text-lg text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
