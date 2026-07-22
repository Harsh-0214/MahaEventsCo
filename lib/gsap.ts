"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** The one easing curve used everywhere on this site. */
export const EASE = "power3.inOut";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: EASE });
}

export { gsap, ScrollTrigger };
