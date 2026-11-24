import SectionHeading from "@/components/layout/SectionHeading";
import FAQItem from "./FAQItem";
import { getFAQ } from "../server/faq.service";
import { connection } from "next/server";

export default async function FAQSection() {
  await connection();

  const faq = await getFAQ();

  if (!faq || !faq.items.length) {
    return null;
  }

  const sortedItems = [...faq.items].sort((a, b) => a.order - b.order);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-4 px-2 md:p-4 lg:p-7 bg-accent"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-4 lg:gap-16 w-full max-w-container-main mx-auto py-10 md:py-14 px-5 md:px-7 bg-surface rounded-main overflow-hidden">
        <div>
          <SectionHeading
            support="FAQ"
            heading="FAQs"
            description={faq.description}
          />
        </div>

        <div className="w-full border-b border-border">
          {sortedItems.map((item, index) => (
            <FAQItem
              key={`${item.order}-${item.question}`}
              item={item}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
