"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Cross-fades an image in once it finishes loading, so cards never pop in with a flash of empty space. */
export function FadeImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={cn(
        className,
        "transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
      )}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
    />
  );
}
