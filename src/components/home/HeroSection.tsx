"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingParticles from "@/components/animations/FloatingParticles";

const staggerContainer = {
  hidden: { opacity: 0.15 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0.15, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0.15 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

/* Large decorative SVG — concentric circles with petal shapes, inspired by Jain temple ceilings (Dilwara/Ranakpur) */
function MandalaSVG() {
  const petalAngles = Array.from({ length: 12 }, (_, i) => i * 30);
  const innerPetalAngles = Array.from({ length: 8 }, (_, i) => i * 45);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.svg
        viewBox="0 0 500 500"
        className="w-[650px] h-[650px] md:w-[900px] md:h-[900px] opacity-[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer concentric circles */}
        <circle cx="250" cy="250" r="240" fill="none" stroke="#C8A951" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="210" fill="none" stroke="#E07C24" strokeWidth="0.4" />
        <circle cx="250" cy="250" r="180" fill="none" stroke="#C8A951" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="150" fill="none" stroke="#E07C24" strokeWidth="0.4" />
        <circle cx="250" cy="250" r="120" fill="none" stroke="#C8A951" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="90" fill="none" stroke="#E07C24" strokeWidth="0.4" />
        <circle cx="250" cy="250" r="60" fill="none" stroke="#C8A951" strokeWidth="0.5" />

        {/* Outer petal ring — 12 petals */}
        {petalAngles.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 250 + 180 * Math.cos(rad);
          const cy = 250 + 180 * Math.sin(rad);
          const tipX = 250 + 220 * Math.cos(rad);
          const tipY = 250 + 220 * Math.sin(rad);
          const ctrl1X = cx + 25 * Math.cos(rad + Math.PI / 2);
          const ctrl1Y = cy + 25 * Math.sin(rad + Math.PI / 2);
          const ctrl2X = cx - 25 * Math.cos(rad + Math.PI / 2);
          const ctrl2Y = cy - 25 * Math.sin(rad + Math.PI / 2);
          const baseX = 250 + 155 * Math.cos(rad);
          const baseY = 250 + 155 * Math.sin(rad);
          return (
            <path
              key={`outer-${angle}`}
              d={`M ${baseX} ${baseY} Q ${ctrl1X} ${ctrl1Y} ${tipX} ${tipY} Q ${ctrl2X} ${ctrl2Y} ${baseX} ${baseY}`}
              fill="none"
              stroke="#C8A951"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Middle petal ring — 12 petals */}
        {petalAngles.map((angle) => {
          const rad = ((angle + 15) * Math.PI) / 180;
          const cx = 250 + 120 * Math.cos(rad);
          const cy = 250 + 120 * Math.sin(rad);
          const tipX = 250 + 150 * Math.cos(rad);
          const tipY = 250 + 150 * Math.sin(rad);
          const ctrl1X = cx + 18 * Math.cos(rad + Math.PI / 2);
          const ctrl1Y = cy + 18 * Math.sin(rad + Math.PI / 2);
          const ctrl2X = cx - 18 * Math.cos(rad + Math.PI / 2);
          const ctrl2Y = cy - 18 * Math.sin(rad + Math.PI / 2);
          const baseX = 250 + 100 * Math.cos(rad);
          const baseY = 250 + 100 * Math.sin(rad);
          return (
            <path
              key={`mid-${angle}`}
              d={`M ${baseX} ${baseY} Q ${ctrl1X} ${ctrl1Y} ${tipX} ${tipY} Q ${ctrl2X} ${ctrl2Y} ${baseX} ${baseY}`}
              fill="none"
              stroke="#E07C24"
              strokeWidth="0.4"
            />
          );
        })}

        {/* Inner petal ring — 8 petals */}
        {innerPetalAngles.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const tipX = 250 + 90 * Math.cos(rad);
          const tipY = 250 + 90 * Math.sin(rad);
          const ctrl1X = 250 + 60 * Math.cos(rad + 0.3);
          const ctrl1Y = 250 + 60 * Math.sin(rad + 0.3);
          const ctrl2X = 250 + 60 * Math.cos(rad - 0.3);
          const ctrl2Y = 250 + 60 * Math.sin(rad - 0.3);
          return (
            <path
              key={`inner-${angle}`}
              d={`M 250 250 Q ${ctrl1X} ${ctrl1Y} ${tipX} ${tipY} Q ${ctrl2X} ${ctrl2Y} 250 250`}
              fill="none"
              stroke="#C8A951"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Center circle */}
        <circle cx="250" cy="250" r="30" fill="none" stroke="#E07C24" strokeWidth="0.6" />
        <circle cx="250" cy="250" r="15" fill="none" stroke="#C8A951" strokeWidth="0.4" />

        {/* Connecting radial lines */}
        {petalAngles.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={`line-${angle}`}
              x1={250 + 30 * Math.cos(rad)}
              y1={250 + 30 * Math.sin(rad)}
              x2={250 + 240 * Math.cos(rad)}
              y2={250 + 240 * Math.sin(rad)}
              stroke="#C8A951"
              strokeWidth="0.2"
            />
          );
        })}
      </motion.svg>
    </div>
  );
}

