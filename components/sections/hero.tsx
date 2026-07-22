import Image from "next/image";
import { siteConfig } from "@/lib/content";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Magnetic } from "@/components/ui/magnetic";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden bg-(--color-blush)"
    >
      <Image
        src="/images/hero.svg"
        alt="Thin gold heart-shaped floral arch illustration with candlelight on a blush ground"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-(--color-blush-deep)/60 via-(--color-ivory)/10 to-(--color-ivory)/25"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-start px-6 pt-24 lg:px-10">
        <p className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
          <span className="h-px w-6 bg-(--color-gold)" />
          {siteConfig.instagramHandle}
        </p>
        <h1 className="font-(family-name:--font-serif) text-6xl italic leading-[1.05] text-(--color-ink) sm:text-7xl lg:text-8xl">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.09}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
          >
            {"Unforgettable events,"}
          </VerticalCutReveal>
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.09}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 160, damping: 22, delay: 0.35 }}
          >
            {"beautifully styled."}
          </VerticalCutReveal>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-(--color-ink-soft) sm:text-lg">
          Weddings, South Asian celebrations, and proposal setups — designed
          and styled with warmth, detail, and an editorial eye.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic range={90} intensity={0.25}>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-olive-dark) px-8 text-sm font-medium tracking-wide text-(--color-ivory) transition-[background-color,transform] duration-150 ease-out hover:bg-(--color-ink) active:scale-[0.97]"
            >
              Inquire Now
            </a>
          </Magnetic>
          <Magnetic range={90} intensity={0.25}>
            <a
              href="#gallery"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-(--color-ink)/30 px-8 text-sm font-medium tracking-wide text-(--color-ink) transition-[background-color,transform] duration-150 ease-out hover:bg-(--color-ink)/5 active:scale-[0.97]"
            >
              View Gallery
            </a>
          </Magnetic>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-(--color-ink)/60 transition-colors duration-200 hover:text-(--color-ink) sm:flex"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.4" />
          <circle className="animate-bounce" cx="8" cy="7" r="2" fill="currentColor" />
        </svg>
      </a>
    </section>
  );
}
