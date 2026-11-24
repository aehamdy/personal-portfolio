import type { Profile } from "@/features/profile/types/profile.types";
import Nav from "@/components/layout/Nav";
import { ActionLink } from "@/components/ui/ActionLink";
import ROUTES from "@/config/routes";
import Link from "next/link";

type ContactSectionProps = {
  profile: Profile;
};

function ContactSection({ profile }: ContactSectionProps) {
  const availability = profile.availability;

  return (
    <section className="flex flex-col justify-between h-[95dvh] lg:h-dvh pt-10 lg:pt-14 lg:px-10">
      <div className="flex flex-col justify-center items-center gap-10 md:gap-8 lg:gap-20 h-full">
        <h2 className="font-display font-bold uppercase text-5xl sm:text-6xl md:text-7xl lg:text-7xl leading-[0.95] tracking-wide">
          Have a project in mind?
        </h2>

        <div className="flex flex-col items-center gap-10 lg:gap-10 pb-6 lg:pb-0">
          <div className="relative">
            <h2 className="font-display font-bold uppercase text-center text-[30vh] md:text-[40vh] lg:text-[65vh] text-accent leading-65 md:leading-85 lg:leading-[0.70] tracking-wide lg:tracking-normal">
              Let&apos;s Talk
            </h2>

            <div className="absolute top-1/2 inset-s-1/2 translate-y-[-65%] -translate-x-1/2">
              <ActionLink
                href={ROUTES.contact}
                label="CONTACT"
                variant="huge"
                size="huge"
              />
            </div>
          </div>

          <Nav />
        </div>
      </div>

      {/* bottom footer */}
      <div className="border-t">
        <div className="flex justify-between items-center py-4 uppercase font-body text-xs">
          {availability && (
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />

              <span className="">Open to oppurtunities</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted">
            {profile.socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
