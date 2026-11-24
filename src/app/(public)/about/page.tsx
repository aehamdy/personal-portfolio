import { Suspense } from "react";
import AboutPageFallback from "@/features/about/components/AboutPageFallback";
import AboutPageContent from "@/features/about/components/AboutPageContent";
import FAQSection from "@/features/faq/components/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Ahmed Essam",
  description:
    "Get to know Ahmed Essam, a Frontend Developer focused on creating accessible, responsive, and engaging web experiences using modern frontend technologies.",
  openGraph: {
    title: "About Me | Ahmed Essam",
    description:
      "Learn about my background, technical skills, experience, and passion for frontend development.",
    type: "website",
  },
};

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
