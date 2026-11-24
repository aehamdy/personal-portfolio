function FAQSectionFallback() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="grid lg:grid-cols-[0.8fr_1.2fr] gap-4 lg:gap-16 w-full max-w-container-main mx-auto py-10 md:py-14"
    >
      <div className="space-y-3">
        <div className="h-3 w-16 rounded bg-border animate-pulse" />
        <div className="h-10 w-32 rounded bg-border animate-pulse" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="h-12 border-b border-border animate-pulse"
          />
        ))}
      </div>
    </section>
  );
}

export default FAQSectionFallback;
