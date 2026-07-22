"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-(--color-dark-bg) px-6 py-24 text-(--color-dark-text) lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal
          delayMs={80}
          className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:order-2"
        >
          <Image
            src="/images/about-portrait.svg"
            alt="Botanical floral illustration in olive and ivory tones representing Maha's styling aesthetic"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal className="order-2 lg:order-1">
          {(revealed) => (
            <>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
                About Maha
              </p>
              <h2 className="font-(family-name:--font-serif) text-4xl italic leading-tight sm:text-5xl">
                <VerticalCutReveal
                  autoStart={revealed}
                  splitBy="words"
                  staggerDuration={0.05}
                  transition={{ type: "spring", stiffness: 170, damping: 24 }}
                >
                  {"Styling moments that feel entirely yours."}
                </VerticalCutReveal>
              </h2>
              <SectionDivider tone="dark" />
              <p className="mt-2 max-w-lg text-base leading-relaxed text-(--color-dark-text-muted) sm:text-lg">
                Maha Events Co designs and styles weddings, South Asian
                celebrations, and proposal setups with a warm, editorial touch.
                From the first vision board to the final petal, every detail
                is considered — so all you have to do is show up and
                celebrate.
              </p>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-(--color-dark-text-muted) sm:text-lg">
                Maha and her team handle the florals, the drapery, the
                lighting, and the hundred small decisions in between — so
                your day looks as good as it feels.
              </p>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
