"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  BarChart3,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Phone,
  Sparkles,
  Inbox,
  IndianRupee,
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

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string | null;
  level: string | null;
  price: number | null;
  image: string | null;
  syllabus: string | null;
  featured: boolean;
}

/* Fallback courses shown when the API has no data yet */
const placeholderCourses: Course[] = [
  {
    id: "p1",
    title: "Access Bars Certification",
    slug: "access-bars-certification",
    description:
      "Become a certified Access Bars practitioner. Learn the 32 points on the head that release limitations, beliefs, and patterns. This transformative 2-day course includes hands-on practice, theory, and certification upon completion.",
    duration: "2 Days",
    level: "Beginner",
    price: null,
    image: null,
    syllabus:
      "Introduction to Access Consciousness|Understanding the 32 Bars Points|Hands-on Practice Sessions|Energy Flow and Awareness|Practitioner Ethics and Business|Certification Assessment",
    featured: true,
  },
  {
    id: "p2",
    title: "Chakra Healing Workshop",
    slug: "chakra-healing-workshop",
    description:
      "A comprehensive one-day immersion into the seven major chakras. Learn to identify imbalances, practice healing techniques, and discover how to maintain energetic health in daily life.",
    duration: "1 Day",
    level: "All Levels",
    price: null,
    image: null,
    syllabus:
      "The Seven Chakra System|Identifying Chakra Imbalances|Healing Techniques for Each Chakra|Crystal and Sound Healing|Meditation Practices|Daily Chakra Maintenance",
    featured: true,
  },
  {
    id: "p3",
    title: "Aura Reading Masterclass",
    slug: "aura-reading-masterclass",
    description:
      "Develop your ability to see, sense, and interpret the human aura. This advanced 3-day course covers aura scanning technology, intuitive reading, and practical applications for healing and counselling.",
    duration: "3 Days",
    level: "Intermediate",
    price: null,
    image: null,
    syllabus:
      "Understanding the Human Biofield|Aura Layers and Colors|Aura Scanning Technology|Intuitive Reading Techniques|Interpreting Aura Photographs|Practical Healing Applications",
    featured: false,
  },
  {
    id: "p4",
    title: "Corporate Wellness Program",
    slug: "corporate-wellness-program",
    description:
      "A customizable wellness program designed for organizations. Reduce workplace stress, improve team dynamics, and boost productivity through holistic healing modalities tailored for the corporate environment.",
    duration: "Custom Duration",
    level: "All Levels",
    price: null,
    image: null,
    syllabus:
      "Stress Management Techniques|EFT for the Workplace|Team Energy Alignment|Mindfulness and Meditation|Access Bars for Professionals|Custom Module Design",
    featured: false,
  },
  {
    id: "p5",
    title: "Self-Healing Awareness Program for Senior Citizens",
    slug: "self-healing-awareness-senior",
    description:
      "A gentle, specially designed program empowering senior citizens with simple yet effective self-healing techniques. Learn practices that improve vitality, ease discomfort, and enhance quality of life.",
    duration: "1 Day",
    level: "Beginner",
    price: null,
    image: null,
    syllabus:
      "Introduction to Self-Healing|Gentle Energy Exercises|Mudra Therapy Basics|Breathing and Relaxation|Daily Wellness Routine|Community Healing Circle",
    featured: false,
  },
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const syllabusItems = course.syllabus
    ? course.syllabus.split("|").filter(Boolean)
    : [];

  const levelColor =
    course.level === "Beginner"
      ? "text-sage bg-sage/10"
      : course.level === "Intermediate"
        ? "text-gold bg-gold/10"
        : course.level === "Advanced"
          ? "text-maroon bg-maroon/10"
          : "text-saffron bg-saffron/10";

  return (
    <ScrollReveal direction="up" delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-saffron/10 hover:border-saffron/25 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-saffron/5"
      >
        {/* Image placeholder */}
        <div className="relative h-44 bg-gradient-to-br from-gold/15 via-saffron/10 to-terra/15 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap size={40} className="text-saffron/25" />
          </div>
          {course.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-saffron/90 backdrop-blur-sm rounded-full text-xs font-body font-medium text-white">
                <Sparkles size={12} />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-heading font-semibold text-charcoal mb-3 leading-snug">
            {course.title}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {course.duration && (
              <span className="inline-flex items-center gap-1.5 text-xs font-body text-charcoal/80 bg-cream px-2.5 py-1 rounded-full">
                <Clock size={12} className="text-saffron" />
                {course.duration}
              </span>
            )}
            {course.level && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-full",
                  levelColor
                )}
              >
                <BarChart3 size={12} />
                {course.level}
              </span>
            )}
            {course.price != null && course.price > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-body text-charcoal/85 bg-gold/10 px-2.5 py-1 rounded-full font-semibold">
                <IndianRupee size={12} className="text-gold" />
                {course.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-sm text-charcoal/80 font-body leading-relaxed mb-5">
            {course.description}
          </p>

          {/* Syllabus Expandable */}
          {syllabusItems.length > 0 && (
            <div className="mb-5">
              <button
                onClick={() => setSyllabusOpen(!syllabusOpen)}
                className="flex items-center gap-2 text-sm font-body font-medium text-saffron hover:text-saffron-light transition-colors"
              >
                <BookOpen size={14} />
                Course Syllabus
                <motion.div
                  animate={{ rotate: syllabusOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {syllabusOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 space-y-2 pl-1">
                      {syllabusItems.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-charcoal/80 font-body"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-saffron/50 mt-1.5 flex-shrink-0" />
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/booking?course=${course.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-saffron text-white font-body font-semibold rounded-lg text-sm hover:bg-saffron-light transition-colors"
          >
            Enroll Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [usePlaceholders, setUsePlaceholders] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setCourses(data);
          } else {
            setCourses(placeholderCourses);
            setUsePlaceholders(true);
          }
        } else {
          setCourses(placeholderCourses);
          setUsePlaceholders(true);
        }
      } catch {
        setCourses(placeholderCourses);
        setUsePlaceholders(true);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

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
              Learn & Grow
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Courses & Training
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Deepen your understanding of holistic healing with our
              certification courses, workshops, and training programs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-10 h-10 border-3 border-saffron/30 border-t-saffron rounded-full animate-spin mx-auto mb-4" />
                <p className="text-charcoal/85 font-body text-sm">
                  Loading courses...
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollReveal>
                <div className="text-center mb-14">
                  <p className="text-saffron font-body text-sm uppercase tracking-[0.2em] mb-4">
                    Our Programs
                  </p>
                  <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                    Available Courses
                  </h2>
                  <div className="w-20 lotus-divider mx-auto mb-6" />
                  <p className="text-charcoal/80 font-body max-w-2xl mx-auto">
                    From beginner certifications to advanced masterclasses, find
                    the perfect course for your spiritual growth journey.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
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
              <GraduationCap size={28} className="text-saffron" />
            </div>
            <h2 className="text-display md:text-display-lg font-heading text-cream mb-6">
              Need Custom{" "}
              <span className="text-gradient-saffron">Training</span>?
            </h2>
            <p className="text-cream/50 font-body text-lg max-w-xl mx-auto mb-10">
              We design tailored training programs for organizations,
              institutions, and spiritual communities. Contact us to discuss
              your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors inline-flex items-center gap-2 justify-center"
              >
                Request Custom Training
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
