import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex min-h-11 w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-base text-(--color-text) transition-colors duration-150 ease-out placeholder:text-(--color-text-muted)/60 focus-visible:border-(--color-accent) focus-visible:outline-none aria-invalid:border-red-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
