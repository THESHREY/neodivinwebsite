"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  Send,
  MessageCircle,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import toast from "react-hot-toast";
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

interface ServiceOption {
  id: string;
  name: string;
}

interface CourseOption {
  id: string;
  title: string;
  slug: string;
}

type BookingType = "service" | "course";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const steps = [
  {
    num: "1",
    title: "Choose Service or Course",
    desc: "Select from our healing services or training courses to begin your journey.",
  },
  {
    num: "2",
    title: "Select Date & Time",
    desc: "Pick a convenient date and time slot that works best for your schedule.",
  },
  {
    num: "3",
    title: "Confirm Details",
    desc: "Fill in your contact information and any special notes for the healer.",
  },
  {
    num: "4",
    title: "Receive Confirmation",
    desc: "Get an email confirmation with your booking details and session preparation tips.",
  },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";
  const courseParam = searchParams.get("course") || "";

  const [bookingType, setBookingType] = useState<BookingType>(
    courseParam ? "course" : "service"
  );
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    serviceId: "",
    serviceName: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* Fetch services */
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);

          // Pre-select service from URL param
          if (serviceParam && data.length > 0) {
            const match = data.find(
              (s: ServiceOption) =>
                s.name.toLowerCase().replace(/\s+/g, "-") === serviceParam ||
                s.id === serviceParam
            );
            if (match) {
              setForm((f) => ({
                ...f,
                serviceId: match.id,
                serviceName: match.name,
              }));
            } else {
              // Use the slug as service name text
              setForm((f) => ({
                ...f,
                serviceName: serviceParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
              }));
            }
          }
        }
      } catch {
        console.error("Failed to load services");
      } finally {
        setLoadingServices(false);
      }
    }
    fetchServices();
  }, [serviceParam]);

  /* Fetch courses */
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data);

          // Pre-select course from URL param
          if (courseParam && data.length > 0) {
            const match = data.find(
              (c: CourseOption) =>
                c.slug === courseParam || c.id === courseParam
            );
            if (match) {
              setForm((f) => ({
                ...f,
                serviceId: match.id,
                serviceName: match.title,
              }));
            } else {
              setForm((f) => ({
                ...f,
                serviceName: courseParam.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
              }));
            }
          }
        }
      } catch {
        console.error("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    }
    fetchCourses();
  }, [courseParam]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "serviceId") {
      if (bookingType === "service") {
        const selected = services.find((s) => s.id === value);
        setForm((f) => ({
          ...f,
          serviceId: value,
          serviceName: selected?.name || "",
        }));
      } else {
        const selected = courses.find((c) => c.id === value);
        setForm((f) => ({
          ...f,
          serviceId: value,
          serviceName: selected?.title || "",
        }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleTypeSwitch = (type: BookingType) => {
    setBookingType(type);
    setForm((f) => ({ ...f, serviceId: "", serviceName: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.customerEmail ||
      !form.serviceName ||
      !form.date ||
      !form.time
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          bookingType,
        }),
      });
      if (!res.ok) throw new Error("Failed to book");
      setSubmitted(true);
      toast.success(
        bookingType === "course"
          ? "Course enrollment submitted!"
          : "Booking submitted successfully!"
      );
      setForm({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        serviceId: "",
        serviceName: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch {
      toast.error(
        "Failed to submit booking. Please try again or contact us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Minimum date is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-saffron/15 rounded-xl text-charcoal font-body text-sm placeholder:text-charcoal/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-saffron/40 transition-all duration-300";

  const isLoading = bookingType === "service" ? loadingServices : loadingCourses;
  const options =
    bookingType === "service"
      ? services.map((s) => ({ id: s.id, label: s.name }))
      : courses.map((c) => ({ id: c.id, label: c.title }));

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
              Schedule Your Visit
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Book a Session
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Begin your healing journey with a personal consultation or enroll
              in a training course. Choose what suits you best.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form + Side Panel */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <ScrollReveal direction="left" className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-8 md:p-12 border border-sage/20 shadow-lg shadow-sage/5 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-sage" />
                  </div>
                  <h2 className="text-heading-xl font-heading text-charcoal mb-3">
                    {bookingType === "course"
                      ? "Enrollment Confirmed!"
                      : "Booking Confirmed!"}
                  </h2>
                  <p className="text-charcoal/80 font-body mb-6 max-w-md mx-auto">
                    {bookingType === "course"
                      ? "Thank you for enrolling! We've received your registration and will send a confirmation email shortly with course details and preparation information."
                      : "Thank you for booking with us. We've received your request and will send a confirmation email shortly with session preparation details."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-saffron text-white font-body font-semibold rounded-xl text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors inline-flex items-center gap-2 justify-center"
                    >
                      <Calendar size={16} />
                      Book Another
                    </button>
                    <a
                      href="https://wa.me/919999999999"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-saffron/30 text-saffron font-body font-semibold rounded-xl text-sm uppercase tracking-wider hover:bg-saffron/5 transition-colors inline-flex items-center gap-2 justify-center"
                    >
                      <MessageCircle size={16} />
                      WhatsApp Us
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl p-8 md:p-10 border border-saffron/10 shadow-lg shadow-saffron/5">
                  <h2 className="text-heading-xl font-heading text-charcoal mb-2">
                    Schedule Your{" "}
                    {bookingType === "course" ? "Enrollment" : "Session"}
                  </h2>
                  <p className="text-charcoal/85 font-body text-sm mb-8">
                    Fill in the details below to{" "}
                    {bookingType === "course"
                      ? "enroll in a course"
                      : "book your healing session"}
                    . Fields marked with{" "}
                    <span className="text-saffron">*</span> are required.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Booking Type Toggle */}
                    <div>
                      <label className="block text-sm font-body text-charcoal/85 mb-2">
                        What would you like to book?
                      </label>
                      <div className="flex gap-0 bg-cream rounded-xl p-1 border border-saffron/10">
                        <button
                          type="button"
                          onClick={() => handleTypeSwitch("service")}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-body font-semibold transition-all duration-300",
                            bookingType === "service"
                              ? "bg-saffron text-white shadow-md shadow-saffron/20"
                              : "text-charcoal/85 hover:text-charcoal"
                          )}
                        >
                          <Sparkles size={16} />
                          Healing Service
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTypeSwitch("course")}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-body font-semibold transition-all duration-300",
                            bookingType === "course"
                              ? "bg-saffron text-white shadow-md shadow-saffron/20"
                              : "text-charcoal/85 hover:text-charcoal"
                          )}
                        >
                          <GraduationCap size={16} />
                          Course / Training
                        </button>
                      </div>
                    </div>

                    {/* Service / Course Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                        {bookingType === "course" ? (
                          <GraduationCap size={14} className="text-saffron" />
                        ) : (
                          <Sparkles size={14} className="text-saffron" />
                        )}
                        {bookingType === "course" ? "Course" : "Service"}{" "}
                        <span className="text-saffron">*</span>
                      </label>
                      {isLoading ? (
                        <div
                          className={cn(
                            inputClasses,
                            "flex items-center gap-2 text-charcoal/80"
                          )}
                        >
                          <div className="w-4 h-4 border-2 border-saffron/30 border-t-saffron rounded-full animate-spin" />
                          Loading{" "}
                          {bookingType === "course" ? "courses" : "services"}...
                        </div>
                      ) : options.length > 0 ? (
                        <select
                          name="serviceId"
                          value={form.serviceId}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        >
                          <option value="">
                            Select a{" "}
                            {bookingType === "course" ? "course" : "service"}
                          </option>
                          {options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="serviceName"
                          value={form.serviceName}
                          onChange={handleChange}
                          placeholder={
                            bookingType === "course"
                              ? "Enter the course you'd like to enroll in"
                              : "Enter the service you need"
                          }
                          className={inputClasses}
                          required
                        />
                      )}
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                          <User size={14} className="text-saffron" />
                          Full Name <span className="text-saffron">*</span>
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={form.customerName}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={inputClasses}
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                          <Mail size={14} className="text-saffron" />
                          Email <span className="text-saffron">*</span>
                        </label>
                        <input
                          type="email"
                          name="customerEmail"
                          value={form.customerEmail}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={inputClasses}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                        <Phone size={14} className="text-saffron" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="customerPhone"
                        value={form.customerPhone}
                        onChange={handleChange}
                        placeholder="+91 99999 99999"
                        className={inputClasses}
                      />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                          <Calendar size={14} className="text-saffron" />
                          {bookingType === "course"
                            ? "Preferred Start Date"
                            : "Date"}{" "}
                          <span className="text-saffron">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          min={minDate}
                          className={inputClasses}
                          required
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                          <Clock size={14} className="text-saffron" />
                          {bookingType === "course"
                            ? "Preferred Time"
                            : "Time"}{" "}
                          <span className="text-saffron">*</span>
                        </label>
                        <select
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className={inputClasses}
                          required
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-body text-charcoal/85 mb-1.5">
                        <FileText size={14} className="text-saffron" />
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder={
                          bookingType === "course"
                            ? "Any questions about the course, prior experience, or special requirements..."
                            : "Any specific concerns, health conditions, or preferences you'd like us to know..."
                        }
                        rows={4}
                        className={cn(inputClasses, "resize-none")}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className={cn(
                        "magnetic-btn w-full px-8 py-4 bg-saffron text-white font-body font-semibold rounded-xl text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                        submitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-saffron-light"
                      )}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {bookingType === "course"
                            ? "Enrolling..."
                            : "Booking..."}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {bookingType === "course"
                            ? "Confirm Enrollment"
                            : "Confirm Booking"}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </ScrollReveal>

            {/* Side Panel */}
            <ScrollReveal direction="right" className="lg:col-span-2">
              <div className="space-y-6">
                {/* How Booking Works */}
                <div>
                  <h2 className="text-heading-xl font-heading text-charcoal mb-6">
                    How It Works
                  </h2>
                  <div className="space-y-4">
                    {steps.map((step) => (
                      <div
                        key={step.num}
                        className="flex gap-4 p-4 rounded-xl bg-cream border border-saffron/10 hover:border-saffron/20 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-heading font-bold text-sm">
                            {step.num}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-heading text-lg text-charcoal mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-charcoal/80 font-body leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-6 rounded-xl bg-white border border-saffron/10 shadow-sm">
                  <h3 className="font-heading text-lg text-charcoal mb-4">
                    Have Questions?
                  </h3>
                  <p className="text-sm text-charcoal/80 font-body mb-5 leading-relaxed">
                    Need help choosing the right service or course? We&apos;re
                    here to guide you.
                  </p>

                  <div className="space-y-3">
                    <a
                      href="mailto:info@neodivine.com"
                      className="flex items-center gap-3 p-3 rounded-lg bg-cream hover:bg-sandal-light/30 transition-colors text-sm font-body text-charcoal/85 hover:text-saffron"
                    >
                      <Mail size={16} className="text-saffron flex-shrink-0" />
                      info@neodivine.com
                    </a>
                    <a
                      href="tel:+919999999999"
                      className="flex items-center gap-3 p-3 rounded-lg bg-cream hover:bg-sandal-light/30 transition-colors text-sm font-body text-charcoal/85 hover:text-saffron"
                    >
                      <Phone size={16} className="text-gold flex-shrink-0" />
                      +91 99999 99999
                    </a>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%20would%20like%20to%20book%20a%20session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-body font-semibold rounded-xl text-sm hover:bg-[#20BA5C] transition-colors"
                >
                  <MessageCircle size={20} />
                  Urgent? Chat on WhatsApp
                </a>

                {/* Note */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-saffron/5 to-gold/5 border border-saffron/10">
                  <p className="text-xs text-charcoal/85 font-body leading-relaxed">
                    <span className="font-semibold text-charcoal/85">
                      Note:
                    </span>{" "}
                    Healing sessions are typically 60-90 minutes. Course
                    durations vary — check individual course pages for details.
                    Please arrive 10 minutes early for your first visit.
                    Cancellations are accepted up to 24 hours in advance.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-spin-slow w-12 h-12 border-2 border-saffron border-t-transparent rounded-full" />
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
