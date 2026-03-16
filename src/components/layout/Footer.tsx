"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/purpose", label: "Our Purpose" },
  { href: "/philosophy", label: "Our Philosophy" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/events", label: "Events" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/products?category=spiritual-sprays", label: "Spiritual Sprays" },
  { href: "/products?category=planetary-sprays", label: "Planetary Sprays" },
  { href: "/products?category=chakra-sprays", label: "Chakra Sprays" },
  { href: "/products?category=dhoop-incense", label: "Dhoop & Incense" },
  { href: "/products?category=bath-body", label: "Bath & Body" },
];

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  { href: "https://wa.me/919999999999", icon: Phone, label: "WhatsApp" },
];

/* Lotus SVG divider for top of footer */
function LotusFooterDivider() {
  return (
    <div className="relative flex items-center justify-center py-0">
      {/* Center line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
      {/* Lotus */}
      <svg
        viewBox="0 0 80 40"
        fill="none"
        className="relative w-20 h-10 z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background fill to cut the line */}
        <rect x="10" y="5" width="60" height="30" fill="#3D2B1F" />
        {/* Center petal */}
        <path
          d="M40 5C40 5 34 15 34 22C34 25.3 36.7 28 40 28C43.3 28 46 25.3 46 22C46 15 40 5 40 5Z"
          fill="#E07C24"
          opacity="0.7"
        />
        {/* Left petal */}
        <path
          d="M28 14C28 14 24 21 27 25C29 27.5 33 27 35 24.5C35 24.5 31 23 29 20C27.4 17.8 28 14 28 14Z"
          fill="#C8A951"
          opacity="0.5"
        />
        {/* Right petal */}
        <path
          d="M52 14C52 14 56 21 53 25C51 27.5 47 27 45 24.5C45 24.5 49 23 51 20C52.6 17.8 52 14 52 14Z"
          fill="#C8A951"
          opacity="0.5"
        />
        {/* Far left petal */}
        <path
          d="M18 20C18 20 18 27 22 29C24.5 30.3 27 29 28.5 27C28.5 27 24 26 21 23.5C19 21.8 18 20 18 20Z"
          fill="#DCC078"
          opacity="0.3"
        />
        {/* Far right petal */}
        <path
          d="M62 20C62 20 62 27 58 29C55.5 30.3 53 29 51.5 27C51.5 27 56 26 59 23.5C61 21.8 62 20 62 20Z"
          fill="#DCC078"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-dark relative overflow-hidden">
      {/* Lotus divider at top */}
      <LotusFooterDivider />

      {/* Decorative warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-saffron/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide mx-auto section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <ScrollReveal direction="up" delay={0}>
            <div>
              <Link href="/" className="inline-block mb-4">
                <span className="text-3xl font-heading font-bold text-gradient-gold">
                  NEH
                </span>
              </Link>
              <p className="text-sm font-heading italic text-saffron-light/70 mb-2">
                &ldquo;Making Moment Magical&rdquo;
              </p>
              <p className="text-xs font-body text-gold/40 tracking-wider mb-4">
                Jai Jinendra
              </p>
              <p className="text-sandal/60 text-sm font-body leading-relaxed mb-6">
                NEH Wellness Centre brings you NEO Divine Products -- premium
                spiritual wellness products crafted with intention and purity.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-saffron/20 flex items-center justify-center text-gold/60 hover:text-saffron hover:bg-saffron/10 hover:border-saffron/40 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <h4 className="text-lg font-heading font-semibold text-cream mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sandal/50 hover:text-saffron transition-colors duration-300 font-body flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-saffron"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Products */}
          <ScrollReveal direction="up" delay={0.2}>
            <div>
              <h4 className="text-lg font-heading font-semibold text-cream mb-6">
                Products
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sandal/50 hover:text-saffron transition-colors duration-300 font-body flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-saffron"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Connect */}
          <ScrollReveal direction="up" delay={0.3}>
            <div>
              <h4 className="text-lg font-heading font-semibold text-cream mb-6">
                Connect
              </h4>

              <div className="space-y-4 mb-8">
                <a
                  href="mailto:info@neodivine.com"
                  className="flex items-center gap-3 text-sm text-sandal/50 hover:text-saffron transition-colors font-body"
                >
                  <Mail size={16} className="text-saffron/50 flex-shrink-0" />
                  info@neodivine.com
                </a>
                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-3 text-sm text-sandal/50 hover:text-saffron transition-colors font-body"
                >
                  <Phone size={16} className="text-saffron/50 flex-shrink-0" />
                  +91 99999 99999
                </a>
                <div className="flex items-start gap-3 text-sm text-sandal/50 font-body">
                  <MapPin size={16} className="text-saffron/50 flex-shrink-0 mt-0.5" />
                  Mumbai, India
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-sm text-sandal/60 font-body mb-3">
                  Subscribe to our newsletter
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/5 border border-saffron/20 rounded-lg text-sm text-cream placeholder:text-sandal/30 focus:outline-none focus:border-saffron/50 transition-colors font-body"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-saffron text-white rounded-lg text-sm font-body font-semibold hover:bg-saffron-light transition-colors"
                  >
                    {subscribed ? "Sent!" : "Join"}
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="divider-saffron mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sandal/30 font-body">
            &copy; {new Date().getFullYear()} NEO Divine Products by NEH
            Wellness Centre. All rights reserved.
          </p>
          <p className="text-sm text-sandal/30 font-body flex items-center gap-2">
            Parasparopagraho Jivanam — Live and Let Live
            {/* Three dots — Ratnatraya */}
            <span className="flex items-center gap-1 ml-1">
              <span className="w-1 h-1 rounded-full bg-saffron/40" />
              <span className="w-1 h-1 rounded-full bg-saffron/40" />
              <span className="w-1 h-1 rounded-full bg-saffron/40" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
