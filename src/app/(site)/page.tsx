"use client";

import Link from "next/link";
import {
  Sparkles,
  Sun,
  Circle,
  Flame,
  Droplets,
  ArrowRight,
  Eye,
  Target,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingParticles from "@/components/animations/FloatingParticles";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import ValuesMarquee from "@/components/home/ValuesMarquee";
import StatsSection from "@/components/home/StatsSection";
import TextReveal from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";

/* ---------- Lotus SVG Decoration ---------- */
function LotusDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={cn("w-24 h-12 opacity-20", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center petal */}
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#E07C24" opacity="0.5" />
      {/* Left petals */}
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#E07C24" opacity="0.4" transform="rotate(-25 60 50)" />
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#C8A951" opacity="0.3" transform="rotate(-50 60 50)" />
      <ellipse cx="60" cy="50" rx="10" ry="30" fill="#C8A951" opacity="0.2" transform="rotate(-75 60 50)" />
      {/* Right petals */}
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#E07C24" opacity="0.4" transform="rotate(25 60 50)" />
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#C8A951" opacity="0.3" transform="rotate(50 60 50)" />
      <ellipse cx="60" cy="50" rx="10" ry="30" fill="#C8A951" opacity="0.2" transform="rotate(75 60 50)" />
    </svg>
  );
}

/* ---------- Sacred Diya Flame SVG ---------- */
function DiyaFlame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={cn("w-10 h-12", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4C32 4 22 20 22 32C22 37.5 26.5 42 32 42C37.5 42 42 37.5 42 32C42 20 32 4 32 4Z" fill="#E07C24" opacity="0.95"/>
      <path d="M32 12C32 12 27 22 27 30C27 32.8 29.2 35 32 35C34.8 35 37 32.8 37 30C37 22 32 12 32 12Z" fill="#FFCE00" opacity="0.7"/>
      <path d="M18 24C18 24 14 36 18 42C21 46 26 45 29 41C29 41 24 39 21 34C18.8 30.4 18 24 18 24Z" fill="currentColor" opacity="0.4"/>
      <path d="M46 24C46 24 50 36 46 42C43 46 38 45 35 41C35 41 40 39 43 34C45.2 30.4 46 24 46 24Z" fill="currentColor" opacity="0.4"/>
      <ellipse cx="32" cy="56" rx="16" ry="5" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="50" rx="12" ry="4" fill="currentColor" opacity="0.5"/>
      <path d="M20 50 L20 54 Q20 58 26 60 L38 60 Q44 58 44 54 L44 50" fill="currentColor" opacity="0.35"/>
    </svg>
  );
}

/* ---------- Jain temple ceiling pattern (Dilwara-inspired concentric circles) ---------- */
function TempleDecor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("w-40 h-40 opacity-[0.06]", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric circles — inspired by Jain temple ceilings */}
      <circle cx="100" cy="100" r="95" stroke="#C8A951" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="80" stroke="#E07C24" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="65" stroke="#C8A951" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="50" stroke="#E07C24" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="35" stroke="#C8A951" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="20" stroke="#E07C24" strokeWidth="0.4" />
      {/* Petal arcs at outer ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 80 * Math.cos(rad);
        const cy = 100 + 80 * Math.sin(rad);
        return <circle key={angle} cx={cx} cy={cy} r="12" stroke="#C8A951" strokeWidth="0.3" fill="none" />;
      })}
      {/* Inner lotus-petal arcs */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + 50 * Math.cos(rad);
        const cy = 100 + 50 * Math.sin(rad);
        return <circle key={angle} cx={cx} cy={cy} r="10" stroke="#E07C24" strokeWidth="0.3" fill="none" />;
      })}
    </svg>
  );
}

/* ---------- Category config ---------- */
const categories = [
  {
    name: "Spiritual Sprays",
    icon: Sparkles,
    slug: "spiritual-sprays",
    gradient: "from-saffron/70 to-saffron-dark/90",
    accentColor: "text-saffron",
    count: "12+",
  },
  {
    name: "Planetary Sprays",
    icon: Sun,
    slug: "planetary-sprays",
    gradient: "from-gold/70 to-sandal-dark/90",
    accentColor: "text-gold",
    count: "9+",
  },
  {
    name: "Chakra Sprays",
    icon: Circle,
    slug: "chakra-sprays",
    gradient: "from-sage/70 to-sage-dark/90",
    accentColor: "text-sage",
    count: "7",
  },
  {
    name: "Dhoop & Incense",
    icon: Flame,
    slug: "dhoop-incense",
    gradient: "from-terra/70 to-charcoal-light/90",
    accentColor: "text-terra",
    count: "5+",
  },
  {
    name: "Bath & Body",
    icon: Droplets,
    slug: "bath-body",
    gradient: "from-maroon/70 to-terra-dark/90",
    accentColor: "text-maroon",
    count: "5+",
  },
];

