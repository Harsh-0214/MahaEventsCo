import type { Testimonial } from "@/lib/content";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-(--color-dark-border) bg-(--color-dark-bg-deep) p-8">
      <span
        aria-hidden="true"
        className="font-(family-name:--font-serif) text-6xl leading-none text-(--color-gold-bright)"
      >
        &ldquo;
      </span>
      <blockquote className="-mt-4 flex-1 text-base leading-relaxed text-(--color-dark-text)">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-(--color-dark-border) pt-4">
        <p className="text-sm font-medium text-(--color-dark-text)">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-wide text-(--color-dark-text-muted)">
          {testimonial.event}
        </p>
      </figcaption>
    </figure>
  );
}