/* Small lotus SVG decoration */
function LotusCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 2C30 2 25 12 25 18C25 21 27.2 23.5 30 23.5C32.8 23.5 35 21 35 18C35 12 30 2 30 2Z"
        fill="#C8A951"
        opacity="0.4"
      />
      <path
        d="M20 10C20 10 16 17 19 21C21 23.5 24.5 23 26.5 20.5C26.5 20.5 23 19.5 21 17C19.3 15 20 10 20 10Z"
        fill="#E07C24"
        opacity="0.3"
      />
      <path
        d="M40 10C40 10 44 17 41 21C39 23.5 35.5 23 33.5 20.5C33.5 20.5 37 19.5 39 17C40.7 15 40 10 40 10Z"
        fill="#E07C24"
        opacity="0.3"
      />
      <path
        d="M12 16C12 16 10 23 14 26C16.5 28 19.5 27 21 25C21 25 17 24 14.5 22C12.5 20.3 12 16 12 16Z"
        fill="#DCC078"
        opacity="0.2"
      />
      <path
        d="M48 16C48 16 50 23 46 26C43.5 28 40.5 27 39 25C39 25 43 24 45.5 22C47.5 20.3 48 16 48 16Z"
        fill="#DCC078"
        opacity="0.2"
      />
      <path
        d="M20 30C20 30 25 35 30 35C35 35 40 30 40 30"
        stroke="#C8A951"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

