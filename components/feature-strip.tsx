import { specialties } from "@/lib/content";

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M7 0C7 3.5 10.5 7 14 7C10.5 7 7 10.5 7 14C7 10.5 3.5 7 0 7C3.5 7 7 3.5 7 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FeatureStrip() {
  return (
    <div className="border-y border-(--color-dark-border) bg-(--color-dark-bg-deep) py-5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 text-center lg:px-10">
        {specialties.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-(--color-dark-text-muted)"
          >
            <span className="text-(--color-gold-bright)">
              <SparkIcon />
            </span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
