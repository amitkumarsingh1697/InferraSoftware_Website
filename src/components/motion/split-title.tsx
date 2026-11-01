"use client";

import { Children, Fragment, isValidElement, useMemo } from "react";
import { motion } from "motion/react";
import { motionTokens, usePrefersReducedMotion } from "@/design/motion";

/**
 * Word-by-word title reveal: each word rises out of a mask as the heading
 * enters view. Plain strings are split into words; any element (for example
 * a gradient span) animates as one piece. Wording is never changed, real
 * spaces stay in the DOM, and reduced motion renders the title as is.
 */
export function SplitTitle({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const t = useMemo(() => motionTokens(), []);
  if (reduced) return <>{children}</>;

  const pieces: React.ReactNode[] = [];
  const flatten = (node: React.ReactNode) => {
    Children.forEach(node, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        String(child)
          .split(/(\s+)/)
          .forEach((part) => part && pieces.push(part));
      } else if (isValidElement(child) && child.type === Fragment) {
        flatten((child.props as { children?: React.ReactNode }).children);
      } else if (child != null && child !== false) {
        pieces.push(child);
      }
    });
  };
  flatten(children);

  let word = 0;
  return (
    <motion.span initial="hidden" whileInView="shown" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
      {pieces.map((piece, i) => {
        if (typeof piece === "string" && /^\s+$/.test(piece)) return <Fragment key={i}>{piece}</Fragment>;
        const delay = (word++ * t.stagger) / 1.6;
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "105%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }}
              transition={{ duration: t.duration * 1.1, ease: t.ease, delay }}
            >
              {piece}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
