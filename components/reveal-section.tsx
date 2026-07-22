"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { revealCopy } from "@/lib/content";

export function RevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      gsap.set([glowRef.current, line1Ref.current, line2Ref.current, ctaRef.current], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1400",
          pin: true,
          scrub: true,
        },
      });

      tl.fromTo(
        glowRef.current,
        { autoAlpha: 0, scale: 0.7 },
        { autoAlpha: 0.9, scale: 1.15, duration: 1, ease: "power3.inOut" },
        0,
      )
        .fromTo(
          line1Ref.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.inOut" },
          0.15,
        )
        .fromTo(
          line2Ref.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.inOut" },
          0.35,
        )
        .to({}, { duration: 0.35 })
        .fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.inOut" },
          ">-0.05",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative h-dvh overflow-hidden bg-(--color-plum)"
    >
      <Image
        src="/reveal.webp"
        alt="A letter board nestled in white roses and candlelight"
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-gold) opacity-0 blur-[70px]"
      />

      <div className="absolute left-1/2 top-[44%] flex w-[70%] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md text-center sm:top-1/2">
        <span
          ref={line1Ref}
          className="brand-mark text-2xl text-(--color-cream) opacity-0 sm:text-4xl"
        >
          Will You
        </span>
        <span
          ref={line2Ref}
          className="brand-mark text-2xl text-(--color-cream) opacity-0 sm:text-4xl"
        >
          Marry Me <span aria-hidden="true">♡</span>
        </span>
      </div>

      <a
        ref={ctaRef}
        href="#contact"
        className="absolute bottom-14 left-1/2 -translate-x-1/2 rounded-full bg-(--color-gold) px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-(--color-plum) opacity-0 transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] hover:scale-105 active:scale-95"
      >
        {revealCopy.cta}
      </a>
    </section>
  );
}
