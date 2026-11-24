import { Suspense } from "react";
import AboutPageFallback from "@/features/about/components/AboutPageFallback";
import AboutPageContent from "@/features/about/components/AboutPageContent";
import FAQSection from "@/features/faq/components/FAQSection";

function AboutPage() {
  return (
    <main className="pt-32">
      <Suspense fallback={<AboutPageFallback />}>
        <AboutPageContent />

        <FAQSection />
      </Suspense>
    </main>
  );
}

export default AboutPage;
