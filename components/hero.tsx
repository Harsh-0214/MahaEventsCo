"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { heroCopy } from "@/lib/content";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set("[data-hero-in]", { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        "[data-hero-in]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.inOut",
          stagger: 0.12,
          delay: 0.2,
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-(--color-plum)"
    >
      <Image
        src="/frames/frame_0000.webp"
        alt="A candlelit proposal setup, white roses and eucalyptus receding into soft bokeh"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-(--color-plum)/55 via-(--color-plum)/25 to-(--color-plum)/75"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <p
          data-hero-in
          className="mb-6 max-w-md text-sm font-medium uppercase tracking-[0.3em] text-(--color-gold) opacity-0"
        >
          {heroCopy.eyebrow}
        </p>
        <h1
          data-hero-in
          className="brand-mark text-4xl text-(--color-cream) opacity-0 sm:text-6xl lg:text-7xl"
        >
          {heroCopy.headline}
        </h1>
        <p
          data-hero-in
          className="font-(family-name:--font-display) mt-6 text-2xl italic text-(--color-cream)/90 opacity-0 sm:text-3xl"
        >
          Har Pal, styled by Maha.
        </p>
        <p
          data-hero-in
          className="mt-4 max-w-sm text-sm text-(--color-cream)/70 opacity-0 sm:text-base"
        >
          {heroCopy.sub}
        </p>
      </div>

      <div
        data-hero-in
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-(--color-cream)/60 opacity-0"
      >
        <span className="text-xs uppercase tracking-[0.25em]">Scroll to begin</span>
        <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
          <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.2" />
          <circle className="animate-bounce" cx="7" cy="7" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
