import { Heading } from "@/components/ui/heading";
import { Service } from "../types/service.types";

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      key={service.title}
      className="border-t border-border py-8 md:py-10"
    >
      <p className="mb-5 font-mono text-sm text-accent">
        {String(service.order).padStart(2, "0")}.
      </p>

      <Heading
        as="h3"
        className="mb-4 font-display uppercase font-semibold text-4xl md:text-7xl tracking-wider lg:tracking-wide"
      >
        {service.title}
      </Heading>

      <p className="mb-6 max-w-xl leading-relaxed text-muted">
        {service.description}
      </p>

      <ul className="space-y-3">
        {service.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 text-sm leading-relaxed"
          >
            <span
              aria-hidden="true"
              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ServiceCard;
