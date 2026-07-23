import { siteConfig } from "@/lib/content";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-(--color-border) bg-(--color-cream)">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <span className="font-(family-name:--font-display) text-2xl text-(--color-accent-strong)">
            {siteConfig.name}
          </span>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 text-sm text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-accent-strong)"
            >
              <InstagramIcon />
              {siteConfig.instagramHandle}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex min-h-11 items-center gap-2 text-sm text-(--color-text-muted) transition-colors duration-200 hover:text-(--color-accent-strong)"
            >
              <MailIcon />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <p className="text-xs text-(--color-text-muted)">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
