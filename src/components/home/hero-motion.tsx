"use client";

import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useMemo, useRef } from "react";
import { motionTokens, usePrefersReducedMotion } from "@/design/motion";

/**
 * Hero entrance: lines rise in one after another on load, and the whole block
 * drifts up and fades slightly as the visitor scrolls into the next chapter.
 */
export function HeroIntro({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const t = useMemo(() => motionTokens(), []);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  if (reduced) return <div ref={ref}>{children}</div>;
  const variants: Variants = { hidden: {}, shown: { transition: { staggerChildren: t.stagger * 1.4, delayChildren: 0.15 } } };
  return (
    <motion.div ref={ref} style={{ y, opacity }} variants={variants} initial="hidden" animate="shown">
      {children}
    </motion.div>
  );
}

export function HeroLine({ as = "div", className, children }: { as?: "div" | "span"; className?: string; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const t = useMemo(() => motionTokens(), []);
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const Component = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: t.distance, filter: "blur(8px)" },
    shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: t.duration * 1.2, ease: t.ease } },
  };
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
