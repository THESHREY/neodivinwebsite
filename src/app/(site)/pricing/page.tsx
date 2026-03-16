"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Star,
  ArrowRight,
  Phone,
  ChevronDown,
  Sparkles,
  Heart,
  Shield,
  Zap,
  HelpCircle,
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

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string | null;
  features: string;
  popular: boolean;
}

/* Fallback plans shown when the API has no data yet */
const placeholderPlans: PricingPlan[] = [
  {
    id: "p1",
    name: "Single Session",
    description:
      "Perfect for trying out a healing modality or addressing a specific concern.",
    price: 3999,
    duration: "per session",
    features:
      "60-minute healing session|Personalized consultation|Energy assessment|Post-session guidance|Follow-up recommendations",
    popular: false,
  },
  {
    id: "p2",
    name: "5-Session Package",
    description:
      "Our most popular package for a deeper, sustained healing journey with visible results.",
    price: 14999,
    duration: "5 sessions",
    features:
      "5 x 60-minute sessions|Comprehensive energy assessment|Customized healing plan|Priority scheduling|Progress tracking|WhatsApp support between sessions|10% savings vs single sessions",
    popular: true,
  },
  {
    id: "p3",
    name: "10-Session Package",
    description:
      "The complete transformation package for profound, lasting change and spiritual growth.",
    price: 27999,
    duration: "10 sessions",
    features:
      "10 x 60-minute sessions|Full aura & chakra analysis|Personalized healing program|Priority scheduling|Progress tracking & reports|Unlimited WhatsApp support|Complementary meditation guide|30% savings vs single sessions",
    popular: false,
  },
  {
    id: "p4",
    name: "Corporate Wellness",
    description:
      "Tailored wellness programs for organizations to boost team wellbeing and productivity.",
    price: 0,
    duration: "custom",
    features:
      "Customized group sessions|Stress management workshops|Team energy alignment|On-site or virtual delivery|Employee wellness reports|Dedicated program coordinator|Flexible scheduling",
    popular: false,
  },
];

