import { Hero } from "@/components/sections/hero";
import { FeatureStrip } from "@/components/feature-strip";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
