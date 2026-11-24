import ContactPageContent from "@/features/contact/components/ContactPageContent";
import ContactPageFallback from "@/features/contact/components/ContactPageFallback";
import FAQSection from "@/features/faq/components/FAQSection";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contact Me | Ahmed Essam",
  description:
    "Have a project in mind or an opportunity to discuss? Get in touch with Ahmed Essam to talk about frontend development, collaborations, or job opportunities.",
  openGraph: {
    title: "Contact Me | Ahmed Essam",
    description:
      "Let's connect! Reach out for frontend development opportunities, collaborations, or project inquiries.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh">
      <Suspense fallback={<ContactPageFallback />}>
        <ContactPageContent />

        <FAQSection />
      </Suspense>
    </main>
  );
}
