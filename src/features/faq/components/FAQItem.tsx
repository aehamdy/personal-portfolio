import type { FAQItem as FAQItemType } from "../types/faq.types";

type FAQItemProps = {
  item: FAQItemType;
  index: number;
};

export default function FAQItem({ item, index }: FAQItemProps) {
  return (
    <details className="group border-t border-border py-6">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent">
              {String(index).padStart(2, "0")}
            </span>

            <span className="font-mono uppercase text-xs text-muted tracking-wider">
              {item.title}
            </span>
          </div>

          <h3 className="font-body font-normal text-md md:text-2xl text-foreground">
            {item.question}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className="flex justify-center items-center shrink-0 py-1 px-3 text-xl text-foreground border border-border rounded-full transition-all duration-300 group-open:rotate-180 group-open:border-accent group-open:text-accent"
        >
          +
        </span>
      </summary>

      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-normal group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-2 lg:ps-8 pt-5 font-body text-sm md:text-base text-muted leading-7">
            {item.answer}
          </p>
        </div>
      </div>
    </details>
  );
}
