import type { Testimonial } from "@/lib/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-(--color-surface) p-8 shadow-[0_10px_30px_rgba(41,39,31,0.1)]">
      <span
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-(--color-olive) via-(--color-gold-soft) to-(--color-olive)"
        aria-hidden="true"
      />
      <span aria-hidden="true" className="font-(family-name:--font-display) text-6xl leading-none text-(--color-gold)">
        &ldquo;
      </span>
      <blockquote className="-mt-4 flex-1 text-base leading-relaxed text-(--color-text)">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-(--color-olive)/20 pt-4">
        <p className="text-sm font-medium text-(--color-text)">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-wide text-(--color-text-muted)">{testimonial.event}</p>
      </figcaption>
    </figure>
  );
}
