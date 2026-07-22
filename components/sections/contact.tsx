"use client";

import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-(--color-cream) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <Reveal className="hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(20,16,10,0.2)]">
              <Image
                src="/images/contact-side.svg"
                alt="Botanical floral arch illustration in olive tones"
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-(--color-text-muted)">
              Prefer Instagram? DM{" "}
              <a
                href="https://www.instagram.com/mahaeventsco"
                className="font-medium text-(--color-accent-strong) underline underline-offset-2"
              >
                @mahaeventsco
              </a>{" "}
              and we&rsquo;ll get back to you there too.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            {(revealed) => (
              <>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
                  Contact
                </p>
                <h2 className="font-(family-name:--font-serif) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
                  <VerticalCutReveal
                    autoStart={revealed}
                    splitBy="words"
                    staggerDuration={0.05}
                    transition={{ type: "spring", stiffness: 170, damping: 24 }}
                  >
                    {"Let’s start planning."}
                  </VerticalCutReveal>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-(--color-text-muted)">
                  Share a few details about your celebration and we&rsquo;ll
                  be in touch to talk through your vision.
                </p>
                <SectionDivider />
              </>
            )}
          </Reveal>

          <Reveal delayMs={80} className="mt-8">
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
