import Image from "next/image";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(20,16,10,0.25)] transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1.5">
      <Image
        src={service.image}
        alt={service.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.06]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-(--color-ink)/95 via-(--color-ink)/25 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6">
        <h3 className="font-(family-name:--font-serif) text-xl leading-snug text-(--color-ivory) sm:text-2xl">
          {service.title}
        </h3>
        <p className="max-w-[22ch] text-sm leading-relaxed text-(--color-ivory)/75 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-300 [@media(hover:hover)]:ease-out [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
          {service.description}
        </p>
        <span className="mt-1 h-px w-8 origin-left scale-x-100 bg-(--color-gold-bright) transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:w-14" />
      </div>
    </div>
  );
}
