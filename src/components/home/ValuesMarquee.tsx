"use client";

const values = [
  "Purity",
  "Authenticity",
  "Positivity",
  "Trust",
  "Wellness",
  "Balance",
  "Harmony",
  "Peace",
  "Intention",
  "Energy",
];

function MarqueeRow({
  reverse = false,
  speed = 30,
}: {
  reverse?: boolean;
  speed?: number;
}) {
  // Double the items for seamless loop
  const items = [...values, ...values];

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex items-center gap-0 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((value, i) => (
          <span key={`${value}-${i}`} className="flex items-center gap-6 px-6">
            <span className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-saffron/70 tracking-wide">
              {value}
            </span>
            {/* Alternating lotus and three dots (Ratnatraya) as separators */}
            <span
              className="text-terra/30 text-base select-none flex items-center gap-0.5"
              aria-hidden="true"
            >
              {i % 2 === 0 ? "\u{1FAB7}" : (<><span className="w-1 h-1 rounded-full bg-terra/30" /><span className="w-1 h-1 rounded-full bg-terra/30" /><span className="w-1 h-1 rounded-full bg-terra/30" /></>)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ValuesMarquee() {
  return (
    <section
      className="py-16 md:py-20 bg-cream overflow-hidden relative"
      aria-label="Our values"
    >
      {/* Top and bottom subtle borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-saffron/15 to-transparent" />

      <div className="space-y-6">
        <MarqueeRow speed={35} />
        <MarqueeRow reverse speed={40} />
      </div>

      <style jsx global>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee-scroll linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-scroll-reverse linear infinite;
        }
      `}</style>
    </section>
  );
}
