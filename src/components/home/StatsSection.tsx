"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string; // decorative symbol
}

const stats: Stat[] = [
  { value: 38, suffix: "+", label: "Divine Products", icon: "\u{1FAB7}" }, // lotus
  { value: 19, suffix: "+", label: "Healing Modalities", icon: "\u2728" }, // sparkles
  { value: 1000, suffix: "+", label: "Happy Clients", icon: "\u{1F54A}" }, // dove (peace)
  { value: 7, suffix: "", label: "Chakra Products", icon: "\u2728" }, // sparkles
];

/* Small diya (lamp) SVG icon */
function DiyaIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flame */}
      <path
        d="M16 4C16 4 13 9 13 12C13 13.66 14.34 15 16 15C17.66 15 19 13.66 19 12C19 9 16 4 16 4Z"
        fill="#E07C24"
        opacity="0.8"
      />
      {/* Inner flame */}
      <path
        d="M16 7C16 7 14.5 10 14.5 11.5C14.5 12.33 15.17 13 16 13C16.83 13 17.5 12.33 17.5 11.5C17.5 10 16 7 16 7Z"
        fill="#DCC078"
        opacity="0.9"
      />
      {/* Lamp body */}
      <ellipse cx="16" cy="18" rx="8" ry="3" fill="#C8A951" opacity="0.6" />
      {/* Lamp base */}
      <path
        d="M10 18C10 18 11 24 16 24C21 24 22 18 22 18"
        stroke="#C8A951"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <ellipse cx="16" cy="24" rx="4" ry="1.5" fill="#C8A951" opacity="0.4" />
    </svg>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 md:py-24 bg-gradient-sacred relative overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-saffron/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Mandala background pattern */}
      <div className="absolute inset-0 mandala-bg pointer-events-none" />

      <div className="container-wide mx-auto px-4 md:px-8 relative z-10">
        {/* Small heading */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <DiyaIcon className="w-8 h-8 mx-auto mb-3" />
            <p className="text-xs font-body uppercase tracking-[0.3em] text-saffron/70">
              Our Sacred Journey
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} direction="up" delay={index * 0.1}>
              <div className="relative text-center group">
                {/* Saffron/gold divider between items (hidden on mobile for 2-col) */}
                {index > 0 && (
                  <div className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-saffron/20 to-transparent" />
                )}

                <div className="py-4">
                  {/* Decorative icon */}
                  <div className="text-xl mb-2 opacity-50" aria-hidden="true">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-display font-heading font-bold text-gradient-saffron mb-2">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                  </div>
                  <p className="text-sm md:text-base font-body font-medium text-charcoal/80 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
