import { cn } from "@/lib/utils";

export function SectionDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center gap-3 py-3",
        tone === "dark" ? "text-(--color-gold-bright)/70" : "text-(--color-accent)/60",
      )}
    >
      <span className="h-px w-10 bg-current" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 0C7 3.5 10.5 7 14 7C10.5 7 7 10.5 7 14C7 10.5 3.5 7 0 7C3.5 7 7 3.5 7 0Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-10 bg-current" />
    </div>
  );
}
