import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-(--color-olive)/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            <span className="h-px w-6 bg-(--color-gold)" />
            Contact
            <span className="h-px w-6 bg-(--color-gold)" />
          </p>
          <h2 className="font-(family-name:--font-display) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            Let&rsquo;s start planning.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-(--color-text-muted)">
            Share a few details about your celebration and we&rsquo;ll be in
            touch to talk through your vision.
          </p>
        </Reveal>

        <Reveal delayMs={80} className="mt-12">
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
