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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-(--color-plum) px-6 py-20 text-(--color-cream)">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <span className="brand-mark text-2xl text-(--color-cream)">{siteConfig.name}</span>

        <a
          href="mailto:hello@mahaeventsco.com?subject=Maha%20Moment%20Inquiry"
          className="rounded-full bg-(--color-gold) px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-(--color-plum) transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] hover:scale-105 active:scale-95"
        >
          Inquire Now
        </a>

        <p className="font-(family-name:--font-display) text-xl italic text-(--color-gold)">
          {siteConfig.bookingStatus}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-(--color-cream)/70">
          {siteConfig.serviceAreas.map((area, i) => (
            <span key={area} className="flex items-center gap-3">
              {area}
              {i < siteConfig.serviceAreas.length - 1 && (
                <span aria-hidden="true" className="text-(--color-gold)/60">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-2 text-sm text-(--color-cream)/80 transition-colors duration-300 hover:text-(--color-gold)"
        >
          <InstagramIcon />
          {siteConfig.instagramHandle}
        </a>

        <p className="text-xs text-(--color-cream)/50">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
