import { Reveal } from "@/components/reveal";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-20 bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            Gallery
          </p>
          <h2 className="font-(family-name:--font-display) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            A closer look at our work.
          </h2>
        </Reveal>

        <div className="mt-14">
          <GalleryLightbox />
        </div>
      </div>
    </section>
  );
}
