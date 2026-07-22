import type { Testimonial } from "@/lib/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-(--color-surface) p-8 shadow-[0_1px_2px_rgba(43,38,33,0.06)]">
      <span
        aria-hidden="true"
        className="font-(family-name:--font-serif) text-6xl leading-none text-(--color-accent-soft)"
      >
        &ldquo;
      </span>
      <blockquote className="-mt-4 flex-1 text-base leading-relaxed text-(--color-text)">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-(--color-border)/50 pt-4">
        <p className="text-sm font-medium text-(--color-text)">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-wide text-(--color-text-muted)">
          {testimonial.event}
        </p>
      </figcaption>
    </figure>
  );
}