// ============================
// HOME PAGE
// ============================
export default function HomePage() {
  return (
    <>
      {/* ===== SECTION 1 - HERO (extracted component) ===== */}
      <HeroSection />

      {/* ===== SECTION 2 - ABOUT PREVIEW ===== */}
      <section className="section-padding bg-gradient-section overflow-hidden relative">
        {/* Decorative Jain temple ceiling pattern */}
        <div className="absolute top-0 right-0 pointer-events-none">
          <TempleDecor className="w-64 h-64 opacity-[0.04]" />
        </div>

        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Sacred Geometry */}
            <ScrollReveal direction="left">
              <div className="relative flex items-center justify-center">
                <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-saffron/20 animate-spin-slow" />
                  {/* Middle ring */}
                  <div
                    className="absolute inset-8 rounded-full border border-gold/15 animate-spin-slow"
                    style={{ animationDirection: "reverse", animationDuration: "25s" }}
                  />
                  {/* Inner ring */}
                  <div
                    className="absolute inset-16 rounded-full border border-saffron/10 animate-spin-slow"
                    style={{ animationDuration: "15s" }}
                  />
                  {/* Center glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-saffron/10 blur-xl" />
                    <div className="absolute w-4 h-4 rounded-full bg-saffron/40" />
                  </div>
                  {/* Triangles */}
                  <svg
                    className="absolute inset-0 w-full h-full animate-spin-slow"
                    style={{ animationDuration: "40s" }}
                    viewBox="0 0 200 200"
                  >
                    <polygon
                      points="100,20 180,160 20,160"
                      fill="none"
                      stroke="rgba(224,124,36,0.15)"
                      strokeWidth="0.5"
                    />
                    <polygon
                      points="100,180 20,40 180,40"
                      fill="none"
                      stroke="rgba(200,169,81,0.1)"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal direction="right">
              <div>
                <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                  Who We Are
                </p>
                <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-6">
                  Crafted with{" "}
                  <span className="text-gradient-saffron">Divine Intention</span>
                </h2>
                <p className="text-charcoal/85 font-body leading-relaxed mb-6 text-base md:text-lg">
                  We are a dedicated spiritual wellness brand committed to
                  bringing purity, positivity, and balance into people&apos;s
                  lives. Through our carefully crafted products, we aim to
                  elevate the energy of every space and nurture inner peace.
                </p>
                <p className="text-charcoal/80 font-body leading-relaxed mb-8">
                  Founded by Neha V Shah, a Life Coach, Aura Practitioner &amp;
                  Energy Healer with expertise in 19+ healing modalities, every
                  product carries the intention of holistic well-being.
                </p>
                {/* Small lotus accent */}
                <div className="mb-6">
                  <LotusDecoration className="w-16 h-8 opacity-30" />
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-saffron font-body font-semibold text-sm uppercase tracking-wider group"
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3 - MISSION & VISION ===== */}
      <section className="section-padding bg-gradient-sacred relative overflow-hidden mandala-bg">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-saffron/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-wide mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                What Drives Us
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal">
                Our Purpose
              </h2>
              <div className="w-20 lotus-divider mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 h-full border border-saffron/15 shadow-lg shadow-saffron/5">
                <div className="w-14 h-14 rounded-xl bg-saffron/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-saffron" />
                </div>
                <h3 className="text-heading-lg font-heading text-charcoal mb-4">
                  Our Mission
                </h3>
                <p className="text-charcoal/80 font-body leading-relaxed">
                  Our mission is to craft exceptional spiritual wellness products
                  that elevate the energy of every space and nurture inner
                  balance. Through purity, intention, and holistic wisdom, we
                  strive to bring calm, clarity, and positive energy into
                  everyday life -- making spiritual well-being accessible and
                  meaningful for all.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 h-full border border-gold/15 shadow-lg shadow-gold/5">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-gold" />
                </div>
                <h3 className="text-heading-lg font-heading text-charcoal mb-4">
                  Our Vision
                </h3>
                <p className="text-charcoal/80 font-body leading-relaxed">
                  Our vision is to become a globally trusted spiritual wellness
                  brand that empowers individuals to live calmer, more joyful,
                  and more conscious lives. We aspire to inspire inner awakening,
                  strengthen personal energy, and deepen the connection between
                  people and higher consciousness -- one product, one moment at
                  a time.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4 - FEATURED PRODUCTS (extracted component) ===== */}
      <FeaturedProducts />

      {/* ===== SECTION 5 - PRODUCT CATEGORIES ===== */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                Browse By
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal">
                Product Categories
              </h2>
              <div className="w-20 lotus-divider mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.slug} direction="up" delay={i * 0.08}>
                <Link href={`/products?category=${cat.slug}`}>
                  <div
                    className={cn(
                      "relative rounded-2xl overflow-hidden p-6 h-48 flex flex-col justify-between bg-gradient-to-br border border-white/10 group cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-saffron/10",
                      cat.gradient
                    )}
                  >
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
                    <cat.icon
                      size={36}
                      className="text-cream/70 group-hover:text-cream transition-colors relative z-10"
                    />
                    <div className="relative z-10">
                      <h3 className="font-heading text-lg text-cream mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-cream/50 text-sm font-body">
                        {cat.count} products
                      </p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6 - VALUES MARQUEE (extracted component) ===== */}
      <ValuesMarquee />

      {/* ===== SECTION 7 - STATISTICS (extracted component) ===== */}
      <StatsSection />

      {/* ===== SECTION 7.5 - INSPIRATIONAL QUOTE ===== */}
      <section className="section-padding bg-gradient-sacred relative overflow-hidden">
        {/* Decorative warm glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-saffron/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/6 rounded-full blur-[150px] pointer-events-none" />

        {/* Lotus decoration top */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-28 h-14 opacity-15" />
        </div>

        <div className="container-narrow mx-auto relative z-10 text-center">
          <ScrollReveal>
            {/* Ahimsa Hand decoration */}
            <DiyaFlame className="w-16 h-16 text-saffron/40 mx-auto mb-8" />

            {/* Decorative opening quote mark */}
            <div className="text-saffron/20 font-heading text-8xl leading-none mb-2 select-none">
              &ldquo;
            </div>

            <h2 className="text-display md:text-display-lg lg:text-display-xl font-heading text-charcoal leading-tight mb-6 max-w-3xl mx-auto">
              If You Believe In Yourself,{" "}
              <span className="text-gradient-saffron">Anything Is Possible</span>
            </h2>

            {/* Decorative closing quote mark */}
            <div className="text-saffron/20 font-heading text-8xl leading-none mt-2 select-none">
              &rdquo;
            </div>

            <div className="w-20 lotus-divider mx-auto my-8" />

            <p className="text-charcoal/85 font-body text-lg max-w-xl mx-auto italic">
              Embrace your inner light and let it guide you on the path to
              transformation, healing, and self-discovery.
            </p>

            {/* Bottom lotus */}
            <div className="mt-10">
              <LotusDecoration className="w-20 h-10 opacity-20 mx-auto" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 8 - TESTIMONIALS (extracted component) ===== */}
      <TestimonialSlider />

      {/* ===== SECTION 9 - SPIRITUAL MESSAGE ===== */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold/8 rounded-full blur-[100px]" />
        </div>

        {/* Lotus decoration */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-32 h-16 opacity-10" />
        </div>

        <div className="container-narrow mx-auto relative z-10 text-center">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="w-16 divider-saffron mx-auto mb-10" />
              {/* Ahimsa Hand decoration */}
              <DiyaFlame className="w-14 h-14 text-gold mx-auto mb-6" />
              <TextReveal
                text="Parasparopagraho Jivanam — all life is interconnected. Through Ahimsa (non-violence), Anekantavada (many-sidedness of truth), and Aparigraha (non-attachment), we cultivate inner peace, clarity, and compassion. When we nurture the purity within, we elevate the energy around us — creating spaces of harmony, balance, and conscious living."
                className="text-lg md:text-xl font-heading text-cream/80 leading-relaxed justify-center text-center"
                wordByWord
              />
              <div className="w-16 divider-saffron mx-auto mt-10" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 10 - CTA ===== */}
      <section className="section-padding bg-gradient-sacred relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-saffron/10 rounded-full blur-[150px]" />
        </div>
        <div className="container-narrow mx-auto text-center relative z-10">
          <ScrollReveal>
            <LotusDecoration className="w-20 h-10 opacity-25 mx-auto mb-6" />
            <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-6">
              Begin Your Journey
            </p>
            <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-6">
              Transform Your Space,
              <br />
              <span className="text-gradient-saffron">Elevate Your Spirit</span>
            </h2>
            <p className="text-charcoal/80 font-body text-lg max-w-xl mx-auto mb-10">
              Begin your spiritual wellness journey today with NEO Divine
              Products. Discover products crafted with purity, purpose, and
              positive energy.
            </p>
            <Link
              href="/products"
              className="inline-block px-10 py-5 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-all animate-pulse-gold magnetic-btn"
            >
              Explore Our Collection
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
