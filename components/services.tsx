"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { services } from "@/lib/content";

export function Services() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-service-card]",
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.inOut",
          stagger: 0.1,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="services"
      ref={rootRef}
      className="bg-(--color-cream) px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-sm font-medium uppercase tracking-[0.3em] text-(--color-gold)">
          What We Style
        </p>
        <h2 className="brand-mark text-center text-3xl text-(--color-plum) sm:text-4xl">
          Services
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => (
            <div
              key={service.slug}
              data-service-card
              className={
                reducedMotion
                  ? "flex flex-col rounded-xl border border-(--color-border) bg-(--color-cream-soft) p-6"
                  : "flex flex-col rounded-xl border border-(--color-border) bg-(--color-cream-soft) p-6 opacity-0"
              }
            >
              <h3 className="font-(family-name:--font-display) text-2xl text-(--color-plum)">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">
                {service.description}
              </p>
              <span className="mt-5 h-px w-8 bg-(--color-gold)" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
