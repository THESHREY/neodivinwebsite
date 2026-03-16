"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  ArrowRight,
  Users,
  Sparkles,
  Phone,
  Inbox,
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

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string | null;
  location: string | null;
  image: string | null;
  category: string | null;
  upcoming: boolean;
  featured: boolean;
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ScrollReveal direction="up" delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-saffron/10 hover:border-saffron/25 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-saffron/5 group"
      >
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-saffron/20 via-gold/15 to-sandal-light/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={40} className="text-saffron/30" />
          </div>
          {event.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-body font-medium text-saffron border border-saffron/10">
                <Tag size={12} />
                {event.category}
              </span>
            </div>
          )}
          {event.upcoming && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-sage/90 backdrop-blur-sm rounded-full text-xs font-body font-medium text-white">
                Upcoming
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-heading font-semibold text-charcoal mb-3 group-hover:text-saffron transition-colors leading-snug">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-charcoal/80 font-body">
              <Calendar size={14} className="text-saffron flex-shrink-0" />
              {formattedDate}
            </div>
            {event.time && (
              <div className="flex items-center gap-2 text-sm text-charcoal/80 font-body">
                <Clock size={14} className="text-gold flex-shrink-0" />
                {event.time}
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-charcoal/80 font-body">
                <MapPin size={14} className="text-terra flex-shrink-0" />
                {event.location}
              </div>
            )}
          </div>

          <p className="text-sm text-charcoal/80 font-body leading-relaxed mb-5 line-clamp-3">
            {event.description}
          </p>

          {event.upcoming ? (
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-saffron text-white font-body font-semibold rounded-lg text-sm hover:bg-saffron-light transition-colors"
            >
              Register
              <ArrowRight size={14} />
            </Link>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-saffron/30 text-saffron font-body font-semibold rounded-lg text-sm hover:bg-saffron/5 transition-colors"
            >
              View Details
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch {
        console.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const upcomingEvents = events.filter((e) => e.upcoming);
  const pastEvents = events.filter((e) => !e.upcoming);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <FloatingParticles count={25} speed={0.3} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="relative z-10 text-center px-4 py-32">
          <ScrollReveal>
            <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.3em] mb-6">
              Sacred Gatherings
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Events & Workshops
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Join our transformative events, workshops, and sacred sessions
              designed to elevate your spiritual wellness journey.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events Content */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4" />
                <p className="text-charcoal/85 font-body text-sm">
                  Loading events...
                </p>
              </div>
            </div>
          ) : events.length === 0 ? (
            /* Empty State */
            <ScrollReveal>
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-6">
                  <Inbox size={36} className="text-saffron/50" />
                </div>
                <h2 className="text-heading-xl font-heading text-charcoal mb-3">
                  No Events Scheduled Yet
                </h2>
                <p className="text-charcoal/85 font-body max-w-md mx-auto mb-8">
                  We&apos;re planning exciting new events and workshops. Check
                  back soon or contact us to stay updated.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-saffron text-white font-body font-semibold rounded-xl text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors"
                >
                  Get Notified
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <>
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-20">
                  <ScrollReveal>
                    <div className="text-center mb-14">
                      <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                        Coming Soon
                      </p>
                      <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                        Upcoming Events
                      </h2>
                      <div className="w-20 lotus-divider mx-auto mb-6" />
                      <p className="text-charcoal/80 font-body max-w-2xl mx-auto">
                        Reserve your spot in our upcoming sacred gatherings,
                        workshops, and healing sessions.
                      </p>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <ScrollReveal>
                    <div className="text-center mb-14">
                      <p className="text-gold font-body text-sm uppercase tracking-[0.2em] mb-4">
                        Our Journey
                      </p>
                      <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                        Past Events
                      </h2>
                      <div className="w-20 lotus-divider mx-auto mb-6" />
                      <p className="text-charcoal/80 font-body max-w-2xl mx-auto">
                        A glimpse into the sacred gatherings and transformative
                        workshops we&apos;ve hosted.
                      </p>
                    </div>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pastEvents.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
            <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-8">
              <Users size={28} className="text-saffron" />
            </div>
            <h2 className="text-display md:text-display-lg font-heading text-cream mb-6">
              Want a Custom{" "}
              <span className="text-gradient-saffron">Workshop</span>?
            </h2>
            <p className="text-cream/50 font-body text-lg max-w-xl mx-auto mb-10">
              We design customized workshops for organizations, communities, and
              spiritual groups. Let us create a sacred experience tailored to
              your needs.
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
