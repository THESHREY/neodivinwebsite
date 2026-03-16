"use client";

import Link from "next/link";
import {
  Heart,
  Sparkles,
  Star,
  Award,
  Users,
  BookOpen,
  Sun,
  Moon,
  Eye,
  Zap,
  Flower2,
  ArrowRight,
  Phone,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import FloatingParticles from "@/components/animations/FloatingParticles";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

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

/* ---------- Diya SVG ---------- */
function DiyaDecoration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame */}
      <ellipse cx="30" cy="18" rx="6" ry="12" fill="#E07C24" opacity="0.6" />
      <ellipse cx="30" cy="16" rx="3" ry="8" fill="#C8A951" opacity="0.8" />
      {/* Diya body */}
      <ellipse cx="30" cy="40" rx="18" ry="8" fill="#C8A951" opacity="0.4" />
      <ellipse cx="30" cy="38" rx="14" ry="6" fill="#DCC5A0" opacity="0.5" />
    </svg>
  );
}

const modalities = [
  "Reiki",
  "Colour Therapy",
  "Mantra Therapy",
  "Mudra Therapy",
  "Chakra Healing",
  "Sujok Therapy",
  "Sound Healing",
  "Crystal Healing",
  "Sunray Healing",
  "Moon Ray Healing",
  "Pyramid Healing",
  "NLP Therapy",
  "EFT Therapy",
  "Bach Flower Therapy",
  "Access Bars",
  "Spiritual Healing",
  "Frequency Healing",
  "Biofield Therapy",
  "Holistic Healing",
];

const timeline = [
  {
    year: "Early Years",
    title: "Seeds of Healing",
    desc: "Started learning Mudra and Acupressure as a teenager, igniting a lifelong passion for holistic wellness and energy healing.",
  },
  {
    year: "Training",
    title: "Mastering Modalities",
    desc: "Studied and mastered 19+ healing modalities including Reiki, NLP, EFT, Access Bars, Crystal Healing, Sound Healing, and more.",
  },
  {
    year: "Practice",
    title: "NEH Wellness Centre",
    desc: "Founded NEH Wellness Centre to offer holistic healing services, aura reading, corporate well-being programs, and personal growth coaching.",
  },
  {
    year: "Innovation",
    title: "NEO Divine Products",
    desc: "Launched NEO Divine Products -- a premium spiritual wellness brand bringing purity, positivity, and balance into everyday life through curated products.",
  },
];

