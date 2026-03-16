"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  Circle,
  Flame,
  Droplets,
  LayoutGrid,
  X,
  Bell,
  Gem,
  Flower2,
  Triangle,
  Leaf,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import FloatingParticles from "@/components/animations/FloatingParticles";
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

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  category: string;
  packSize: string;
  image: string;
  description: string;
  featured: boolean;
}

const categoryFilters = [
  { slug: "all", label: "All Products", icon: LayoutGrid },
  { slug: "spiritual-sprays", label: "Spiritual Sprays", icon: Sparkles },
  { slug: "planetary-sprays", label: "Planetary Sprays", icon: Sun },
  { slug: "chakra-sprays", label: "Chakra Sprays", icon: Circle },
  { slug: "dhoop-incense", label: "Dhoop & Incense", icon: Flame },
  { slug: "bath-body", label: "Bath & Body", icon: Droplets },
];

function categoryGradient(cat: string): string {
  switch (cat.toLowerCase().replace(/\s+/g, "-")) {
    case "spiritual-sprays":
      return "from-saffron/60 via-terra/40 to-charcoal-light";
    case "planetary-sprays":
      return "from-gold/50 via-sandal/40 to-charcoal-light";
    case "chakra-sprays":
      return "from-sage/50 via-sage-light/30 to-charcoal-light";
    case "dhoop-incense":
      return "from-terra/50 via-charcoal-light/40 to-charcoal";
    case "bath-body":
      return "from-maroon/40 via-terra/30 to-charcoal-light";
    default:
      return "from-saffron/30 to-charcoal-light";
  }
}

