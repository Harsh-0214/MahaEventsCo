import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-(--color-border) bg-(--color-surface) px-4 py-3 text-base text-(--color-text) transition-colors duration-150 ease-out placeholder:text-(--color-text-muted)/60 focus-visible:border-(--color-accent) focus-visible:outline-none aria-invalid:border-red-500",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
