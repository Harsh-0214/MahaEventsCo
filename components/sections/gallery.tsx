import Image from "next/image";
import { galleryItems } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { cn } from "@/lib/utils";

const spanClasses: Record<NonNullable<(typeof galleryItems)[number]["span"]>, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

export function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-20 bg-(--color-bg) px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-(--color-accent-strong)">
            Gallery
          </p>
          <h2 className="font-(family-name:--font-serif) text-4xl italic leading-tight text-(--color-text) sm:text-5xl">
            A closer look at our work.
          </h2>
          <SectionDivider />
        </Reveal>

        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <Reveal
              key={item.id}
              delayMs={(index % 4) * 60}
              className={cn(
                "group relative overflow-hidden rounded-xl",
                spanClasses[item.span ?? "normal"],
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-(--color-espresso-deep)/85 to-transparent px-4 pb-3 pt-8"
                aria-hidden="true"
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-(--color-ivory)/90">
                  {item.caption}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
