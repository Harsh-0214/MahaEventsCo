import type { ImageProps } from "next/image";
import type { ReactNode } from "react";
import { FadeImage } from "@/components/fade-image";
import { cn } from "@/lib/utils";

type FramedImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  wrapperClassName?: string;
  shape?: "arch" | "soft";
  children?: ReactNode;
};

/** Shared image treatment: a gold-ringed frame with corner accents, either arched or softly rounded. */
export function FramedImage({
  wrapperClassName,
  shape = "arch",
  className,
  children,
  ...props
}: FramedImageProps) {
  return (
    <div className={cn("group relative", wrapperClassName)}>
      <div
        className={cn(
          "relative h-full w-full overflow-hidden border border-(--color-gold-soft)/50 shadow-[0_20px_45px_rgba(41,39,31,0.18)]",
          shape === "arch" ? "rounded-t-[999px] rounded-b-3xl" : "rounded-2xl",
        )}
      >
        <FadeImage {...props} className={cn("object-cover", className)} />
        <div
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-(--color-ivory)/25"
          aria-hidden="true"
        />
        {children}
      </div>
      <span
        className="pointer-events-none absolute -left-2 -top-2 h-7 w-7 rounded-tl-md border-l-2 border-t-2 border-(--color-gold) opacity-80 transition-opacity duration-300 ease-out group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -right-2 -bottom-2 h-7 w-7 rounded-br-md border-b-2 border-r-2 border-(--color-gold) opacity-80 transition-opacity duration-300 ease-out group-hover:opacity-100"
        aria-hidden="true"
      />
    </div>
  );
}
