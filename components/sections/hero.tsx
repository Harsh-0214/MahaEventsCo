import { siteConfig } from "@/lib/content";
import { HeroVideo } from "@/components/hero-video";
import { HeroSignature } from "@/components/hero-signature";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden bg-(--color-charcoal-deep)"
    >
      <HeroVideo />
      <div
        className="absolute inset-0 bg-gradient-to-t from-(--color-charcoal-deep)/85 via-(--color-charcoal-deep)/40 to-(--color-charcoal-deep)/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(28,26,22,0.55) 0%, rgba(28,26,22,0.25) 55%, rgba(28,26,22,0) 80%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-24 text-center lg:px-10">
        <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]">
          <span className="h-px w-6 bg-(--color-gold-soft)" />
          {siteConfig.tagline}
          <span className="h-px w-6 bg-(--color-gold-soft)" />
        </p>
        <HeroSignature />
        <h1 className="mt-4 font-(family-name:--font-display) text-4xl italic leading-[1.05] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
          Unforgettable moments,
          <br />
          beautifully styled.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:text-lg">
          {siteConfig.name} designs and styles weddings and marriage proposals
          with warmth, elegance, and hand-placed detail.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-(--color-olive) px-8 text-sm font-medium tracking-wide text-white transition-[background-color,transform] duration-150 ease-out hover:bg-(--color-olive-deep) active:scale-[0.97]"
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
