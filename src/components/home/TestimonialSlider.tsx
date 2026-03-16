"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { TestimonialSkeleton } from "@/components/ui/LoadingSkeleton";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  image: string | null;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "text-saffron fill-saffron"
              : "text-charcoal/10"
          }
        />
      ))}
    </div>
  );
}

/* Decorative lotus for the quote area */
function QuoteLotus() {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      className="w-16 h-12"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center petal */}
      <path
        d="M32 4C32 4 27 14 27 20C27 23.3 29.2 26 32 26C34.8 26 37 23.3 37 20C37 14 32 4 32 4Z"
        fill="#E07C24"
        opacity="0.15"
      />
      {/* Left petal */}
      <path
        d="M22 12C22 12 18 19 21 23C23 25.5 26.5 25 28.5 22.5C28.5 22.5 25 21.5 23 19C21.3 17 22 12 22 12Z"
        fill="#C8A951"
        opacity="0.12"
      />
      {/* Right petal */}
      <path
        d="M42 12C42 12 46 19 43 23C41 25.5 37.5 25 35.5 22.5C35.5 22.5 39 21.5 41 19C42.7 17 42 12 42 12Z"
        fill="#C8A951"
        opacity="0.12"
      />
      {/* Far left petal */}
      <path
        d="M12 18C12 18 10 25 14 28C16.5 30 19.5 29 21 27C21 27 17 26 14.5 24C12.5 22.3 12 18 12 18Z"
        fill="#DCC078"
        opacity="0.08"
      />
      {/* Far right petal */}
      <path
        d="M52 18C52 18 54 25 50 28C47.5 30 44.5 29 43 27C43 27 47 26 49.5 24C51.5 22.3 52 18 52 18Z"
        fill="#DCC078"
        opacity="0.08"
      />
      {/* Base curve */}
      <path
        d="M22 34C22 34 27 40 32 40C37 40 42 34 42 34"
        stroke="#C8A951"
        strokeWidth="0.8"
        fill="none"
        opacity="0.15"
      />
    </svg>
  );
}

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          // Take first 6 as featured
          setTestimonials(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const goNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Auto-slide
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext, testimonials.length]);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-sacred">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="w-48 h-8 bg-saffron/5 rounded mx-auto mb-4" />
              <div className="w-16 h-0.5 bg-saffron/10 mx-auto" />
            </div>
          </div>
          <TestimonialSkeleton />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding bg-gradient-sacred relative overflow-hidden">
      {/* Decorative warm glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-saffron/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="container-narrow mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <h2 className="text-display font-heading font-bold text-charcoal mb-3">
              What Our Clients Say
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto" />
          </div>
        </ScrollReveal>

        {/* Slider */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Decorative lotus instead of quote mark */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 md:-top-4 md:left-0 md:translate-x-0 md:-left-4 pointer-events-none">
            <QuoteLotus />
          </div>

          {/* Card container */}
          <div className="relative min-h-[280px] md:min-h-[240px] flex items-center bg-white/70 backdrop-blur-sm rounded-2xl border border-saffron/10 shadow-lg shadow-saffron/5 p-6 md:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full text-center"
              >
                {/* Quote text */}
                <p className="text-lg md:text-xl font-heading italic text-charcoal/80 leading-relaxed mb-6">
                  &ldquo;{current.text}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex justify-center mb-4">
                  <StarRating rating={current.rating} />
                </div>

                {/* Author */}
                <div>
                  <p className="text-base font-heading font-semibold text-saffron-dark">
                    {current.name}
                  </p>
                  {current.location && (
                    <p className="text-sm font-body text-charcoal/80 mt-0.5">
                      {current.location}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div
            className="flex items-center justify-center gap-2 mt-8"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => goTo(index)}
                className="group p-1"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-400 ${
                    index === currentIndex
                      ? "w-8 bg-saffron"
                      : "w-2 bg-charcoal/10 group-hover:bg-saffron/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
