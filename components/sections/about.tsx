import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent)">
            About
          </p>
          <h2 className="font-(family-name:--font-serif) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            Styling moments that feel entirely yours.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-(--color-text-muted) sm:text-lg">
            Maha Events Co designs and styles weddings, South Asian
            celebrations, and proposal setups with a warm, editorial touch.
            From the first vision board to the final petal, every detail is
            considered — so all you have to do is show up and celebrate.
          </p>
        </Reveal>

        <Reveal
          delayMs={100}
          className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl lg:order-2"
        >
          <Image
            src="/images/about-portrait.svg"
            alt="Maha, founder of Maha Events Co, styling a floral table arrangement"
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