const specializations = [
  {
    icon: Users,
    title: "Corporate Well-Being",
    desc: "Workshops and programs for workplace harmony, stress management, and team energy alignment.",
    color: "bg-saffron/10",
    iconColor: "text-saffron",
  },
  {
    icon: Heart,
    title: "Personal Growth",
    desc: "One-on-one life coaching, NLP sessions, and EFT therapy for personal transformation.",
    color: "bg-maroon/10",
    iconColor: "text-maroon",
  },
  {
    icon: Eye,
    title: "Aura Reading & Analysis",
    desc: "Advanced aura scanning, reading, and analysis to identify energy blockages and imbalances.",
    color: "bg-gold/10",
    iconColor: "text-gold",
  },
  {
    icon: Sparkles,
    title: "Energy Healing",
    desc: "Multi-modality energy healing sessions including Reiki, Chakra, Crystal, and Sound Healing.",
    color: "bg-sage/10",
    iconColor: "text-sage",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <FloatingParticles count={30} speed={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/30" />

        {/* Decorative lotus */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-28 h-14 opacity-10" />
        </div>

        <div className="relative z-10 text-center px-4 py-32">
          <ScrollReveal>
            <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.3em] mb-6">
              The Visionary Behind the Brand
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Neha V Shah
            </h1>
            <p className="text-xl md:text-2xl font-heading italic text-saffron-light/80 mb-2">
              Life Coach, Aura Practitioner &amp; Energy Healer
            </p>
            <p className="text-cream/50 font-body text-base mt-4 max-w-xl mx-auto">
              Founder of NEH Wellness Centre &amp; NEO Divine Products
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro / Bio section */}
      <section className="section-padding bg-gradient-section">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Image placeholder */}
              <div className="lg:col-span-2">
                <div className="w-64 h-80 md:w-72 md:h-96 mx-auto rounded-2xl bg-gradient-to-br from-saffron/20 via-gold/10 to-sandal/20 border border-saffron/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 shimmer-bg" />
                  <div className="text-center relative z-10">
                    <Flower2 size={48} className="text-saffron/40 mx-auto mb-3" />
                    <p className="text-charcoal/80 font-heading text-sm">
                      Neha V Shah
                    </p>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="lg:col-span-3">
                <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                  About Neha
                </p>
                <h2 className="text-display font-heading text-charcoal mb-6">
                  A Journey of{" "}
                  <span className="text-gradient-saffron">Healing & Purpose</span>
                </h2>
                <p className="text-charcoal/85 font-body leading-relaxed mb-4">
                  Neha V Shah is a dedicated Life Coach, Energy Healer, Holistic
                  Healer, and Aura Reading Specialist with a deep passion for
                  spiritual wellness. Her journey into the world of healing
                  began as a teenager when she started learning Mudra and
                  Acupressure, sparking a lifelong dedication to understanding
                  and harnessing the body&apos;s energy systems.
                </p>
                <p className="text-charcoal/80 font-body leading-relaxed mb-4">
                  Over the years, she has mastered 19+ healing modalities,
                  blending ancient wisdom with modern therapeutic techniques.
                  Her approach is rooted in the belief that true well-being
                  encompasses mind, body, and spirit -- and that every
                  individual has the power to transform their life through
                  conscious energy work.
                </p>
                <p className="text-charcoal/80 font-body leading-relaxed">
                  Grounded in her Jain spiritual heritage, Neha embodies the
                  principles of Ahimsa (non-violence), Anekantavada
                  (many-sidedness of truth), and Aparigraha (non-attachment).
                  Her work reflects the Jain ideal of Shukla Leshya — the
                  luminous, pure state of the soul — guiding others toward
                  clarity, compassion, and inner radiance.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-narrow mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                The Path
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal">
                Her Journey
              </h2>
              <div className="w-20 lotus-divider mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-saffron/40 via-gold/20 to-transparent md:-translate-x-px" />

            {timeline.map((item, i) => (
              <ScrollReveal
                key={i}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.1}
              >
                <div
                  className={`relative flex items-start gap-8 mb-12 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot — saffron accent */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-saffron rounded-full -translate-x-1.5 mt-2 z-10 shadow-lg shadow-saffron/30" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-saffron/10 ${
                      i % 2 === 0 ? "md:mr-8 md:text-right" : "md:ml-8"
                    }`}
                  >
                    <span className="text-sm font-body text-saffron uppercase tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="text-heading-lg font-heading text-charcoal mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/80 font-body leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 19+ Modalities */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-wide mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.2em] mb-4">
                Expertise
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-cream mb-4">
                <AnimatedCounter end={19} suffix="+" className="text-gradient-saffron" />{" "}
                Healing Modalities
              </h2>
              <p className="text-cream/50 font-body max-w-2xl mx-auto">
                Neha has studied and mastered a diverse range of healing
                techniques spanning energy work, holistic therapies, and mind-body practices.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {modalities.map((mod, i) => (
              <ScrollReveal key={mod} direction="up" delay={i * 0.04}>
                <div className="glass-card rounded-xl p-4 text-center hover:bg-saffron/5 transition-colors duration-300 group">
                  <Sparkles
                    size={18}
                    className="text-saffron/40 mx-auto mb-2 group-hover:text-saffron transition-colors"
                  />
                  <p className="text-sm font-body text-cream/70 group-hover:text-cream transition-colors">
                    {mod}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                Areas of Focus
              </p>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal">
                Specializations
              </h2>
              <div className="w-20 lotus-divider mx-auto mt-4" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specializations.map((spec, i) => (
              <ScrollReveal key={spec.title} direction="up" delay={i * 0.1}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 h-full border border-saffron/10 group hover:shadow-lg hover:shadow-saffron/5 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl ${spec.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <spec.icon size={24} className={spec.iconColor} />
                  </div>
                  <h3 className="text-heading font-heading text-charcoal mb-3">
                    {spec.title}
                  </h3>
                  <p className="text-charcoal/80 font-body leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEH Wellness Centre + NEO Divine Products */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 h-full border border-gold/15">
                <BookOpen size={32} className="text-saffron mb-4" />
                <h3 className="text-heading-lg font-heading text-charcoal mb-4">
                  NEH Wellness Centre
                </h3>
                <p className="text-charcoal/80 font-body leading-relaxed">
                  NEH Wellness Centre was founded with the vision of creating a
                  sacred space for healing and transformation. The centre offers
                  a comprehensive range of holistic services including energy
                  healing, life coaching, aura reading and analysis, and
                  corporate well-being programs. Every session is tailored to
                  the individual&apos;s unique energy needs, ensuring deep and
                  lasting transformation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 h-full border border-saffron/15">
                <Sparkles size={32} className="text-gold mb-4" />
                <h3 className="text-heading-lg font-heading text-charcoal mb-4">
                  NEO Divine Products
                </h3>
                <p className="text-charcoal/80 font-body leading-relaxed">
                  Born from years of healing expertise, NEO Divine Products is a
                  premium spiritual wellness brand that brings the power of
                  energy healing into everyday life. Each product is
                  thoughtfully crafted with intention -- designed to purify
                  spaces, uplift the mind, and nurture emotional and spiritual
                  well-being. From spiritual sprays to chakra healing products,
                  every creation embodies purity, purpose, and positive energy.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-saffron/5 blur-[150px] rounded-full w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Diya decoration */}
        <div className="absolute bottom-4 right-8 pointer-events-none opacity-20">
          <DiyaDecoration className="w-16 h-16" />
        </div>

        <div className="container-narrow mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-display md:text-display-lg font-heading text-cream mb-6">
              Ready to Begin Your{" "}
              <span className="text-gradient-saffron">Healing Journey</span>?
            </h2>
            <p className="text-cream/50 font-body text-lg max-w-xl mx-auto mb-10">
              Connect with Neha for a personal consultation, healing session,
              or to explore NEO Divine Products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="magnetic-btn px-8 py-4 border border-saffron/40 text-saffron-light font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
