import Image from "next/image";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden bg-(--color-espresso-deep)"
    >
      <Image
        src="/images/hero.svg"
        alt="Botanical floral arch illustration in gold and ivory tones on a deep espresso ground"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-(--color-espresso-deep)/90 via-(--color-espresso-deep)/40 to-(--color-espresso-deep)/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-start px-6 pt-24 lg:px-10">
        <p className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-(--color-gold-bright)">
          <span className="h-px w-6 bg-(--color-gold-bright)" />
          {siteConfig.instagramHandle}
        </p>
        <h1 className="font-(family-name:--font-serif) text-5xl italic leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          Unforgettable events,
          <br />
          beautifully styled.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
          Weddings, South Asian celebrations, and proposal setups — designed
          and styled with warmth, detail, and an editorial eye.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-gold-bright) px-8 text-sm font-medium tracking-wide text-(--color-espresso-deep) transition-[background-color,transform] duration-150 ease-out hover:bg-(--color-ivory) active:scale-[0.97]"
          >
            Inquire Now
          </a>
          <a
            href="#gallery"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-8 text-sm font-medium tracking-wide text-white transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 active:scale-[0.97]"
          >
            View Gallery
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors duration-200 hover:text-white sm:flex"
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