function categoryBadgeColor(cat: string): string {
  switch (cat.toLowerCase().replace(/\s+/g, "-")) {
    case "spiritual-sprays":
      return "bg-saffron/10 text-saffron-dark";
    case "planetary-sprays":
      return "bg-gold/10 text-gold-dark";
    case "chakra-sprays":
      return "bg-sage/10 text-sage-dark";
    case "dhoop-incense":
      return "bg-terra/10 text-terra-dark";
    case "bath-body":
      return "bg-maroon/10 text-maroon";
    default:
      return "bg-saffron/10 text-saffron-dark";
  }
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products ?? d ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase().replace(/\s+/g, "-") === activeCategory
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
        <FloatingParticles count={25} speed={0.3} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <LotusDecoration className="w-24 h-12 opacity-10" />
        </div>

        <div className="relative z-10 text-center px-4 py-32">
          <ScrollReveal>
            <p className="text-saffron/80 font-body text-sm uppercase tracking-[0.3em] mb-6">
              Handcrafted with Love
            </p>
            <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-gradient-gold mb-4">
              Divine Collection
            </h1>
            <p className="text-cream/50 font-body max-w-xl mx-auto">
              Premium spiritual wellness products crafted with intention,
              purity, and purpose
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="section-padding bg-gradient-section">
        <div className="container-wide mx-auto">
          {/* Search — warm styling with gold focus ring */}
          <ScrollReveal>
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/80"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-saffron/15 rounded-full text-charcoal font-body text-sm placeholder:text-charcoal/80 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-saffron/40 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/80 hover:text-charcoal"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Category Tabs — saffron active state */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300",
                    activeCategory === cat.slug
                      ? "bg-saffron text-white shadow-md shadow-saffron/20"
                      : "bg-white text-charcoal/80 hover:bg-saffron/10 hover:text-charcoal border border-saffron/15"
                  )}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="h-56 bg-sandal/20 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-20 bg-sandal/20 animate-pulse rounded" />
                    <div className="h-5 w-3/4 bg-sandal/20 animate-pulse rounded" />
                    <div className="h-4 w-1/3 bg-sandal/20 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles size={48} className="text-saffron/30 mx-auto mb-4" />
              <h3 className="text-heading-lg font-heading text-charcoal mb-2">
                No Products Found
              </h3>
              <p className="text-charcoal/85 font-body mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "No products in this category yet."}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-saffron font-body font-semibold text-sm uppercase tracking-wider"
              >
                View All Products
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                    whileHover={{ y: -8 }}
                    className="product-card-hover bg-white rounded-2xl overflow-hidden border border-saffron/10 group"
                  >
                    {/* Image */}
                    <Link href={`/products/${product.slug}`}>
                      <div
                        className={cn(
                          "h-56 bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
                          categoryGradient(product.category)
                        )}
                      >
                        <span className="text-cream/30 font-heading text-lg text-center px-4">
                          {product.name}
                        </span>
                        <div className="absolute inset-0 bg-saffron/0 group-hover:bg-saffron/5 transition-colors duration-500" />
                        {product.featured && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-saffron text-white text-[10px] font-body font-bold uppercase tracking-wider rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-5">
                      <span
                        className={cn(
                          "inline-block px-2.5 py-0.5 rounded-full text-[10px] font-body font-semibold uppercase tracking-wider mb-2",
                          categoryBadgeColor(product.category)
                        )}
                      >
                        {product.category.replace(/-/g, " ")}
                      </span>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-heading text-lg text-charcoal mb-1 line-clamp-1 hover:text-saffron transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      {product.packSize && (
                        <p className="text-xs text-charcoal/80 font-body mb-2">
                          {product.packSize}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-heading font-bold text-charcoal">
                            {formatPrice(product.price, "INR")}
                          </span>
                          {product.comparePrice && (
                            <span className="text-sm text-charcoal/80 line-through font-body">
                              {formatPrice(product.comparePrice, "INR")}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            addItem({
                              id: product.id,
                              name: product.name,
                              slug: product.slug,
                              price: product.price,
                              image: product.image,
                              packSize: product.packSize || "",
                            })
                          }
                          className="p-2.5 bg-saffron text-white rounded-full hover:bg-saffron-light transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section-padding bg-gradient-sacred relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-saffron/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-wide mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 rounded-full mb-6">
                <Sparkles size={16} className="text-saffron" />
                <span className="text-sm font-body font-semibold text-saffron-dark uppercase tracking-wider">
                  New Arrivals
                </span>
              </div>
              <h2 className="text-display md:text-display-lg font-heading text-charcoal mb-4">
                Coming Soon
              </h2>
              <div className="w-20 lotus-divider mx-auto mb-6" />
              <p className="text-charcoal/80 font-body max-w-xl mx-auto">
                More spiritual products are on the way
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {[
              {
                name: "Crystal Healing Set",
                desc: "Curated collection of healing crystals for energy work and meditation.",
                icon: Gem,
                gradient: "from-saffron/30 via-gold/20 to-sandal/30",
              },
              {
                name: "Meditation Cushion Collection",
                desc: "Handcrafted cushions designed for comfortable, prolonged meditation practice.",
                icon: Flower2,
                gradient: "from-sage/30 via-sage-light/20 to-sandal/20",
              },
              {
                name: "Sacred Geometry Wall Art",
                desc: "Beautiful geometric art pieces that harmonize and elevate your living space.",
                icon: Triangle,
                gradient: "from-gold/30 via-saffron/20 to-terra/20",
              },
              {
                name: "Organic Herbal Tea Collection",
                desc: "Premium organic teas blended for spiritual clarity and inner balance.",
                icon: Leaf,
                gradient: "from-terra/25 via-sage/20 to-sandal/20",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.name} direction="up" delay={i * 0.1}>
                <div
                  className={cn(
                    "relative rounded-2xl overflow-hidden border border-saffron/10 bg-gradient-to-br p-6 h-full flex flex-col",
                    item.gradient
                  )}
                >
                  {/* Coming Soon badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm text-saffron-dark text-[10px] font-body font-bold uppercase tracking-wider rounded-full border border-saffron/15">
                    Coming Soon
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-saffron" />
                  </div>

                  <h3 className="font-heading text-lg text-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-charcoal/75 font-body leading-relaxed mb-5 flex-1">
                    {item.desc}
                  </p>

                  <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm text-charcoal/85 text-sm font-body font-medium rounded-full border border-saffron/15 hover:bg-saffron hover:text-white hover:border-saffron transition-all duration-300 w-full justify-center group">
                    <Bell
                      size={14}
                      className="group-hover:animate-bounce"
                    />
                    Notify Me
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Tagline */}
          <ScrollReveal>
            <div className="text-center">
              <div className="max-w-4xl mx-auto px-6 py-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-saffron/10">
                <p className="text-sm md:text-base font-heading text-charcoal/85 leading-relaxed tracking-wide uppercase">
                  <span className="text-saffron">Cleans Your Aura</span>
                  {" \u2022 "}
                  <span className="text-gold-dark">Elevate Your Spirit</span>
                  {" \u2022 "}
                  <span className="text-sage-dark">Align Your Energy</span>
                  {" \u2022 "}
                  <span className="text-terra">Honour Your Journey</span>
                  {" \u2022 "}
                  <span className="text-saffron">Balance Your Mind</span>
                  {" \u2022 "}
                  <span className="text-gold-dark">Awaken Your Potential</span>
                  {" \u2022 "}
                  <span className="text-sage-dark">Expand Your Limits</span>
                  {" \u2022 "}
                  <span className="text-maroon">Rise Into Your True Self</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-spin-slow w-12 h-12 border-2 border-saffron border-t-transparent rounded-full" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
