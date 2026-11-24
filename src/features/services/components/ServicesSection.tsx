import type { Service } from "../types/service.types";
import SectionHeading from "@/components/layout/SectionHeading";
import ServiceCard from "./ServiceCard";
import Container from "@/components/layout/Container";

type ServicesSectionProps = {
  services: Service[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <Container
      id="services"
      ariaLabelledby="services-heading"
      edges="primary"
      surface="secondary"
    >
      <div>
        <SectionHeading
          support="SERVICES"
          heading="What I Can Do For You"
          description="From thoughtful interfaces to scalable web applications, I help turn
            ideas into functional, engaging digital experiences."
        />

        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </Container>
  );
}
