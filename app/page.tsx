"use client";

import { useState } from "react";
import { Loader } from "@/components/loader";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Services } from "@/components/services";
import { RevealSection } from "@/components/reveal-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Hero />
      <Journey />
      <Services />
      <RevealSection />
      <Footer />
    </>
  );
}
