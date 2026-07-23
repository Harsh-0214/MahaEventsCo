import { testimonials } from "@/lib/content";
import { TestimonialCard } from "@/components/testimonial-card";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-(--color-cream) px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            Kind Words
          </p>
          <h2 className="font-(family-name:--font-display) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            From the couples we&rsquo;ve celebrated with.
          </h2>
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
