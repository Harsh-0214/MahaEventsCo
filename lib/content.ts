export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export type Specialty = {
  label: string;
};

export const specialties: Specialty[] = [
  { label: "Full Event Planning" },
  { label: "Decor & Floral Styling" },
  { label: "South Asian Celebrations" },
  { label: "Proposal Setups" },
  { label: "Custom Backdrops" },
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
      "Bespoke florals, drapery, and table styling for a day that feels entirely yours.",
    image: "/images/service-wedding.svg",
    alt: "Elegant wedding reception table styled with florals and soft candlelight",
  },
  {
    slug: "south-asian-celebrations",
    title: "South Asian Celebrations",
    description:
      "Vibrant, detail-rich styling for mehndi, sangeet, and nikkah ceremonies.",
    image: "/images/service-southasian.svg",
    alt: "Richly decorated mandap with marigold garlands and warm lighting",
  },
  {
    slug: "proposal-setups",
    title: "Proposal Setups",
    description:
      "Intimate, unforgettable scenes designed around a single perfect question.",
    image: "/images/service-proposal.svg",
    alt: "Candlelit proposal setup with floral arch at dusk",
  },
  {
    slug: "event-styling-backdrops",
    title: "Event Styling & Backdrops",
    description:
      "Statement backdrops and full-room styling for showers, birthdays, and galas.",
    image: "/images/service-backdrop.svg",
    alt: "Floral backdrop wall styled for an event photo moment",
  },
];

export type GalleryItem = {
  id: string;
  image: string;
  alt: string;
  caption: string;
  span?: "tall" | "wide" | "normal";
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: "/images/gallery-1.svg", alt: "Ivory and olive floral centerpiece on a reception table", caption: "Reception Centerpiece", span: "tall" },
  { id: "g2", image: "/images/gallery-2.svg", alt: "Draped ceremony arch with cascading greenery", caption: "Ceremony Arch", span: "normal" },
  { id: "g3", image: "/images/gallery-3.svg", alt: "Close-up of hand-tied bridal bouquet in warm tones", caption: "Bridal Bouquet", span: "normal" },
  { id: "g4", image: "/images/gallery-4.svg", alt: "Sangeet stage styled with marigold and fairy lights", caption: "Sangeet Stage", span: "wide" },
  { id: "g5", image: "/images/gallery-5.svg", alt: "Place setting detail with gold flatware and taper candles", caption: "Table Styling", span: "normal" },
  { id: "g6", image: "/images/gallery-6.svg", alt: "Mehndi lounge seating styled with cushions and lanterns", caption: "Mehndi Lounge", span: "tall" },
  { id: "g7", image: "/images/gallery-7.svg", alt: "Proposal picnic setup styled with candles and petals", caption: "Proposal Setup", span: "normal" },
  { id: "g8", image: "/images/gallery-8.svg", alt: "Nikkah stage backdrop with layered drapery", caption: "Nikkah Backdrop", span: "normal" },
  { id: "g9", image: "/images/gallery-9.svg", alt: "Dessert table styled with florals and neutral linens", caption: "Dessert Table", span: "wide" },
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
      "Maha understood our vision before we could even fully explain it. Every detail, from the florals to the lighting, felt like us.",
    name: "Amara & Zayd",
    event: "Wedding, 2025",
  },
  {
    id: "t2",
    quote:
      "Our sangeet looked like something out of a magazine. Guests are still talking about the stage and the marigold arch.",
    name: "Priya S.",
    event: "Sangeet & Mehndi",
  },
  {
    id: "t3",
    quote:
      "He proposed under the arch she built for us and I still get emotional thinking about it. Flawless from start to finish.",
    name: "Noor K.",
    event: "Proposal Setup",
  },
];

export const eventTypes = [
  "Wedding",
  "Mehndi / Sangeet",
  "Nikkah",
  "Proposal",
  "Other",
] as const;

export const siteConfig = {
  name: "Maha Events Co",
  tagline: "Unforgettable events, beautifully styled",
  description:
    "Maha Events Co designs and styles weddings, South Asian celebrations, and proposal setups with warmth and editorial detail.",
  instagramHandle: "@mahaeventsco",
  instagramUrl: "https://www.instagram.com/mahaeventsco",
  email: "hello@mahaeventsco.com",
  url: "https://mahaeventsco.com",
};
