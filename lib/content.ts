export const siteConfig = {
  name: "MAHA Events",
  tagline: "Har Pal, styled by Maha.",
  description:
    "MAHA Events designs South Asian wedding & event decor and luxury proposal setups across Sacramento, the Bay Area, Central Valley, and Yuba City.",
  instagramHandle: "@mahaeventsco",
  instagramUrl: "https://www.instagram.com/mahaeventsco",
  email: "hello@mahaeventsco.com",
  url: "https://mahaeventsco.com",
  bookingStatus: "Now booking 2026–2027.",
  serviceAreas: ["Sacramento", "Bay Area", "Central Valley", "Yuba City"],
};

export const heroCopy = {
  eyebrow: "Maha Moments — a new way to propose.",
  headline: "MAHA EVENTS",
  sub: "Don't propose until you see this.",
};

export type StoryLine = {
  text: string;
  /** Progress (0–1) through the pinned journey at which this line is centered. */
  at: number;
};

export const journeyLines: StoryLine[] = [
  { text: "We design the moment…", at: 0.14 },
  { text: "Every candle placed by hand…", at: 0.4 },
  { text: "Every petal considered…", at: 0.64 },
  { text: "So all you have to do is ask.", at: 0.88 },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "proposals",
    title: "Proposals",
    description:
      "The easiest way to create a luxury proposal — florals, candlelight, and every detail planned so you can just ask.",
  },
  {
    slug: "wedding-decor",
    title: "Wedding Decor",
    description:
      "Full-scale styling for South Asian weddings — mandaps, stages, and reception decor built around your story.",
  },
  {
    slug: "rokha",
    title: "Rokha",
    description:
      "Intimate, richly styled rokha ceremonies — thaals, drapery, and floral detail for the moment families come together.",
  },
  {
    slug: "mehndi",
    title: "Mehndi",
    description:
      "Vibrant lounge seating, floral backdrops, and lighting designed for the night before the big day.",
  },
  {
    slug: "custom-signage",
    title: "Custom Signage",
    description:
      "Hand-lettered welcome signs, seating charts, and neon — the finishing details that make a setup feel entirely yours.",
  },
];

export const revealCopy = {
  cta: "Plan your Maha Moment.",
};
