"use client";

import { testimonials } from "@/lib/content";
import { TestimonialCard } from "@/components/testimonial-card";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-(--color-dark-bg) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          {(revealed) => (
            <>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
                Kind Words
              </p>
              <h2 className="font-(family-name:--font-serif) text-4xl italic leading-tight text-(--color-dark-text) sm:text-5xl">
                <VerticalCutReveal
                  autoStart={revealed}
                  splitBy="words"
                  staggerDuration={0.04}
                  containerClassName="justify-center"
                  transition={{ type: "spring", stiffness: 170, damping: 24 }}
                >
                  {"From couples & families we’ve celebrated with."}
                </VerticalCutReveal>
              </h2>
              <SectionDivider tone="dark" />
            </>
          )}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delayMs={index * 70}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
