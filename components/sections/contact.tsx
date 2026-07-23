import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            Contact
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
