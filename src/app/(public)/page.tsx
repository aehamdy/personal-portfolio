import { Suspense } from "react";
import HomePageContent from "@/features/home/components/HomePageContent";
import HomePageFallback from "@/features/home/components/HomePageFallback";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Ahmed Essam | Frontend Developer",
  },
  description:
    "I'm Ahmed Essam, a Frontend Developer passionate about building modern, responsive, and user-friendly web experiences with React, Next.js, and TypeScript.",
  openGraph: {
    title: "Ahmed Essam | Frontend Developer",
    description:
      "Explore my portfolio, featured projects, technical skills, and experience building modern web applications.",
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <main className="relative flex flex-col justify-center items-center bg-background">
      <Suspense fallback={<HomePageFallback />}>
        <HomePageContent />
      </Suspense>
    </main>
  );
}
