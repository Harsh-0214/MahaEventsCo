"use client";

import { useEffect, useState } from "react";

/** True when the user prefers reduced motion, or on connections that ask to save data. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    const update = () => setReduced(query.matches || Boolean(saveData));
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
