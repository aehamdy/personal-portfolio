import Link from "next/link";
import ContactForm from "./ContactForm";
import SectionHeading from "@/components/layout/SectionHeading";
import { connection } from "next/server";
import { getProfile } from "@/features/profile/server/profile.service";
import type { SocialLink } from "@/features/profile/types/profile.types";
import { notFound } from "next/navigation";

export default async function ContactPageContent() {
  await connection();

  const profile = await getProfile();

  if (!profile) {
    notFound();
  }

  const { email, location, socialLinks } = profile;

  const contactDetails = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      label: "Location",
      value: location,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto page-padding">
      {/* Page heading */}
      <div className="max-w-3xl mb-16">
        <p className="mb-4 font-medium uppercase text-sm text-accent tracking-[0.2em]">
          Contact
        </p>

        <h1 className="font-display text-7xl sm:text-7xl md:text-8xl leading-[0.9] tracking-wide">
          LET&apos;S BUILD
          <br />
          SOMETHING <span className="text-accent">GREAT.</span>
        </h1>

        <p className="max-w-xl mt-6 text-base sm:text-lg text-muted leading-relaxed">
          Have an idea, a project, or an opportunity in mind? I&apos;d love to
          hear about it. Tell me a little about what you&apos;re working on, and
          let&apos;s see how we can make it happen.
        </p>
      </div>

      {/* Contact content */}
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        {/* Contact information */}
        <aside className="flex flex-col justify-between gap-12">
          <div>
            <div className="mb-8">
              <span className="block mb-3 font-medium uppercase text-xs text-muted tracking-[0.18em]">
                Get in touch
              </span>

              <h2 className="font-display text-5xl md:text-6xl leading-[0.9] tracking-wide">
                HAVE A QUESTION?
                <br />
                LET&apos;S TALK.
              </h2>
            </div>

            <p className="max-w-md text-sm sm:text-base text-muted leading-relaxed">
              Whether you&apos;re looking for a frontend developer, have a
              collaboration opportunity, or simply want to connect, feel free to
              reach out.
            </p>
          </div>

          {/* Contact details */}
          <div className="space-y-8">
            {contactDetails.map((detail) => (
              <div key={detail.label}>
                <p className="mb-2 font-medium uppercase text-xs text-muted tracking-[0.15em]">
                  {detail.label}
                </p>

                {detail.href ? (
                  <Link
                    href={detail.href}
                    className="text-base sm:text-lg text-accent"
                  >
                    {detail.value}
                  </Link>
                ) : (
                  <p className="text-base sm:text-lg">{detail.value}</p>
                )}
              </div>
            ))}

            <div>
              <p className="mb-3 font-medium uppercase text-xs text-muted tracking-[0.15em]">
                Find me online
              </p>

              <div className="flex flex-wrap gap-5">
                {socialLinks.map((link: SocialLink) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-accent underline decoration-border underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="size-2 bg-emerald-400 rounded-full" />
              <p className="text-sm text-muted">
                Open to interesting opportunities and collaborations.
              </p>
            </div>
          </div>
        </aside>

        {/* Contact form */}
        <div className="py-10 px-6 sm:py-14 sm:px-10 bg-surface-elevated rounded-main">
          <div className="mb-10">
            <span className="block mb-3 font-medium uppercase text-xs text-muted tracking-[0.18em]">
              Contact form
            </span>

            <SectionHeading
              level="h3"
              heading="SEND ME A MESSAGE."
              headingDot={false}
            />

            <p className="mt-4 text-sm text-muted leading-relaxed">
              Fill out the form below and tell me a little about your project or
              inquiry.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
