"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.3 },
  }),
  exit: { opacity: 0, x: 30, transition: { duration: 0.2 } },
};

/* Simple lotus SVG for empty state */
function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M32 12c0 0-8 10-8 22s8 18 8 18 8-6 8-18S32 12 32 12z"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M32 52c0 0-14-4-18-16S18 16 18 16s6 8 14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M32 52c0 0 14-4 18-16S46 16 46 16s-6 8-14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M32 52c0 0-20-2-26-14 0 0 8-6 14-2s12 16 12 16z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M32 52c0 0 20-2 26-14 0 0-8-6-14-2s-12 16-12 16z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
  } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay — warm charcoal tint */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-label="Close cart"
          />

          {/* Drawer — warm cream bg */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-cream shadow-2xl shadow-charcoal/20 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-saffron/20">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-saffron" />
                <h2 className="text-xl font-heading font-semibold text-charcoal">
                  Your Cart
                </h2>
                {totalItems > 0 && (
                  <span className="px-2 py-0.5 bg-saffron/15 text-saffron text-xs font-body font-semibold rounded-full">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-charcoal/85 hover:text-charcoal hover:bg-charcoal/5 rounded-lg transition-colors duration-200"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              /* Empty State — warm messaging with lotus icon */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-24 h-24 rounded-full bg-saffron/10 flex items-center justify-center mb-6">
                  <LotusIcon className="w-12 h-12 text-saffron" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm text-charcoal/85 font-body mb-8 max-w-xs">
                  Discover our divine collection of spiritual wellness products
                  and add something sacred to your cart.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="magnetic-btn inline-flex items-center gap-2 px-6 py-3 bg-saffron text-white font-body font-semibold text-sm rounded-full hover:bg-saffron-dark transition-colors duration-300"
                >
                  Browse Products
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex gap-4 p-3 rounded-xl bg-white border border-gold/15 hover:border-gold/30 transition-colors duration-200"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image && item.image !== "/images/product-placeholder.jpg" ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-saffron/20 to-gold/20 flex items-center justify-center">
                              <span className="text-saffron/70 font-heading font-bold text-lg">
                                {item.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-heading font-semibold text-charcoal truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-charcoal/80 font-body mt-0.5">
                            {item.packSize}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-body font-semibold text-saffron">
                              {formatPrice(item.price * item.quantity)}
                            </span>

                            {/* Quantity Controls — saffron border */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-md border border-saffron/30 text-charcoal/80 hover:text-saffron hover:border-saffron/60 transition-colors duration-200"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-body font-medium text-charcoal">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-md border border-saffron/30 text-charcoal/80 hover:text-saffron hover:border-saffron/60 transition-colors duration-200"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove — terra/red */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="self-start p-1.5 text-charcoal/30 hover:text-terra transition-colors duration-200"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer — sandal-light bg */}
                <div className="bg-sandal-light border-t border-gold/15 px-6 py-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal/80 font-body">Subtotal</span>
                    <span className="text-lg font-heading font-bold text-charcoal">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/80 font-body">
                    Shipping and taxes calculated at checkout
                  </p>
                  <div className="flex flex-col gap-3">
                    {/* Checkout — saffron bg, white text */}
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="magnetic-btn block text-center px-6 py-3.5 bg-saffron text-white font-body font-semibold text-sm rounded-full hover:bg-saffron-dark hover:shadow-lg hover:shadow-saffron/20 transition-all duration-300"
                    >
                      Checkout
                    </Link>
                    {/* View Cart — charcoal bg, cream text */}
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="block text-center px-6 py-3 bg-charcoal text-cream font-body font-medium text-sm rounded-full hover:bg-charcoal-light transition-all duration-300"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
