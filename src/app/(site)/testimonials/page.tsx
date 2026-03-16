"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star, Quote, MessageCircle, Play, X, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

interface Testimonial {
  id: string;
  name: string;
  location?: string | null;
  rating: number;
  text: string;
  videoUrl?: string | null;
}

const placeholderTestimonials: Testimonial[] = [
  {
    id: "p1",
    name: "Priya M.",
    location: "Mumbai",
    rating: 5,
    text: "The spiritual sprays have completely transformed the energy of my home. I feel a sense of calm and clarity every time I use them. Truly divine products!",
  },
  {
    id: "p2",
    name: "Rajesh K.",
    location: "Delhi",
    rating: 5,
    text: "Neha's healing sessions combined with NEO Divine products have brought so much positivity into my life. The quality and intention behind each product is remarkable.",
  },
  {
    id: "p3",
    name: "Ananya S.",
    location: "Bangalore",
    rating: 5,
    text: "I've tried many wellness brands but nothing compares to NEO Divine. The chakra sprays are my absolute favorite -- pure magic in a bottle!",
  },
  {
    id: "p4",
    name: "Dr. Meera T.",
    location: "Pune",
    rating: 5,
    text: "As a physician, I was initially skeptical. But the results speak for themselves. My patients who use these products alongside their treatment report better sleep and reduced anxiety.",
  },
  {
    id: "p5",
    name: "Suresh P.",
    location: "Ahmedabad",
    rating: 5,
    text: "The planetary sprays are incredible. I use the Jupiter spray before important meetings and I can genuinely feel the difference in energy and outcomes. Highly recommended!",
  },
  {
    id: "p6",
    name: "Kavita R.",
    location: "Chennai",
    rating: 5,
    text: "Neha's Access Bars session changed my perspective on life. And her products are an extension of her healing energy. My home feels like a temple now.",
  },
  {
    id: "p7",
    name: "Amit D.",
    location: "Kolkata",
    rating: 5,
    text: "Ordered the dhoop collection and was blown away by the quality. The fragrance is pure, not synthetic, and the energy shift in my meditation space was immediate.",
  },
  {
    id: "p8",
    name: "Neelam B.",
    location: "Jaipur",
    rating: 5,
    text: "The bath and body products are luxurious and healing. I feel completely renewed after every use. It's not just skincare -- it's soul care.",
  },
];

/* ---------- Helper: Parse YouTube/Vimeo embed URL ---------- */
function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  // Direct video file
  if (url.match(/\.(mp4|webm|ogg)(\?|$)/i)) return url;

  return null;
}

function isDirectVideo(url: string): boolean {
  return !!url.match(/\.(mp4|webm|ogg)(\?|$)/i);
}

function getYouTubeThumbnail(url: string): string | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
}

