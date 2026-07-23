import { services } from "@/lib/content";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-(--color-cream) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-(--color-gold)/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            <span className="h-px w-6 bg-(--color-gold)" />
            Services
            <span className="h-px w-6 bg-(--color-gold)" />
          </p>
          <h2 className="font-(family-name:--font-display) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            Decor for your defining moments.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delayMs={index * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
