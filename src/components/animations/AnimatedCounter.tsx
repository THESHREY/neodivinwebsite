"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  // Start from a close number so it never shows "0"
  const startFrom = Math.max(Math.floor(end * 0.75), end - 10);
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // Reset to the start-from value, then animate up
    setCount(startFrom);
    setHasAnimated(true);

    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(
        (timestamp - startTime) / (duration * 1000),
        1
      );
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const range = end - startFrom;
      setCount(startFrom + Math.floor(eased * range));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, startFrom, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={className}
      animate={
        isInView && hasAnimated
          ? {
              scale: [1, 1.05, 1],
            }
          : {}
      }
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {prefix}
      {count}
      {suffix}
    </motion.span>
  );
}
