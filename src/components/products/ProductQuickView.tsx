"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/utils";

interface ProductData {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  category: string;
  image?: string;
  packSize: string;
  benefits?: string;
  description?: string;
}

interface ProductQuickViewProps {
  product: ProductData | null;
  isOpen: boolean;
  onClose: () => void;
}

/* ── Warm gradient per category ─────────────────────────────── */
const categoryGradients: Record<string, string> = {
  "spiritual-sprays": "linear-gradient(135deg, #E07C24, #F0A050)",
  "planetary-sprays": "linear-gradient(135deg, #C8A951, #DCC078)",
  "chakra-sprays": "linear-gradient(135deg, #6B8F71, #8AAF8F)",
  "dhoop-incense": "linear-gradient(135deg, #C1694F, #D4876E)",
  "bath-body": "linear-gradient(135deg, #7B2D3B, #9E4A5A)",
  "Spiritual Sprays": "linear-gradient(135deg, #E07C24, #F0A050)",
  "Planetary Sprays": "linear-gradient(135deg, #C8A951, #DCC078)",
  "Chakra Sprays": "linear-gradient(135deg, #6B8F71, #8AAF8F)",
  "Dhoop & Incense": "linear-gradient(135deg, #C1694F, #D4876E)",
  "Bath & Body": "linear-gradient(135deg, #7B2D3B, #9E4A5A)",
};

const defaultGradient = "linear-gradient(135deg, #DCC5A0, #EDD8B8)";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

function getCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
}: ProductQuickViewProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAdded(false);
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
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!product) return null;

  const gradient =
    categoryGradients[product.category] || defaultGradient;

  const hasRealImage =
    product.image &&
    product.image !== "/images/product-placeholder.jpg" &&
    product.image.startsWith("http");

  const benefitsList = product.benefits
    ? product.benefits
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean)
    : [];

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image || "",
        packSize: product.packSize,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — warm charcoal overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[80] bg-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl shadow-charcoal/20 gold-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-charcoal/80 hover:text-charcoal hover:bg-white transition-colors shadow-sm"
                aria-label="Close quick view"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image — warm gradient placeholder */}
                <div className="relative aspect-square md:aspect-auto md:min-h-[400px]">
                  {hasRealImage ? (
                    <img
                      src={product.image!}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none min-h-[300px]"
                      style={{ background: gradient }}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-white/30 flex items-center justify-center">
                          <span className="text-3xl font-heading font-bold text-white/90">
                            {product.name
                              .split(" ")
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-white/60 text-sm font-body">
                          {getCategoryLabel(product.category)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details — charcoal text, saffron accents */}
                <div className="p-6 md:p-8 flex flex-col">
                  <span className="text-xs font-body font-medium uppercase tracking-wider text-saffron mb-2">
                    {getCategoryLabel(product.category)}
                  </span>

                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal mb-2">
                    {product.name}
                  </h2>

                  <p className="text-sm text-charcoal/80 font-body mb-4">
                    {product.packSize}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl font-heading font-bold text-charcoal">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && product.comparePrice > product.price && (
                      <span className="text-base font-body text-charcoal/80 line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {product.description && (
                    <p className="text-sm text-charcoal/80 font-body leading-relaxed mb-5">
                      {product.description}
                    </p>
                  )}

                  {/* Benefits — sage check icons */}
                  {benefitsList.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-body font-semibold text-charcoal mb-2">
                        Benefits
                      </h4>
                      <ul className="space-y-1.5">
                        {benefitsList.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-charcoal/80 font-body"
                          >
                            <Check
                              size={14}
                              className="text-sage mt-0.5 flex-shrink-0"
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto space-y-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-body font-medium text-charcoal/80">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-saffron/30 text-charcoal/85 hover:border-saffron hover:text-saffron transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-base font-body font-semibold text-charcoal">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-saffron/30 text-charcoal/85 hover:border-saffron hover:text-saffron transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart — saffron bg */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      disabled={added}
                      className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-body font-semibold text-sm transition-all duration-300 ${
                        added
                          ? "bg-sage text-white"
                          : "bg-saffron text-white hover:bg-saffron-dark hover:shadow-lg hover:shadow-saffron/25"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {added ? (
                          <motion.span
                            key="done"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <Check size={16} />
                            Added to Cart!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2"
                          >
                            <ShoppingCart size={16} />
                            Add to Cart - {formatPrice(product.price * quantity)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
