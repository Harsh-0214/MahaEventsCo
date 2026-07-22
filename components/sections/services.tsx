"use client";

import { services } from "@/lib/content";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-(--color-cream) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          {(revealed) => (
            <>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
                Services
              </p>
              <h2 className="font-(family-name:--font-serif) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
                <VerticalCutReveal
                  autoStart={revealed}
                  splitBy="words"
                  staggerDuration={0.05}
                  containerClassName="justify-center"
                  transition={{ type: "spring", stiffness: 170, damping: 24 }}
                >
                  {"Decor & styling, for every celebration."}
                </VerticalCutReveal>
              </h2>
              <SectionDivider />
            </>
          )}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delayMs={index * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
