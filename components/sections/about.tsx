import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal
          delayMs={80}
          className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(41,39,31,0.15)] lg:order-2"
        >
          <Image
            src="/images/about-portrait.webp"
            alt="Floral styling detail in ivory and gold tones"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal className="order-2 lg:order-1">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            About Us
          </p>
          <h2 className="font-(family-name:--font-display) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            Styling moments that feel entirely yours.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-(--color-text-muted) sm:text-lg">
            Maha Events Co designs and styles weddings and marriage proposals
            with a warm, editorial touch. From the first vision board to the
            final petal, every detail is considered — so all you have to do is
            show up and celebrate.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-(--color-text-muted) sm:text-lg">
            We handle the florals, the drapery, the lighting, and the hundred
            small decisions in between — so your moment looks as good as it
            feels.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