/* ---------- Video Testimonial Card ---------- */
function VideoCard({
  testimonial,
  index,
  onPlay,
}: {
  testimonial: Testimonial;
  index: number;
  onPlay: (t: Testimonial) => void;
}) {
  const thumbnail = testimonial.videoUrl
    ? getYouTubeThumbnail(testimonial.videoUrl)
    : null;

  return (
    <ScrollReveal direction="up" delay={(index % 3) * 0.1}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl overflow-hidden border border-saffron/15 hover:border-saffron/30 shadow-sm hover:shadow-xl hover:shadow-saffron/8 transition-all duration-300 group cursor-pointer"
        onClick={() => onPlay(testimonial)}
      >
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-charcoal-light/90 to-charcoal/90 flex items-center justify-center overflow-hidden">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={`${testimonial.name}'s video`}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/30 z-10" />

          {/* Play button */}
          <div className="relative z-20 w-16 h-16 rounded-full bg-saffron/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-saffron transition-all duration-300 shadow-lg shadow-saffron/30">
            <Play size={24} className="text-white ml-1" fill="white" />
          </div>

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
            <p className="text-white font-heading font-semibold text-sm">
              {testimonial.name}
            </p>
            {testimonial.location && (
              <p className="text-white/60 text-xs font-body">
                {testimonial.location}
              </p>
            )}
          </div>
        </div>

        {/* Text excerpt */}
        {testimonial.text && (
          <div className="p-4">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={12}
                  className={cn(
                    j < testimonial.rating
                      ? "text-saffron fill-saffron"
                      : "text-saffron/20"
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-charcoal/80 font-body line-clamp-2">
              &ldquo;{testimonial.text}&rdquo;
            </p>
          </div>
        )}
      </motion.div>
    </ScrollReveal>
  );
}

/* ---------- Video Lightbox ---------- */
function VideoLightbox({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (testimonial) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [testimonial]);

  if (!testimonial?.videoUrl) return null;

  const embedUrl = getEmbedUrl(testimonial.videoUrl);
  const isDirect = isDirectVideo(testimonial.videoUrl);

  return (
    <AnimatePresence>
      {testimonial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>

            {/* Video */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-charcoal shadow-2xl">
              {isDirect ? (
                <video
                  ref={videoRef}
                  src={embedUrl || ""}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl + "?autoplay=1"}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`${testimonial.name}'s testimonial`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/80">
                  <p>Video format not supported</p>
                </div>
              )}
            </div>

            {/* Info below video */}
            <div className="mt-4 text-center">
              <p className="text-white font-heading text-lg">
                {testimonial.name}
              </p>
              {testimonial.location && (
                <p className="text-white/50 text-sm font-body">
                  {testimonial.location}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((d) => {
        const data = d.testimonials ?? d ?? [];
        setTestimonials(data.length > 0 ? data : placeholderTestimonials);
        setLoading(false);
      })
      .catch(() => {
        setTestimonials(placeholderTestimonials);
        setLoading(false);
      });
  }, []);

  const videoTestimonials = testimonials.filter((t) => t.videoUrl);
  const textTestimonials = testimonials.filter((t) => !t.videoUrl);

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
              Real Stories
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Client Testimonials
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Hear from those whose lives have been touched by our products and
              healing services
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Testimonials Section */}
      {videoTestimonials.length > 0 && (
        <section className="section-padding bg-gradient-sacred">
          <div className="container-wide mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-6">
                  <Video size={22} className="text-saffron" />
                </div>
                <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                  Video Testimonials
                </h2>
                <div className="w-20 lotus-divider mx-auto mb-6" />
                <p className="text-charcoal/80 font-body max-w-xl mx-auto">
                  Watch our clients share their healing journeys and
                  transformative experiences
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoTestimonials.map((t, i) => (
                <VideoCard
                  key={t.id}
                  testimonial={t}
                  index={i}
                  onPlay={setActiveVideo}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Text Testimonials Grid */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          {videoTestimonials.length > 0 && (
            <ScrollReveal>
              <div className="text-center mb-14">
                <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                  Written Reviews
                </h2>
                <div className="w-20 lotus-divider mx-auto mb-6" />
              </div>
            </ScrollReveal>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl bg-sandal/20 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {(textTestimonials.length > 0
                ? textTestimonials
                : testimonials
              ).map((t, i) => (
                <ScrollReveal key={t.id} direction="up" delay={(i % 3) * 0.1}>
                  <div className="break-inside-avoid bg-white rounded-2xl p-8 border border-gold/20 group hover:shadow-lg hover:shadow-saffron/5 hover:border-saffron/30 transition-all duration-300">
                    <Quote size={20} className="text-saffron/30 mb-4" />
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          size={14}
                          className={cn(
                            j < t.rating
                              ? "text-saffron fill-saffron"
                              : "text-saffron/20"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-charcoal/85 font-body leading-relaxed mb-6">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center">
                        <span className="text-saffron font-heading font-bold text-sm">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-saffron text-sm">
                          {t.name}
                        </p>
                        {t.location && (
                          <p className="text-xs text-charcoal/80 font-body">
                            {t.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-saffron/5 rounded-full blur-[100px]" />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-20 h-10 opacity-10" />
        </div>

        <div className="container-narrow mx-auto relative z-10 text-center">
          <ScrollReveal>
            <MessageCircle
              size={40}
              className="text-saffron/40 mx-auto mb-6"
            />
            <h2 className="text-display font-heading text-cream mb-6">
              Have a Story to Share?
            </h2>
            <p className="text-cream/50 font-body text-lg max-w-xl mx-auto mb-10">
              We would love to hear about your experience with NEO Divine
              Products and healing services.
            </p>
            <Link
              href="/contact"
              className="magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors"
            >
              Contact Us
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Lightbox */}
      <VideoLightbox
        testimonial={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
