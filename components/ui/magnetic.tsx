"use client";

// Adapted from 21st.dev "Magnetic" (ibelick) for Maha Events Co.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type SpringOptions } from "motion/react";

const SPRING_CONFIG: SpringOptions = { stiffness: 150, damping: 14, mass: 0.3 };

export type MagneticProps = {
  children: ReactNode;
  intensity?: number;
  range?: number;
  className?: string;
};

export function Magnetic({ children, intensity = 0.3, range = 80, className }: MagneticProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const calculateDistance = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (isHovered && distance <= range) {
        const scale = 1 - distance / range;
        x.set(distanceX * intensity * scale);
        y.set(distanceY * intensity * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", calculateDistance);
    return () => window.removeEventListener("mousemove", calculateDistance);
  }, [isHovered, intensity, range, x, y, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
