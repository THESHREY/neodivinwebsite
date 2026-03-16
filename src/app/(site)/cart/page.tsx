"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Package,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";

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

/* ---------- Diya SVG for empty cart ---------- */
function DiyaIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame outer */}
      <ellipse cx="60" cy="30" rx="10" ry="22" fill="#E07C24" opacity="0.3" />
      {/* Flame inner */}
      <ellipse cx="60" cy="28" rx="5" ry="14" fill="#C8A951" opacity="0.5" />
      {/* Flame core */}
      <ellipse cx="60" cy="26" rx="2.5" ry="8" fill="#DCC078" opacity="0.7" />
      {/* Diya body */}
      <path d="M35 70 Q40 55 60 52 Q80 55 85 70 Q85 80 75 82 L45 82 Q35 80 35 70Z" fill="#C8A951" opacity="0.25" />
      <ellipse cx="60" cy="70" rx="25" ry="10" fill="#DCC5A0" opacity="0.3" />
      {/* Base */}
      <rect x="45" y="82" rx="3" width="30" height="6" fill="#C8A951" opacity="0.2" />
      {/* Wick */}
      <line x1="60" y1="52" x2="60" y2="42" stroke="#E07C24" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function categoryGradient(slug: string): string {
  return "from-saffron/30 via-sandal/20 to-charcoal-light/60";
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();

  return (
    <section className="pt-28 pb-20 min-h-screen bg-gradient-section">
      <div className="container-wide mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-display font-heading text-charcoal">
                Your Cart
              </h1>
              <p className="text-charcoal/85 font-body text-sm mt-1">
                {totalItems === 0
                  ? "Your cart is empty"
                  : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-charcoal/80 hover:text-red-500 font-body transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </ScrollReveal>

        {items.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              {/* Lotus/diya illustration for empty cart */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <DiyaIllustration className="w-24 h-24 animate-diya-flicker" />
              </div>
              <LotusDecoration className="w-20 h-10 opacity-20 mx-auto mb-4" />
              <h2 className="text-heading-xl font-heading text-charcoal mb-3">
                Your Cart is Empty
              </h2>
              <p className="text-charcoal/85 font-body mb-8 max-w-md mx-auto">
                Discover our divine collection of spiritual wellness products
                and add items to your cart.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors"
              >
                Start Shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl border border-saffron/10 p-4 md:p-6 flex gap-4 md:gap-6"
                  >
                    {/* Image placeholder — warm gradient */}
                    <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                      <div
                        className={cn(
                          "w-20 h-20 md:w-28 md:h-28 rounded-xl bg-gradient-to-br flex items-center justify-center",
                          categoryGradient(item.slug)
                        )}
                      >
                        <Package size={24} className="text-cream/30" />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/products/${item.slug}`}>
                            <h3 className="font-heading text-lg text-charcoal hover:text-saffron transition-colors line-clamp-1">
                              {item.name}
                            </h3>
                          </Link>
                          {item.packSize && (
                            <p className="text-xs text-charcoal/80 font-body mt-0.5">
                              {item.packSize}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-charcoal/30 hover:text-red-500 transition-colors flex-shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        {/* Quantity — saffron accents */}
                        <div className="flex items-center gap-0 border border-saffron/20 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1.5 text-charcoal/80 hover:bg-saffron/10 transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1.5 text-charcoal font-body font-semibold text-sm min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1.5 text-charcoal/80 hover:bg-saffron/10 transition-colors"
                            aria-label="Increase"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-heading font-bold text-lg text-charcoal">
                          {formatPrice(item.price * item.quantity, "INR")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <ScrollReveal direction="right">
                <div className="bg-white rounded-2xl p-6 md:p-8 sticky top-28 border border-saffron/10 shadow-lg shadow-saffron/5">
                  <h2 className="text-heading font-heading text-charcoal mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-charcoal/80">
                        Subtotal ({totalItems} items)
                      </span>
                      <span className="text-charcoal font-medium">
                        {formatPrice(totalPrice, "INR")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-body">
                      <span className="text-charcoal/80">Shipping</span>
                      <span className="text-charcoal/80 italic">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  <div className="divider-saffron mb-6" />

                  {/* Total — gold/saffron */}
                  <div className="flex justify-between mb-8">
                    <span className="font-heading text-lg text-charcoal">
                      Total
                    </span>
                    <span className="font-heading text-xl font-bold text-gradient-saffron">
                      {formatPrice(totalPrice, "INR")}
                    </span>
                  </div>

                  {/* Proceed to Checkout — saffron bg */}
                  <button className="w-full magnetic-btn px-8 py-4 bg-saffron text-white font-body font-semibold rounded-xl text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors mb-4">
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 text-sm text-charcoal/85 hover:text-saffron font-body transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
