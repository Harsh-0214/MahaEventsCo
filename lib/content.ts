export const siteConfig = {
  name: "Maha Events Co",
  tagline: "Wedding & Proposal Decor",
  description:
    "Maha Events Co designs and styles weddings and marriage proposals with warmth, elegance, and hand-placed detail.",
  instagramHandle: "@mahaeventsco",
  instagramUrl: "https://www.instagram.com/mahaeventsco",
  email: "hello@mahaeventsco.com",
  phone: "(555) 012-0199",
  url: "https://mahaeventsco.com",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    slug: "wedding-decor",
    title: "Wedding Decor",
    description:
      "Full-scale styling for ceremonies and receptions — florals, drapery, table design, and lighting built around your story.",
    image: "/images/service-wedding.webp",
    alt: "Elegant wedding reception table styled with florals and candlelight",
  },
  {
    slug: "proposal-decor",
    title: "Proposal Decor",
    description:
      "Intimate, unforgettable setups designed around a single perfect question — florals, candles, and a moment worth remembering.",
    image: "/images/service-proposal.webp",
    alt: "Candlelit floral proposal arch at dusk",
  },
  {
    slug: "event-styling",
    title: "Event Styling",
    description:
      "Showers, engagements, and celebrations styled with the same care — backdrops, signage, and full-room design.",
    image: "/images/service-event.webp",
    alt: "Styled event backdrop with florals and soft lighting",
  },
];

export type GalleryImage = {
  id: string;
  image: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  { id: "g1", image: "/images/gallery-1.webp", alt: "Floral centerpiece with taper candles" },
  { id: "g2", image: "/images/gallery-2.webp", alt: "Ceremony arch styled with white florals" },
  { id: "g3", image: "/images/gallery-3.webp", alt: "Hand-tied bridal bouquet detail" },
  { id: "g4", image: "/images/gallery-4.webp", alt: "Reception table styled with gold and greenery" },
  { id: "g5", image: "/images/gallery-5.webp", alt: "Proposal setup with candles and petals" },
  { id: "g6", image: "/images/gallery-6.webp", alt: "Event backdrop with layered drapery" },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  event: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Maha understood our vision before we could even fully explain it. Every detail felt like us.",
    name: "Amara & Zayd",
    event: "Wedding",
  },
  {
    id: "t2",
    quote:
      "He proposed under the arch she built for us. I still get emotional thinking about it.",
    name: "Noor K.",
    event: "Proposal",
  },
  {
    id: "t3",
    quote:
      "Our reception looked like something out of a magazine. Guests are still talking about it.",
    name: "Priya S.",
    event: "Wedding",
  },
];

export const eventTypes = ["Wedding", "Proposal", "Engagement Party", "Other"] as const;
