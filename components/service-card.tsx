import Image from "next/image";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-(--color-surface) shadow-[0_1px_2px_rgba(43,38,33,0.06)] transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_16px_40px_rgba(43,38,33,0.12)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-(family-name:--font-serif) text-xl text-(--color-text)">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-(--color-text-muted)">
          {service.description}
        </p>
      </div>
    </div>
  );
}
