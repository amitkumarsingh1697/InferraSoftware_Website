"use client";

import { motion, type Variants } from "motion/react";
import { useMemo } from "react";
import { motionTokens, usePrefersReducedMotion } from "@/design/motion";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "li" | "ul" | "header" | "article" | "p";

/**
 * Reveals its children as they enter the viewport: a short rise, fade and
 * de-blur using the timing in tokens.css. With reduced motion, or before
 * hydration, content is simply visible.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: Tag;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const t = useMemo(() => motionTokens(), []);
  const Component = motion[as];
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: t.distance, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: t.duration, ease: t.ease, delay }}
    >
      {children}
    </Component>
  );
}

/** Staggers the reveal of direct children marked with <RevealItem>. */
export function RevealGroup({ as = "div", className, children }: { as?: Tag; className?: string; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const t = useMemo(() => motionTokens(), []);
  const Component = motion[as];
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  const variants: Variants = { hidden: {}, shown: { transition: { staggerChildren: t.stagger } } };
  return (
    <Component className={className} variants={variants} initial="hidden" whileInView="shown" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {children}
    </Component>
  );
}

export function RevealItem({ as = "div", className, children }: { as?: Tag; className?: string; children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const t = useMemo(() => motionTokens(), []);
  const Component = motion[as];
  if (reduced) {
    const Plain = as;
    return <Plain className={cn(className)}>{children}</Plain>;
  }
  const variants: Variants = {
    hidden: { opacity: 0, y: t.distance * 0.75, filter: "blur(6px)" },
    shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: t.duration, ease: t.ease } },
  };
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}
