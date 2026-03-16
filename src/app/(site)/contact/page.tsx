"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Send,
  MessageCircle,
  Clock,
  CheckCircle2,
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

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch {
      toast.error("Failed to send message. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-saffron/15 rounded-xl text-charcoal font-body text-sm placeholder:text-charcoal/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-saffron/40 transition-all duration-300";

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
              Get in Touch
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Contact Us
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              We&apos;d love to hear from you. Reach out for inquiries, orders,
              or to book a healing session.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <ScrollReveal direction="left" className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-saffron/10 shadow-lg shadow-saffron/5">
                <h2 className="text-heading-xl font-heading text-charcoal mb-2">
                  Send a Message
                </h2>
                <p className="text-charcoal/85 font-body text-sm mb-8">
                  Fill out the form below and we&apos;ll get back to you as
                  soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-body text-charcoal/85 mb-1.5">
                        Name <span className="text-saffron">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClasses}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-charcoal/85 mb-1.5">
                        Email <span className="text-saffron">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClasses}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-body text-charcoal/85 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 99999 99999"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body text-charcoal/85 mb-1.5">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select a subject</option>
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Order Support">Order Support</option>
                        <option value="Healing Session">Book a Healing Session</option>
                        <option value="Corporate Wellness">Corporate Wellness</option>
                        <option value="Wholesale">Wholesale Inquiry</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-body text-charcoal/85 mb-1.5">
                      Message <span className="text-saffron">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      className={cn(inputClasses, "resize-none")}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className={cn(
                      "magnetic-btn w-full px-8 py-4 bg-saffron text-white font-body font-semibold rounded-xl text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2",
                      sending
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-saffron-light"
                    )}
                  >
                    {sent ? (
                      <>
                        <CheckCircle2 size={18} />
                        Message Sent!
                      </>
                    ) : sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right" className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-heading-xl font-heading text-charcoal mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-charcoal/80 font-body leading-relaxed mb-8">
                    Have questions about our products or want to book a healing
                    session? We&apos;re here to help you on your spiritual
                    wellness journey.
                  </p>
                </div>

                <div className="space-y-5">
                  <a
                    href="mailto:info@neodivine.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-cream hover:bg-sandal-light/30 transition-colors group border border-saffron/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center group-hover:bg-saffron/20 transition-colors">
                      <Mail size={20} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/85 font-body uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-sm text-charcoal font-body font-medium">
                        info@neodivine.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+919999999999"
                    className="flex items-center gap-4 p-4 rounded-xl bg-cream hover:bg-sandal-light/30 transition-colors group border border-gold/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Phone size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/85 font-body uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-sm text-charcoal font-body font-medium">
                        +91 99999 99999
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-cream border border-saffron/10">
                    <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center">
                      <MapPin size={20} className="text-saffron" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/85 font-body uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-sm text-charcoal font-body font-medium">
                        Mumbai, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-cream border border-gold/10">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Clock size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/85 font-body uppercase tracking-wider">
                        Hours
                      </p>
                      <p className="text-sm text-charcoal font-body font-medium">
                        Mon - Sat: 10:00 AM - 7:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp — keep green */}
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-body font-semibold rounded-xl text-sm hover:bg-[#20BA5C] transition-colors"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>

                {/* Socials */}
                <div>
                  <p className="text-sm text-charcoal/85 font-body mb-3">
                    Follow us
                  </p>
                  <div className="flex gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-charcoal/85 hover:bg-saffron/10 hover:text-saffron transition-all duration-300 border border-saffron/10"
                        aria-label={s.label}
                      >
                        <s.icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map placeholder — warm sandal bg */}
                <div className="rounded-xl overflow-hidden border border-gold/20 h-48 bg-gradient-to-br from-sandal-light/40 to-cream flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-saffron/30 mx-auto mb-2" />
                    <p className="text-sm text-charcoal/80 font-body">
                      Mumbai, India
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