const faqs = [
  {
    q: "How long is each healing session?",
    a: "Most individual sessions are 60 minutes long. The first session may run slightly longer (up to 90 minutes) to include a comprehensive energy assessment and consultation.",
  },
  {
    q: "What should I expect during my first visit?",
    a: "Your first visit includes a brief consultation to understand your concerns, followed by an energy assessment and the healing session itself. Wear comfortable clothing and arrive 10 minutes early.",
  },
  {
    q: "Can I mix different healing modalities in a package?",
    a: "Absolutely! Our multi-session packages are flexible. You can explore different modalities across sessions based on your healer's recommendations and your evolving needs.",
  },
  {
    q: "Is there a cancellation policy?",
    a: "We request at least 24 hours' notice for cancellations or rescheduling. Late cancellations may be charged a nominal fee. We understand emergencies and handle them on a case-by-case basis.",
  },
  {
    q: "Do you offer online/remote healing sessions?",
    a: "Yes, many of our healing modalities can be conducted remotely via video call. Distance healing is equally effective as energy transcends physical boundaries.",
  },
  {
    q: "Are these sessions suitable for children and elderly?",
    a: "Yes! We have specialized programs for all age groups, including Access Bars for Youth and Self-Healing Awareness Program for Senior Citizens. Sessions are adapted for comfort and safety.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal direction="up" delay={index * 0.06}>
      <div className="border border-saffron/10 rounded-xl overflow-hidden hover:border-saffron/20 transition-colors">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-saffron/5 transition-colors"
        >
          <span className="font-heading text-base text-charcoal pr-4">
            {faq.q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown size={18} className="text-saffron/60" />
          </motion.div>
        </button>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-charcoal/80 font-body leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </div>
    </ScrollReveal>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: PricingPlan;
  index: number;
}) {
  const features = plan.features.split("|").filter(Boolean);
  const isCustom = plan.price === 0;

  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-xl h-full flex flex-col",
          plan.popular
            ? "border-saffron/40 hover:border-saffron/60 shadow-saffron/10 hover:shadow-saffron/15"
            : "border-saffron/10 hover:border-saffron/25 hover:shadow-saffron/5"
        )}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-saffron to-gold py-2 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-bold text-white uppercase tracking-wider">
              <Star size={12} fill="currentColor" />
              Most Popular
            </span>
          </div>
        )}

        <div className={cn("p-8 flex flex-col flex-grow", plan.popular && "pt-14")}>
          {/* Plan Name */}
          <h3 className="text-xl font-heading font-semibold text-charcoal mb-2">
            {plan.name}
          </h3>
          <p className="text-sm text-charcoal/85 font-body mb-6 leading-relaxed">
            {plan.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            {isCustom ? (
              <div>
                <span className="text-3xl font-heading font-bold text-gradient-gold">
                  Custom
                </span>
                <p className="text-xs text-charcoal/80 font-body mt-1">
                  Tailored to your needs
                </p>
              </div>
            ) : (
              <div className="flex items-end gap-1">
                <span className="text-4xl font-heading font-bold text-gradient-gold">
                  ₹{plan.price}
                </span>
                {plan.duration && (
                  <span className="text-sm text-charcoal/80 font-body mb-1">
                    / {plan.duration}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm font-body text-charcoal/85"
              >
                <Check
                  size={16}
                  className={cn(
                    "mt-0.5 flex-shrink-0",
                    plan.popular ? "text-saffron" : "text-sage"
                  )}
                />
                {feature.trim()}
              </li>
            ))}
          </ul>

          {/* CTA */}
          {isCustom ? (
            <Link
              href="/contact"
              className={cn(
                "w-full px-6 py-3.5 font-body font-semibold rounded-xl text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2",
                "border border-saffron/30 text-saffron hover:bg-saffron/5"
              )}
            >
              Contact Us
              <ArrowRight size={14} />
            </Link>
          ) : (
            <Link
              href="/booking"
              className={cn(
                "w-full px-6 py-3.5 font-body font-semibold rounded-xl text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2",
                plan.popular
                  ? "bg-saffron text-white hover:bg-saffron-light"
                  : "bg-charcoal/5 text-charcoal hover:bg-saffron hover:text-white"
              )}
            >
              {isCustom ? "Get a Quote" : "Book Now"}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetch("/api/pricing");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setPlans(data);
          } else {
            setPlans(placeholderPlans);
          }
        } else {
          setPlans(placeholderPlans);
        }
      } catch {
        setPlans(placeholderPlans);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <FloatingParticles count={20} speed={0.3} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="relative z-10 text-center px-4 py-32">
          <ScrollReveal>
            <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.3em] mb-6">
              Investment in Wellness
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Pricing & Plans
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Transparent pricing for your healing journey. Choose the plan that
              resonates with your path to wellness.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gradient-sacred border-b border-saffron/10">
        <div className="container-wide mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-sm font-body text-charcoal/80">
              <Shield size={18} className="text-sage" />
              Certified Practitioner
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-charcoal/80">
              <Heart size={18} className="text-maroon" />
              Personalized Care
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-charcoal/80">
              <Zap size={18} className="text-saffron" />
              19+ Healing Modalities
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-charcoal/80">
              <Sparkles size={18} className="text-gold" />
              Proven Results
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4" />
                <p className="text-charcoal/85 font-body text-sm">
                  Loading pricing...
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollReveal>
                <div className="text-center mb-14">
                  <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                    Choose Your Path
                  </p>
                  <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                    Healing Plans
                  </h2>
                  <div className="w-20 lotus-divider mx-auto mb-6" />
                  <p className="text-charcoal/80 font-body max-w-2xl mx-auto">
                    Every journey is unique. Select a plan that aligns with your
                    healing goals, or contact us for a custom package.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {plans.map((plan, i) => (
                  <PricingCard key={plan.id} plan={plan} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-sacred">
        <div className="container-wide mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={22} className="text-saffron" />
              </div>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-20 lotus-divider mx-auto mb-6" />
              <p className="text-charcoal/80 font-body max-w-xl mx-auto">
                Everything you need to know about our healing sessions and
                pricing.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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
              Need a Custom{" "}
              <span className="text-gradient-saffron">Package</span>?
            </h2>
            <p className="text-cream/50 font-body text-lg max-w-xl mx-auto mb-10">
              We understand that healing journeys are unique. Let us create a
              personalized plan tailored to your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors inline-flex items-center gap-2 justify-center"
              >
                Contact Us
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