/* Gold lotus divider line */
function LotusGoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
      <svg viewBox="0 0 24 16" fill="none" className="w-6 h-4 flex-shrink-0">
        <path
          d="M12 1C12 1 9 6 9 9C9 11 10.3 12.5 12 12.5C13.7 12.5 15 11 15 9C15 6 12 1 12 1Z"
          fill="#C8A951"
          opacity="0.7"
        />
        <path
          d="M7 5C7 5 5 9 6.5 11C7.5 12.5 9.5 12 10.5 10.5C10.5 10.5 8.5 10 7.5 8.5C6.7 7.2 7 5 7 5Z"
          fill="#E07C24"
          opacity="0.5"
        />
        <path
          d="M17 5C17 5 19 9 17.5 11C16.5 12.5 14.5 12 13.5 10.5C13.5 10.5 15.5 10 16.5 8.5C17.3 7.2 17 5 17 5Z"
          fill="#E07C24"
          opacity="0.5"
        />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Large glowing saffron/gold orb — like a divine sunrise light */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(224,124,36,0.12) 0%, rgba(200,169,81,0.06) 35%, rgba(200,169,81,0.02) 60%, transparent 80%)",
          borderRadius: "50%",
        }}
      />

      {/* Secondary warm glow — higher on page like sunrise */}
      <div
        className="absolute top-[20%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(224,124,36,0.08) 0%, rgba(193,105,79,0.04) 40%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Floating Particles — warm saffron/gold */}
      <FloatingParticles count={50} speed={0.4} />

      {/* Mandala Pattern */}
      <MandalaSVG />

      {/* Corner lotus decorations */}
      <LotusCorner className="absolute top-8 left-8 w-16 h-12 opacity-30 hidden md:block" />
      <LotusCorner className="absolute top-8 right-8 w-16 h-12 opacity-30 -scale-x-100 hidden md:block" />
      <LotusCorner className="absolute bottom-20 left-8 w-12 h-8 opacity-20 rotate-180 hidden lg:block" />
      <LotusCorner className="absolute bottom-20 right-8 w-12 h-8 opacity-20 rotate-180 -scale-x-100 hidden lg:block" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Sacred Diya Flame — spiritual symbol */}
          <motion.div variants={fadeIn}>
            <svg viewBox="0 0 64 72" className="w-10 h-12 md:w-12 md:h-14 mx-auto drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main flame */}
              <path d="M32 4C32 4 22 20 22 32C22 37.5 26.5 42 32 42C37.5 42 42 37.5 42 32C42 20 32 4 32 4Z" fill="#E07C24" opacity="0.95"/>
              {/* Inner flame glow */}
              <path d="M32 12C32 12 27 22 27 30C27 32.8 29.2 35 32 35C34.8 35 37 32.8 37 30C37 22 32 12 32 12Z" fill="#FFCE00" opacity="0.7"/>
              {/* Left petal */}
              <path d="M18 24C18 24 14 36 18 42C21 46 26 45 29 41C29 41 24 39 21 34C18.8 30.4 18 24 18 24Z" fill="#C8A951" opacity="0.5"/>
              {/* Right petal */}
              <path d="M46 24C46 24 50 36 46 42C43 46 38 45 35 41C35 41 40 39 43 34C45.2 30.4 46 24 46 24Z" fill="#C8A951" opacity="0.5"/>
              {/* Base glow */}
              <ellipse cx="32" cy="56" rx="16" ry="5" fill="#C8A951" opacity="0.15"/>
              {/* Base dish */}
              <ellipse cx="32" cy="50" rx="12" ry="4" fill="#C8A951" opacity="0.6"/>
              <path d="M20 50 L20 54 Q20 58 26 60 L38 60 Q44 58 44 54 L44 50" fill="#C8A951" opacity="0.45"/>
            </svg>
          </motion.div>

          {/* Ratnatraya — Three Dots */}
          <motion.div variants={fadeIn} className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          </motion.div>

          {/* Presents label */}
          <motion.p
            variants={fadeInUp}
            className="text-[11px] md:text-xs font-body uppercase tracking-[0.35em] text-saffron/80"
          >
            NEH Wellness Centre Presents
          </motion.p>

          {/* Main title */}
          <motion.h1
            variants={fadeInUp}
            className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold leading-tight"
          >
            NEO Divine Products
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl font-heading italic text-sandal-light/80"
          >
            Making Moment Magical
          </motion.p>

          {/* Gold lotus divider */}
          <motion.div variants={fadeIn}>
            <LotusGoldDivider />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-sm md:text-base font-body text-cream/50 leading-relaxed italic px-4"
          >
            &ldquo;When your home smells divine and your energy feels light, the universe
            responds with clarity, peace, abundance, and endless new possibilities.&rdquo;
          </motion.blockquote>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/products"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 bg-saffron text-white font-body font-semibold text-sm rounded-xl hover:bg-saffron-light transition-all duration-300 shadow-lg shadow-saffron/25"
            >
              Explore Products
            </Link>
            <Link
              href="/about"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 border border-gold/40 text-gold font-body font-semibold text-sm rounded-xl hover:bg-gold/10 hover:border-gold/60 transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-body uppercase tracking-[0.2em] text-sandal/30">
            Scroll
          </span>
          <ChevronDown size={18} className="text-saffron/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
