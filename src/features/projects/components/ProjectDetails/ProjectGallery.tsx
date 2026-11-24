import Image from "next/image";
import type { SerializedProject } from "@/features/projects/types/project.types";

type ProjectGalleryProps = {
  gallery: NonNullable<SerializedProject["gallery"]>;
  title: string;
};

export default function ProjectGallery({
  gallery,
  title,
}: ProjectGalleryProps) {
  return (
    <section className="mb-24">
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Visuals / 02
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold">
          Project gallery
        </h2>
      </div>

      <div className="grid gap-6">
        {gallery.map((image, index) => (
          <figure key={`${image.url}-${index}`}>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-surface">
              <Image
                src={image.url}
                alt={image.alt || `${title} screenshot ${index + 1}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>

            {image.alt && (
              <figcaption className="mt-3 text-sm text-muted">
                {image.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
