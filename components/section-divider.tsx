import { cn } from "@/lib/utils";

export function SectionDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center gap-3 py-3",
        tone === "dark" ? "text-(--color-gold)" : "text-(--color-accent)/70",
      )}
    >
      <span className="h-px w-12 bg-current" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-px w-12 bg-current" />
    </div>
  );
}
