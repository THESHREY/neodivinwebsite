"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Flower2,
  Brain,
  Briefcase,
  Heart,
  Phone,
  Sparkles,
  Sun,
  Waves,
  Eye,
  Palette,
  Hand,
  Activity,
  UserCheck,
  Users,
  ArrowRight,
  Clock,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingParticles from "@/components/animations/FloatingParticles";
import { cn } from "@/lib/utils";

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

interface ServiceItem {
  name: string;
  desc: string;
  fullDesc: string;
  icon: React.ElementType;
  duration: string;
  slug: string;
}

interface ServiceCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
  borderColor: string;
  badgeBg: string;
  gradientAccent: string;
  services: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "Energy Healing",
    icon: Zap,
    color: "from-saffron/20 to-saffron/5",
    iconColor: "text-saffron",
    borderColor: "border-saffron/15",
    badgeBg: "bg-saffron/10 text-saffron-dark",
    gradientAccent: "from-saffron/8 via-transparent to-transparent",
    services: [
      {
        name: "Reiki",
        desc: "Universal life energy channeling for deep relaxation and holistic healing.",
        fullDesc:
          "Reiki is a Japanese healing technique that channels universal life energy through the practitioner's hands to the recipient. This deeply relaxing therapy promotes stress reduction, emotional balance, and accelerated natural healing. During a session, you will experience a gentle warmth and profound sense of peace as energy flows to areas that need it most. Reiki works on all levels -- physical, emotional, mental, and spiritual -- restoring harmony and vitality to your entire being.",
        icon: Sparkles,
        duration: "60 min",
        slug: "reiki",
      },
      {
        name: "Chakra Healing",
        desc: "Balancing and aligning the seven major energy centers.",
        fullDesc:
          "Chakra Healing focuses on the seven major energy centers that run along the spine, from the root to the crown. Each chakra governs specific physical, emotional, and spiritual aspects of your being. Through a combination of energy channeling, visualization, and intuitive guidance, blocked or imbalanced chakras are identified and restored to their natural flow. Experience renewed vitality, emotional harmony, and a deep sense of spiritual clarity.",
        icon: Sun,
        duration: "60 min",
        slug: "chakra-healing",
      },
      {
        name: "Spiritual Healing",
        desc: "Working with higher consciousness to address deep-rooted blockages.",
        fullDesc:
          "Spiritual Healing works at the deepest levels of your being, connecting with higher consciousness and divine energy to address root causes of emotional and spiritual distress. This modality goes beyond surface-level symptoms to uncover and release deeply embedded patterns, traumas, and energetic imprints. Through prayer, intention, and divine energy channeling, the practitioner facilitates profound transformation.",
        icon: Heart,
        duration: "60 min",
        slug: "spiritual-healing",
      },
      {
        name: "Frequency Healing",
        desc: "Using vibrational frequencies to harmonize the body's energy field.",
        fullDesc:
          "Frequency Healing utilizes specific sound and vibrational frequencies to restore the body's natural energetic resonance. Every cell, organ, and system in our body vibrates at specific frequencies, and when these frequencies become disrupted, illness and imbalance manifest. Through carefully calibrated healing frequencies, this therapy re-tunes your body's vibration, promoting cellular regeneration and deep relaxation.",
        icon: Waves,
        duration: "60 min",
        slug: "frequency-healing",
      },
      {
        name: "Biofield Therapy",
        desc: "Detecting and correcting energy imbalances in the human biofield.",
        fullDesc:
          "Biofield Therapy works with the electromagnetic energy field that surrounds and permeates the human body. Using advanced sensitivity and training, the practitioner scans your biofield to detect areas of congestion, depletion, or disruption. Through gentle energy manipulation techniques, these imbalances are corrected, restoring the smooth flow of life force energy throughout your system.",
        icon: Activity,
        duration: "60 min",
        slug: "biofield-therapy",
      },
    ],
  },
  {
    title: "Holistic Therapies",
    icon: Flower2,
    color: "from-sage/20 to-sage/5",
    iconColor: "text-sage",
    borderColor: "border-sage/15",
    badgeBg: "bg-sage/10 text-sage-dark",
    gradientAccent: "from-sage/8 via-transparent to-transparent",
    services: [
      {
        name: "Bach Flower Therapy",
        desc: "Gentle flower essence remedies for emotional imbalances.",
        fullDesc:
          "Bach Flower Therapy uses 38 specially prepared flower essences discovered by Dr. Edward Bach to gently address emotional imbalances and negative mental states. Each essence corresponds to a specific emotional pattern -- from fear and uncertainty to loneliness and oversensitivity. After a detailed consultation, a personalized combination of essences is prepared to restore emotional equilibrium.",
        icon: Flower2,
        duration: "45 min",
        slug: "bach-flower-therapy",
      },
      {
        name: "Colour Therapy",
        desc: "Harnessing the healing power of colors to balance energy.",
        fullDesc:
          "Colour Therapy, also known as Chromotherapy, harnesses the vibrational energy of different colors to restore balance and promote healing. Each color carries a unique frequency that resonates with specific organs, emotions, and energy centers. Through careful assessment, the practitioner identifies which colors your body needs and applies them through visualization, colored light exposure, and color breathing exercises.",
        icon: Palette,
        duration: "45 min",
        slug: "colour-therapy",
      },
      {
        name: "Mudra Therapy",
        desc: "Ancient hand gesture practices that channel energy flow.",
        fullDesc:
          "Mudra Therapy employs ancient hand gestures that have been practiced for thousands of years in Indian spiritual traditions. These specific hand positions create energetic circuits in the body, directing the flow of prana to stimulate specific organs, glands, and energy centers. You will learn and practice mudras tailored to your specific health concerns and spiritual goals.",
        icon: Hand,
        duration: "45 min",
        slug: "mudra-therapy",
      },
      {
        name: "Vitalization",
        desc: "Advanced energy revitalization to boost overall vitality.",
        fullDesc:
          "Vitalization is an advanced energy therapy designed to recharge and revitalize your entire energy system. Through a combination of energy channeling, breathwork, and specific activation techniques, this therapy targets depleted energy reserves and reignites your inner life force. Ideal for those feeling chronically tired, recovering from illness, or going through demanding life phases.",
        icon: Zap,
        duration: "60 min",
        slug: "vitalization",
      },
      {
        name: "Holistic Healing",
        desc: "Comprehensive multi-modality approach for complete wellness.",
        fullDesc:
          "Holistic Healing is our signature comprehensive therapy that combines multiple healing modalities into one powerful session. Based on a thorough assessment of your physical, emotional, mental, and spiritual state, the practitioner intuitively selects and blends the most effective techniques from our full range of services for deep transformation across all dimensions of your being.",
        icon: Heart,
        duration: "90 min",
        slug: "holistic-healing",
      },
    ],
  },
  {
    title: "Mind & Body",
    icon: Brain,
    color: "from-terra/20 to-terra/5",
    iconColor: "text-terra",
    borderColor: "border-terra/15",
    badgeBg: "bg-terra/10 text-terra-dark",
    gradientAccent: "from-terra/8 via-transparent to-transparent",
    services: [
      {
        name: "NLP Therapy",
        desc: "Neuro-Linguistic Programming for transforming limiting beliefs.",
        fullDesc:
          "NLP Therapy is a powerful approach to personal transformation that works with the connection between neurological processes, language, and behavioral patterns. Through specific NLP techniques, you will identify and reprogram limiting beliefs, overcome phobias, release negative anchors, and install empowering new patterns of thought and behavior for rapid, lasting change.",
        icon: Brain,
        duration: "60 min",
        slug: "nlp-therapy",
      },
      {
        name: "EFT Therapy",
        desc: "Emotional Freedom Technique for releasing emotional blocks.",
        fullDesc:
          "EFT, commonly known as 'tapping,' combines elements of cognitive therapy with acupressure to release emotional blockages stored in the body's energy system. By gently tapping on specific meridian points while focusing on particular emotional issues, you can rapidly reduce the emotional charge associated with traumatic memories, phobias, anxiety, and pain.",
        icon: Hand,
        duration: "60 min",
        slug: "eft-therapy",
      },
      {
        name: "Access Bars",
        desc: "Gentle touch therapy on 32 points of the head.",
        fullDesc:
          "Access Bars involves gently touching 32 specific points on the head that store the electromagnetic component of all the thoughts, ideas, attitudes, decisions, and beliefs you have ever had. When these points are lightly touched, it begins to clear the energy locked up in that area, allowing for tremendous change. Benefits include reduced stress, improved sleep, and greater mental clarity.",
        icon: Sparkles,
        duration: "60 min",
        slug: "access-bars",
      },
      {
        name: "Access Bars for Youth",
        desc: "Specialized Access Bars sessions designed for young people.",
        fullDesc:
          "Access Bars for Youth is a specially adapted version of Access Bars designed to meet the unique needs of children and teenagers. This gentle therapy helps them release accumulated stress, improve focus and concentration, build emotional resilience, and develop greater self-confidence. Sessions are tailored to be age-appropriate and engaging.",
        icon: Users,
        duration: "45 min",
        slug: "access-bars-for-youth",
      },
      {
        name: "Correcting Vision",
        desc: "Holistic approaches to improve eyesight and visual well-being.",
        fullDesc:
          "Correcting Vision is a holistic approach to improving eyesight and visual well-being. Through a combination of energy healing focused on the eyes, specific eye exercises, relaxation techniques, and addressing the emotional and energetic root causes of vision problems, this therapy helps restore and enhance your natural visual capacity.",
        icon: Eye,
        duration: "60 min",
        slug: "correcting-vision",
      },
    ],
  },
  {
    title: "Consulting",
    icon: Briefcase,
    color: "from-gold/20 to-gold/5",
    iconColor: "text-gold",
    borderColor: "border-gold/15",
    badgeBg: "bg-gold/10 text-gold-dark",
    gradientAccent: "from-gold/8 via-transparent to-transparent",
    services: [
      {
        name: "Image Consultancy",
        desc: "Holistic image guidance for authentic self-expression.",
        fullDesc:
          "Image Consultancy at NEH goes beyond conventional style advice by integrating energy awareness with personal presentation. This consultation includes an analysis of your personal energy, color palette assessment based on your aura and complexion, style guidance aligned with your life goals, and practical tips for projecting your best self.",
        icon: UserCheck,
        duration: "90 min",
        slug: "image-consultancy",
      },
      {
        name: "Numerology",
        desc: "Unlock hidden meanings in numbers for life guidance.",
        fullDesc:
          "Numerology is the ancient science of numbers and their influence on human life. Through detailed analysis of your birth date, name, and other significant numbers, this consultation reveals profound insights about your life path, destiny number, soul urge, personality traits, and optimal timing for important decisions.",
        icon: Activity,
        duration: "60 min",
        slug: "numerology",
      },
      {
        name: "Aura Scanning Reading Analysing",
        desc: "Comprehensive analysis of your energy field with advanced scanning.",
        fullDesc:
          "Our Aura Scanning, Reading & Analysing service combines advanced aura scanning technology with intuitive reading to provide a comprehensive analysis of your energy field. The session begins with a detailed scan using specialized equipment, followed by expert interpretation identifying areas of strength, blockages, and imbalances. Includes a detailed report and follow-up guidance.",
        icon: Eye,
        duration: "90 min",
        slug: "aura-scanning-reading-analysing",
      },
    ],
  },
  {
    title: "Special Programs",
    icon: Heart,
    color: "from-maroon/15 to-maroon/5",
    iconColor: "text-maroon",
    borderColor: "border-maroon/15",
    badgeBg: "bg-maroon/10 text-maroon",
    gradientAccent: "from-maroon/6 via-transparent to-transparent",
    services: [
      {
        name: "Senior Citizens Self Healing Awareness Program",
        desc: "Specially designed program for senior citizens to learn self-healing.",
        fullDesc:
          "A compassionate, specially designed program that empowers senior citizens with simple yet powerful self-healing techniques. Learn easy-to-practice energy healing methods, gentle breathing exercises, mudras for common ailments, meditation techniques for peace of mind, and holistic approaches to maintaining vitality and independence in a warm, supportive group setting.",
        icon: Heart,
        duration: "120 min",
        slug: "senior-citizens-self-healing-awareness-program",
      },
    ],
  },
];

