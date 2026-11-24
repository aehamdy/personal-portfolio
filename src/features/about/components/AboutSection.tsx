import Container from "@/components/layout/Container";
import { ActionLink } from "@/components/ui/ActionLink";
import ROUTES from "@/config/routes";

type AboutProps = {
  about: { heading: string; paragraphs: string[] };
  actionLink?: boolean;
};

function AboutSection({ about, actionLink = false }: AboutProps) {
  const { heading, paragraphs } = about;

  return (
    <Container
      id="about"
      ariaLabelledby="about-heading"
      edges="secondary"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full"
    >
      <div className="space-y-10 text-foreground">
        <p className="uppercase font-semibold text-2xl lg:text-4xl leading-10 lg:leading-12">
          {heading}
        </p>

        <div className="flex flex-col gap-6 text-lg lg:text-xl">
          {paragraphs.map((item, idx) => (
            <p key={idx} className="leading-8">
              {item}
            </p>
          ))}
        </div>
      </div>

      {actionLink && (
        <ActionLink
          href={ROUTES.about}
          label="About"
          variant="primary"
          className="mt-6"
        />
      )}
    </Container>
  );
}

export default AboutSection;
