import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <section className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="text">Text</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="accent-outline">Accent Outline</Button>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-3">
        <Button disabled>Disabled primary</Button>
        <Button variant="outline" disabled>
          Disabled outline
        </Button>
      </section>

      <section className="flex flex-wrap items-center gap-4">
        {/* Internal navigation */}
        <Link href="/projects">View projects</Link>

        {/* Accent link */}
        <Link href="/about" variant="accent">
          About me
        </Link>

        {/* External link */}
        <Link href="https://github.com/aehamdy" external>
          GitHub
        </Link>

        {/* Button-style link */}
        <Link href="/contact" variant="button">
          Get in touch
        </Link>
      </section>

      <section>
        <h1 className="font-display text-6xl font-bold">
          Building digital experiences.
        </h1>
        <Heading className="font-display uppercase text-6xl font-bold">
          Building digital experiences.
        </Heading>

        <p className="font-body text-base">
          I&apos;m a frontend developer passionate about building modern web
          applications.
        </p>

        <button className="font-ui">Explore my work</button>
      </section>
    </main>
  );
}