/* ---------- Read More text ---------- */
function ReadMoreText({ text, maxLength = 140 }: { text: string; maxLength?: number }) {
  const [expanded, setExpanded] = useState(false);
  if (text.length <= maxLength) {
    return <p className="text-sm text-charcoal/80 font-body leading-relaxed">{text}</p>;
  }
  return (
    <p className="text-sm text-charcoal/80 font-body leading-relaxed">
      {expanded ? text : text.slice(0, maxLength).trimEnd() + "..."}
      <button
        onClick={() => setExpanded(!expanded)}
        className="ml-1 text-saffron font-semibold hover:text-saffron-dark transition-colors inline-flex items-center gap-0.5"
      >
        {expanded ? "Show less" : "Read more"}
        <ChevronDown
          size={12}
          className={cn("transition-transform", expanded && "rotate-180")}
        />
      </button>
    </p>
  );
}

/* ---------- Individual Service Card ---------- */
function ServiceCard({
  service,
  category,
  index,
}: {
  service: ServiceItem;
  category: ServiceCategory;
  index: number;
}) {
  return (
    <ScrollReveal direction="up" delay={index * 0.06}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 h-full flex flex-col",
          "shadow-sm hover:shadow-xl hover:shadow-saffron/8",
          category.borderColor,
          "hover:border-saffron/30"
        )}
      >
        {/* Top color accent bar */}
        <div
          className={cn(
            "h-1.5 w-full bg-gradient-to-r",
            category.color
          )}
        />

        <div className="p-5 md:p-6 flex flex-col flex-grow">
          {/* Icon + Duration row */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center",
                category.color
              )}
            >
              <service.icon size={20} className={category.iconColor} />
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold",
                category.badgeBg
              )}
            >
              <Clock size={11} />
              {service.duration}
            </span>
          </div>

          {/* Name */}
          <h4 className="font-heading text-lg text-charcoal mb-2 leading-snug">
            {service.name}
          </h4>

          {/* Short description */}
          <p className="text-sm text-charcoal/75 font-body leading-relaxed mb-3">
            {service.desc}
          </p>

          {/* Full description with read more */}
          <div className="mb-5 flex-grow">
            <ReadMoreText text={service.fullDesc} maxLength={150} />
          </div>

          {/* Footer: availability + book */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100/80">
            <div className="flex items-center gap-1.5 text-[11px] text-charcoal/80 font-body">
              <CalendarCheck size={12} />
              <span>In-person & online</span>
            </div>
            <Link
              href={`/booking?service=${service.slug}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-saffron text-white text-xs font-body font-bold rounded-full hover:bg-saffron-light transition-all duration-300 hover:shadow-lg hover:shadow-saffron/20 uppercase tracking-wider group/btn"
            >
              Book Now
              <ArrowRight
                size={12}
                className="group-hover/btn:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

/* ---------- Category Section ---------- */
function CategorySection({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <section
      className={cn(
        "section-padding relative overflow-hidden",
        isEven ? "bg-gradient-section" : "bg-gradient-sacred"
      )}
    >
      {/* Subtle decorative glow */}
      <div
        className={cn(
          "absolute w-80 h-80 rounded-full blur-[140px] opacity-30 pointer-events-none",
          isEven ? "top-0 right-0 bg-saffron/10" : "bottom-0 left-0 bg-gold/10"
        )}
      />

      <div className="container-wide mx-auto relative z-10">
        {/* Category Header */}
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-12">
            <div
              className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5",
                category.color
              )}
            >
              <category.icon size={28} className={category.iconColor} />
            </div>
            <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-2">
              {category.title}
            </h2>
            <p className="text-charcoal/85 font-body text-sm">
              {category.services.length}{" "}
              {category.services.length === 1 ? "service" : "services"}{" "}
              available
            </p>
            <div className="w-16 lotus-divider mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div
          className={cn(
            "grid gap-6",
            category.services.length === 1
              ? "grid-cols-1 max-w-lg mx-auto"
              : category.services.length === 3
                ? "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
          )}
        >
          {category.services.map((service, idx) => (
            <ServiceCard
              key={service.slug}
              service={service}
              category={category}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Quick Nav ---------- */
function QuickNav() {
  return (
    <ScrollReveal>
      <div className="flex flex-wrap justify-center gap-2 mb-0 py-6 bg-gradient-sacred border-b border-saffron/10">
        <div className="container-wide mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {serviceCategories.map((cat) => (
              <a
                key={cat.title}
                href={`#${cat.title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium bg-white text-charcoal/80 hover:bg-saffron hover:text-white border border-saffron/15 hover:border-saffron transition-all duration-300"
              >
                <cat.icon size={14} />
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function ServicesPage() {
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
              Healing Modalities
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Our Services
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto mb-8">
              19+ holistic healing modalities to nurture your mind, body, and
              spirit
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/booking"
                className="magnetic-btn px-7 py-3.5 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors inline-flex items-center gap-2"
              >
                Book a Session
                <ArrowRight size={15} />
              </Link>
              <a
                href="#services"
                className="magnetic-btn px-7 py-3.5 border border-cream/20 text-cream/80 font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-cream/10 transition-colors inline-flex items-center gap-2"
              >
                Explore Below
                <ChevronDown size={15} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Navigation */}
      <div id="services">
        <QuickNav />
      </div>

      {/* All Category Sections — fully expanded */}
      {serviceCategories.map((cat, i) => (
        <div
          key={cat.title}
          id={cat.title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
        >
          <CategorySection category={cat} index={i} />
        </div>
      ))}

      {/* Book a Session CTA */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/8 rounded-full blur-[100px]" />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="container-narrow mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-display md:text-display-lg font-heading text-cream mb-6">
              Ready to Start{" "}
              <span className="text-gradient-saffron">Healing</span>?
            </h2>
            <p className="text-cream/50 font-body text-lg max-w-xl mx-auto mb-10">
              Book a personal consultation with Neha to discover which healing
              modality is right for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors inline-flex items-center gap-2 justify-center"
              >
                Book a Session
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn px-8 py-4 border border-saffron/40 text-saffron-light font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron/10 transition-colors inline-flex items-center gap-2 justify-center"
              >
                <Phone size={16} />
                WhatsApp Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
