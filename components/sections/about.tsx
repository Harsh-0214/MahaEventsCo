import { FramedImage } from "@/components/framed-image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-(--color-olive)/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-(--color-gold)/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal delayMs={80} className="order-1 lg:order-2">
          <FramedImage
            src="/images/about-portrait.webp"
            alt="Floral styling detail in ivory and gold tones"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            shape="soft"
            wrapperClassName="aspect-[4/5] w-full"
          />
        </Reveal>

        <Reveal className="order-2 lg:order-1">
          <p className="mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            <span className="h-px w-6 bg-(--color-gold)" />
            About Us
          </p>
          <h2 className="font-(family-name:--font-display) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            Styling moments that feel entirely yours.
          </h2>
          <p className="mt-6 max-w-lg border-l-2 border-(--color-olive)/30 pl-5 text-base leading-relaxed text-(--color-text-muted) sm:text-lg">
            Maha Events Co designs and styles weddings and marriage proposals
            with a warm, editorial touch. From the first vision board to the
            final petal, every detail is considered — so all you have to do is
            show up and celebrate.
          </p>
          <p className="mt-4 max-w-lg border-l-2 border-(--color-olive)/30 pl-5 text-base leading-relaxed text-(--color-text-muted) sm:text-lg">
            We handle the florals, the drapery, the lighting, and the hundred
            small decisions in between — so your moment looks as good as it
            feels.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
