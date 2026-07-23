import { FadeImage } from "@/components/fade-image";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(41,39,31,0.15)] transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1.5">
      <FadeImage
        src={service.image}
        alt={service.alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-(--color-charcoal-deep)/90 via-(--color-charcoal-deep)/20 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6">
        <h3 className="font-(family-name:--font-display) text-xl leading-snug text-white sm:text-2xl">
          {service.title}
        </h3>
        <p className="max-w-[26ch] text-sm leading-relaxed text-white/75 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-300 [@media(hover:hover)]:ease-out [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
          {service.description}
        </p>
        <span className="mt-1 h-px w-8 bg-(--color-gold-soft) transition-[width] duration-300 ease-out [@media(hover:hover)]:group-hover:w-14" />
      </div>
    </div>
  );
}
