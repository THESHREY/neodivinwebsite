"use client";

import Link from "next/link";
import {
  Shield,
  Fingerprint,
  Smile,
  HandHeart,
  Leaf,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import FloatingParticles from "@/components/animations/FloatingParticles";

/* ---------- Lotus SVG Decoration ---------- */
function LotusDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#E07C24" opacity="0.5" />
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#E07C24" opacity="0.4" transform="rotate(-25 60 50)" />
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#C8A951" opacity="0.3" transform="rotate(-50 60 50)" />
      <ellipse cx="60" cy="50" rx="10" ry="30" fill="#C8A951" opacity="0.2" transform="rotate(-75 60 50)" />
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#E07C24" opacity="0.4" transform="rotate(25 60 50)" />
      <ellipse cx="60" cy="50" rx="12" ry="35" fill="#C8A951" opacity="0.3" transform="rotate(50 60 50)" />
      <ellipse cx="60" cy="50" rx="10" ry="30" fill="#C8A951" opacity="0.2" transform="rotate(75 60 50)" />
    </svg>
  );
}

const values = [
  {
    icon: Shield,
    title: "Purity",
    desc: "Rooted in the Jain principle of Ahimsa (non-violence), every product is crafted with the purest ingredients and cleanest intentions. We never compromise on quality because your spiritual practice deserves nothing but the best.",
    color: "bg-saffron/10",
    iconColor: "text-saffron",
    borderColor: "border-saffron/15",
  },
  {
    icon: Fingerprint,
    title: "Authenticity",
    desc: "Rooted in genuine spiritual wisdom and holistic knowledge, each product reflects decades of healing expertise and authentic traditional practices.",
    color: "bg-gold/10",
    iconColor: "text-gold",
    borderColor: "border-gold/15",
  },
  {
    icon: Smile,
    title: "Positivity",
    desc: "We infuse positive energy and intention into everything we create, ensuring that each product uplifts your spirit and transforms your space.",
    color: "bg-sage/10",
    iconColor: "text-sage",
    borderColor: "border-sage/15",
  },
  {
    icon: HandHeart,
    title: "Trust",
    desc: "Built on transparency, integrity, and consistent quality. Our clients trust us because we are deeply committed to their well-being and spiritual growth.",
    color: "bg-terra/10",
    iconColor: "text-terra",
    borderColor: "border-terra/15",
  },
  {
    icon: Leaf,
    title: "Wellness",
    desc: "Inspired by the Jain principle of Aparigraha (non-attachment), holistic well-being is at the core of everything we do. Our products are designed to nurture the mind, body, and spirit in perfect harmony.",
    color: "bg-maroon/10",
    iconColor: "text-maroon",
    borderColor: "border-maroon/15",
  },
];

export default function PurposePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <FloatingParticles count={25} speed={0.3} />

        {/* Decorative lotus at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="relative z-10 text-center px-4 py-32">
          <ScrollReveal>
            <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.3em] mb-6">
              Why We Exist
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Our Purpose
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Bringing balance, positivity, and spiritual harmony into everyday
              life
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-section relative">
        {/* Decorative lotus top right */}
        <div className="absolute top-10 right-10 pointer-events-none">
          <LotusDecoration className="w-20 h-10 opacity-10 rotate-12" />
        </div>

        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="w-16 divider-saffron mx-auto mb-12" />
              <div className="space-y-6 text-charcoal/85 font-body text-lg leading-relaxed">
                <p>
                  We believe that true well-being begins with the energy that
                  surrounds us. Our purpose is to bring balance, positivity, and
                  spiritual harmony into everyday life through thoughtfully
                  crafted wellness products.
                </p>
                <p>
                  Each creation is designed with intention -- to purify spaces,
                  uplift the mind, and nurture emotional and spiritual
                  well-being.
                </p>
                <p>
                  Our vision is to build a trusted global spiritual wellness
                  brand that inspires people to live calmer, happier, and more
                  meaningful lives. By blending purity, purpose, and spiritual
                  wisdom, we aim to guide individuals toward inner awakening,
                  strengthen their personal energy, and deepen their connection
                  with higher consciousness.
                </p>
                <p className="text-charcoal font-heading text-xl italic text-center py-4 border-l-4 border-saffron/30 pl-6 bg-saffron/5 rounded-r-xl">
                  Parasparopagraho Jivanam — all life is bound together. Through
                  every product we create, we strive to transform homes into
                  sanctuaries of peace and harmony.
                </p>
              </div>
              <div className="w-16 divider-saffron mx-auto mt-12" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                What We Stand For
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal">
                Our Core Values
              </h2>
              <div className="w-20 lotus-divider mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <ScrollReveal key={val.title} direction="up" delay={i * 0.1}>
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 h-full border ${val.borderColor} group hover:shadow-lg hover:shadow-saffron/5 transition-all duration-300`}>
                  <div className={`w-14 h-14 rounded-xl ${val.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <val.icon size={28} className={val.iconColor} />
                  </div>
                  <h3 className="text-heading-lg font-heading text-charcoal mb-3">
                    {val.title}
                  </h3>
                  <p className="text-charcoal/80 font-body leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative quote */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gold/8 rounded-full blur-[100px]" />
        </div>

        {/* Lotus decoration */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="container-narrow mx-auto relative z-10 text-center">
          <ScrollReveal>
            <TextReveal
              text="When the energy around us is pure and balanced, life becomes calmer, brighter, and more aligned."
              className="text-xl md:text-2xl font-heading text-cream/80 leading-relaxed justify-center text-center italic"
              wordByWord
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-narrow mx-auto text-center">
          <ScrollReveal>
            <LotusDecoration className="w-16 h-8 opacity-20 mx-auto mb-4" />
            <h2 className="text-display font-heading text-charcoal mb-6">
              Experience Our <span className="text-gradient-saffron">Purpose</span>{" "}
              in Every Product
            </h2>
            <p className="text-charcoal/80 font-body text-lg max-w-xl mx-auto mb-10">
              Discover our collection of intentionally crafted spiritual
              wellness products.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors"
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
