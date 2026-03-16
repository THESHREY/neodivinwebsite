"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Eye } from "lucide-react";
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
}

interface ProductCardProps {
  product: ProductData;
  onQuickView?: (product: ProductData) => void;
}

/* ── Warm gradient per category ─────────────────────────────── */
const categoryGradients: Record<string, string> = {
  "Spiritual Sprays": "linear-gradient(135deg, #E07C24, #F0A050)",
  "spiritual-sprays": "linear-gradient(135deg, #E07C24, #F0A050)",
  "Planetary Sprays": "linear-gradient(135deg, #C8A951, #DCC078)",
  "planetary-sprays": "linear-gradient(135deg, #C8A951, #DCC078)",
  "Chakra Sprays": "linear-gradient(135deg, #6B8F71, #8AAF8F)",
  "chakra-sprays": "linear-gradient(135deg, #6B8F71, #8AAF8F)",
  "Dhoop & Incense": "linear-gradient(135deg, #C1694F, #D4876E)",
  "dhoop-incense": "linear-gradient(135deg, #C1694F, #D4876E)",
  "Bath & Body": "linear-gradient(135deg, #7B2D3B, #9E4A5A)",
  "bath-body": "linear-gradient(135deg, #7B2D3B, #9E4A5A)",
};

const defaultGradient = "linear-gradient(135deg, #DCC5A0, #EDD8B8)";

/* ── Category badge colors (warm pills) ─────────────────────── */
const categoryBadgeColors: Record<string, string> = {
  "Spiritual Sprays": "bg-saffron/90 text-white",
  "spiritual-sprays": "bg-saffron/90 text-white",
  "Planetary Sprays": "bg-gold/90 text-charcoal",
  "planetary-sprays": "bg-gold/90 text-charcoal",
  "Chakra Sprays": "bg-sage/90 text-white",
  "chakra-sprays": "bg-sage/90 text-white",
  "Dhoop & Incense": "bg-terra/90 text-white",
  "dhoop-incense": "bg-terra/90 text-white",
  "Bath & Body": "bg-maroon/90 text-white",
  "bath-body": "bg-maroon/90 text-white",
};

const defaultBadge = "bg-sandal text-charcoal";

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const gradient = categoryGradients[product.category] || defaultGradient;
  const badgeClass = categoryBadgeColors[product.category] || defaultBadge;

  const hasRealImage =
    product.image &&
    product.image !== "/images/product-placeholder.jpg" &&
    product.image.startsWith("http");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image || "",
      packSize: product.packSize,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const discount =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
      : null;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="product-card-hover rounded-2xl overflow-hidden bg-white gold-border hover:shadow-[0_16px_48px_rgba(200,169,81,0.18)] transition-all duration-400">
          {/* Image Area */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {hasRealImage ? (
              <img
                src={product.image!}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{ background: gradient }}
              >
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <div className="w-32 h-32 rounded-full border-2 border-white/60" />
                  <div className="absolute w-24 h-24 rounded-full border border-white/40" />
                </div>
                {/* Product name overlay */}
                <div className="relative text-center px-4">
                  <span className="text-3xl font-heading font-bold text-white drop-shadow-sm tracking-wider">
                    {getInitials(product.name)}
                  </span>
                  <p className="mt-1 text-xs text-white/70 font-body tracking-wide">
                    {product.name}
                  </p>
                </div>
              </div>
            )}

            {/* Category Badge — warm colored pill */}
            <span
              className={`absolute top-3 left-3 px-3 py-1 backdrop-blur-sm text-[11px] font-body font-medium uppercase tracking-wider rounded-full ${badgeClass}`}
            >
              {getCategoryLabel(product.category)}
            </span>

            {/* Discount / Featured Badge */}
            {discount && (
              <span className="absolute top-3 right-3 px-2.5 py-1 bg-gold text-charcoal text-[11px] font-body font-bold rounded-full shadow-sm">
                -{discount}%
              </span>
            )}

            {/* Quick View Overlay */}
            {onQuickView && (
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-300 flex items-center justify-center">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleQuickView}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 bg-white/90 backdrop-blur-sm rounded-full text-charcoal hover:bg-white shadow-lg"
                  aria-label={`Quick view ${product.name}`}
                >
                  <Eye size={18} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-heading font-semibold text-charcoal leading-snug mb-1 group-hover:text-saffron transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs text-charcoal/80 font-body mb-3">
              {product.packSize}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-heading font-bold text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-sm font-body text-charcoal/80 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Add to Cart Button — saffron bg, white text, rounded-full */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full font-body font-semibold text-sm transition-all duration-300 ${
                added
                  ? "bg-sage text-white"
                  : "bg-saffron text-white hover:bg-saffron-dark hover:shadow-lg hover:shadow-saffron/25"
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} />
                    Added!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
