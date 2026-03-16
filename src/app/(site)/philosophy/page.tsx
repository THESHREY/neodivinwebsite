"use client";

import Link from "next/link";
import { Quote, ArrowRight, Sparkles } from "lucide-react";
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

/* ---------- Sacred Diya Flame SVG ---------- */
function DiyaFlame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
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

const pillarIcons = [
  { color: "bg-saffron/10", iconColor: "text-saffron", borderColor: "border-saffron/15" },
  { color: "bg-gold/10", iconColor: "text-gold", borderColor: "border-gold/15" },
  { color: "bg-sage/10", iconColor: "text-sage", borderColor: "border-sage/15" },
];

export default function PhilosophyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <FloatingParticles count={25} speed={0.3} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="relative z-10 text-center px-4 py-32">
          <ScrollReveal>
            <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.3em] mb-6">
              What We Believe
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Our Philosophy
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Guided by Ratnatraya — Right Faith, Right Knowledge, Right Conduct
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-section">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <div className="w-16 divider-saffron mx-auto mb-12" />
              <div className="space-y-6 text-charcoal/85 font-body text-lg leading-relaxed">
                <p>
                  We believe that energy shapes the way we live, feel, and
                  connect with the world around us. Our purpose is to create
                  refined spiritual wellness products that elevate everyday
                  living and transform spaces into sanctuaries of peace and
                  harmony.
                </p>
                <p>
                  Every product we craft is guided by intention -- designed to
                  purify the atmosphere, uplift the spirit, and restore balance
                  within. Through purity, thoughtful design, and spiritual
                  wisdom, we bring moments of calm, clarity, and positive energy
                  into modern life.
                </p>
                <p>
                  Our vision is to become a globally trusted spiritual wellness
                  brand that inspires a deeper connection to self, space, and
                  higher consciousness. By blending tradition with modern living,
                  we aim to make spiritual well-being effortless, meaningful,
                  and beautifully integrated into every home.
                </p>
              </div>
              <div className="w-16 divider-saffron mx-auto mt-12" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Belief Pillars */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                Ratnatraya — The Three Jewels
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal">
                Philosophy in Practice
              </h2>
              <div className="w-20 lotus-divider mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Samyak Darshan — Right Faith",
                desc: "Every product begins with a clear spiritual intention rooted in right perception. Guided by the Jain principle of Samyak Darshan, we craft with purpose, ensuring each creation carries positive energy and healing vibrations that resonate with your space.",
              },
              {
                title: "Samyak Jnana — Right Knowledge",
                desc: "We honor the ancient wisdom of Jain traditions and energy healing, blending time-tested spiritual practices with modern understanding. Through Anekantavada (many-sidedness of truth), we create products that are both authentic and relevant.",
              },
              {
                title: "Samyak Charitra — Right Conduct",
                desc: "Our philosophy centers on Ahimsa and harmony -- between tradition and modernity, between self and space, between inner peace and outer expression. Every product embodies the Jain ideal of compassionate, balanced living.",
              },
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} direction="up" delay={i * 0.12}>
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 h-full text-center border ${pillarIcons[i].borderColor} group hover:shadow-lg hover:shadow-saffron/5 transition-all duration-300`}>
                  <div className={`w-14 h-14 rounded-full ${pillarIcons[i].color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <Sparkles size={24} className={pillarIcons[i].iconColor} />
                  </div>
                  <h3 className="text-heading-lg font-heading text-charcoal mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-charcoal/80 font-body leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Large Quote Block */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-saffron/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-narrow mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <Quote size={48} className="text-saffron/30 mx-auto mb-8" />
              <TextReveal
                text="At the heart of our brand is a simple belief: when the energy around us is pure and balanced, life becomes calmer, brighter, and more aligned."
                className="text-2xl md:text-3xl font-heading text-cream/90 leading-relaxed justify-center text-center"
                wordByWord
              />

              {/* Lotus decoration under quote */}
              <div className="flex justify-center mt-8 mb-4">
                <LotusDecoration className="w-20 h-10 opacity-15" />
              </div>

              <div className="w-24 divider-saffron mx-auto mt-6" />
              <p className="text-saffron/60 font-body text-sm uppercase tracking-[0.2em] mt-6">
                -- NEO Divine Products
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-narrow mx-auto text-center">
          <ScrollReveal>
            <LotusDecoration className="w-16 h-8 opacity-20 mx-auto mb-4" />
            <h2 className="text-display font-heading text-charcoal mb-6">
              Experience Our{" "}
              <span className="text-gradient-saffron">Philosophy</span>
            </h2>
            <p className="text-charcoal/80 font-body text-lg max-w-xl mx-auto mb-10">
              Discover products that embody intention, tradition, and harmony.
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
