import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteConfig } from "@/lib/content";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "South Asian wedding decor",
    "proposal designer",
    "luxury proposal Sacramento",
    "wedding decor Bay Area",
    "mehndi decor",
    "rokha decor",
    "event styling Central Valley",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-(--color-bg) text-(--color-text) antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
