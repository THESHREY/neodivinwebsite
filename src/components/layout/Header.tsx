"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Booking" },
  { href: "/events", label: "Events" },
  { href: "/courses", label: "Courses" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

const menuVariants = {
  closed: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  open: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const linkVariants = {
  closed: { x: 50, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.06, duration: 0.4 },
  }),
};

/* Small lotus SVG icon for branding */
function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C12 2 9 7 9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10C15 7 12 2 12 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M6 8C6 8 4 12 5.5 14.5C6.5 16 8.5 16 10 14.5C10 14.5 8 13 7 11C6.2 9.4 6 8 6 8Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M18 8C18 8 20 12 18.5 14.5C17.5 16 15.5 16 14 14.5C14 14.5 16 13 17 11C17.8 9.4 18 8 18 8Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M3 13C3 13 3 17 5.5 18.5C7 19.5 9 18.5 10 17C10 17 7 16 5 14.5C3.8 13.6 3 13 3 13Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M21 13C21 13 21 17 18.5 18.5C17 19.5 15 18.5 14 17C14 17 17 16 19 14.5C20.2 13.6 21 13 21 13Z"
        fill="currentColor"
        opacity="0.35"
      />
      <path
        d="M8 19C8 19 10 21 12 21C14 21 16 19 16 19C16 19 14.5 20 12 20C9.5 20 8 19 8 19Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems: itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream/90 backdrop-blur-xl shadow-lg shadow-charcoal/5 border-b border-saffron/10"
            : "bg-transparent"
        )}
      >
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center gap-2">
                <LotusIcon
                  className={cn(
                    "w-6 h-6 transition-colors duration-300",
                    scrolled ? "text-saffron" : "text-saffron-light"
                  )}
                />
                <span className="text-2xl md:text-3xl font-heading font-bold text-gradient-gold tracking-wide">
                  NEH
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-saffron/60 via-gold to-transparent" />
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    "text-xs font-body uppercase tracking-[0.25em] leading-tight transition-colors duration-300",
                    scrolled ? "text-charcoal/85" : "text-gold-light/90"
                  )}
                >
                  NEO Divine
                </p>
                <p
                  className={cn(
                    "text-[10px] font-body uppercase tracking-[0.2em] leading-tight transition-colors duration-300",
                    scrolled ? "text-charcoal/80" : "text-cream/60"
                  )}
                >
                  Products
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 xl:px-4 py-2 text-sm font-body font-medium transition-colors duration-300",
                    isActive(link.href)
                      ? scrolled
                        ? "text-saffron"
                        : "text-gold"
                      : scrolled
                        ? "text-charcoal/85 hover:text-saffron"
                        : "text-cream/80 hover:text-gold-light"
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-saffron to-gold rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                className={cn(
                  "relative p-2 transition-colors duration-300",
                  scrolled
                    ? "text-charcoal/80 hover:text-saffron"
                    : "text-cream/80 hover:text-saffron-light"
                )}
              >
                <ShoppingBag size={22} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-saffron text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "lg:hidden p-2 transition-colors",
                  scrolled
                    ? "text-charcoal/85 hover:text-saffron"
                    : "text-cream/80 hover:text-gold"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-cream lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <LotusIcon className="w-5 h-5 text-saffron" />
                    <span className="text-xl font-heading font-bold text-gradient-gold">
                      NEH
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-charcoal/80 hover:text-saffron transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between py-3 px-4 rounded-lg text-base font-body transition-all duration-300",
                          isActive(link.href)
                            ? "text-saffron bg-saffron/10 font-semibold"
                            : "text-charcoal/85 hover:text-saffron hover:bg-saffron/5"
                        )}
                      >
                        {link.label}
                        <ChevronRight
                          size={16}
                          className="opacity-40"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-10 pt-8 border-t border-saffron/15">
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 py-3 px-4 text-charcoal/85 hover:text-saffron transition-colors"
                  >
                    <ShoppingBag size={20} />
                    <span className="font-body">
                      Cart{itemCount > 0 && ` (${itemCount})`}
                    </span>
                  </Link>
                </div>

                <div className="mt-8 px-4 flex items-center gap-2">
                  {/* Diya flame icon */}
                  <LotusIcon className="w-4 h-4 text-saffron/50" />
                  <p className="text-xs text-charcoal/30 font-body tracking-wider uppercase">
                    Making Moment Magical
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
