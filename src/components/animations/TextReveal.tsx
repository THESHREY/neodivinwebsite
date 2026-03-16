"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordByWord?: boolean;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0.15, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0.15, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function TextReveal({
  text,
  className,
  delay = 0,
  wordByWord = true,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  if (wordByWord) {
    const words = text.split(" ");
    return (
      <motion.div
        ref={ref}
        variants={wordContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay }}
        className={cn("flex flex-wrap", className)}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="mr-[0.3em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  const characters = text.split("");
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={cn("flex flex-wrap", className)}
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={charVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
