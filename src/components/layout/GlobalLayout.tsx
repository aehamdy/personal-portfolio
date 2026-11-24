import "server-only";

import { connection } from "next/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FooterReveal from "@/components/layout/FooterReveal";
import ContactSection from "@/features/contact/components/ContactSection";
import { ProfileProvider } from "@/features/profile/providers/ProfileProvider";
import { getProfile } from "@/features/profile/server/profile.service";
import SmoothScroll from "../animations/SmoothScroll";

type GlobalLayoutProps = {
  children: ReactNode;
};

export default async function GlobalLayout({ children }: GlobalLayoutProps) {
  await connection();

  const profile = await getProfile();

  if (!profile) {
    notFound();
  }

  return (
    <ProfileProvider profile={profile}>
      <SmoothScroll />
      <div className="relative isolate">
        <Header />

        <FooterReveal
          footer={
            <Footer>
              <ContactSection profile={profile} />
            </Footer>
          }
        >
          {children}
        </FooterReveal>
      </div>
    </ProfileProvider>
  );
}
