"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Package,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  price: number;
  comparePrice?: number | null;
  category: string;
  packSize: string;
  image: string;
  featured: boolean;
}

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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((d) => {
        const prod = d.product ?? d;
        setProduct(prod);
        // Fetch related products
        if (prod?.category) {
          fetch(`/api/products?category=${encodeURIComponent(prod.category)}`)
            .then((r) => r.json())
            .then((rd) => {
              const all = rd.products ?? rd ?? [];
              setRelatedProducts(
                all.filter((p: Product) => p.slug !== slug).slice(0, 4)
              );
            })
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        packSize: product.packSize || "",
      },
      quantity
    );
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-gradient-section">
        <div className="container-wide mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-[500px] rounded-2xl bg-sandal/20 animate-pulse" />
            <div className="space-y-4 pt-4">
              <div className="h-4 w-24 bg-sandal/20 animate-pulse rounded" />
              <div className="h-8 w-3/4 bg-sandal/20 animate-pulse rounded" />
              <div className="h-6 w-1/3 bg-sandal/20 animate-pulse rounded" />
              <div className="h-32 w-full bg-sandal/20 animate-pulse rounded mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-gradient-section flex items-center justify-center">
        <div className="text-center">
          <Sparkles size={48} className="text-saffron/30 mx-auto mb-4" />
          <h2 className="text-heading-xl font-heading text-charcoal mb-2">
            Product Not Found
          </h2>
          <p className="text-charcoal/85 font-body mb-6">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-saffron font-body font-semibold text-sm uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const benefitsList = product.benefits
    ? product.benefits.split("\n").filter((b) => b.trim())
    : [];

  return (
    <>
      {/* Warm cream background */}
      <section className="pt-28 pb-20 bg-gradient-section">
        <div className="container-wide mx-auto px-4 md:px-8">
          {/* Back button */}
          <ScrollReveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-charcoal/80 hover:text-saffron font-body text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product image area with warm gradient */}
            <ScrollReveal direction="left">
              <div
                className={cn(
                  "h-[400px] md:h-[500px] rounded-2xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden border border-saffron/15",
                  categoryGradient(product.category)
                )}
              >
                <span className="text-cream/30 font-heading text-2xl text-center px-8">
                  {product.name}
                </span>
                <div className="absolute inset-0 shimmer-bg" />
                {product.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-saffron text-white text-xs font-body font-bold uppercase tracking-wider rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal direction="right">
              <div>
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-body font-semibold uppercase tracking-wider mb-4",
                    categoryBadgeColor(product.category)
                  )}
                >
                  {product.category.replace(/-/g, " ")}
                </span>

                <h1 className="text-display font-heading text-charcoal mb-4">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-heading-xl font-heading font-bold text-gradient-saffron">
                    {formatPrice(product.price, "INR")}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-charcoal/80 line-through font-body">
                      {formatPrice(product.comparePrice, "INR")}
                    </span>
                  )}
                </div>

                {product.packSize && (
                  <div className="flex items-center gap-2 mb-6 text-charcoal/80 font-body text-sm">
                    <Package size={16} className="text-saffron/60" />
                    Pack Size: {product.packSize}
                  </div>
                )}

                <p className="text-charcoal/85 font-body leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Benefits — sage check icons */}
                {benefitsList.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-heading font-heading text-charcoal mb-4">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {benefitsList.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-charcoal/85 font-body text-sm"
                        >
                          <Check
                            size={16}
                            className="text-sage mt-0.5 flex-shrink-0"
                          />
                          {benefit.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quantity + Add to Cart — saffron button */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-0 border border-saffron/20 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 text-charcoal/80 hover:bg-saffron/10 hover:text-charcoal transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-5 py-3 text-charcoal font-body font-semibold text-sm min-w-[48px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4 py-3 text-charcoal/80 hover:bg-saffron/10 hover:text-charcoal transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 magnetic-btn px-8 py-3.5 bg-saffron text-white font-body font-semibold rounded-xl text-sm uppercase tracking-wider hover:bg-saffron-light transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related Products — warm bg */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-gradient-sacred">
          <div className="container-wide mx-auto">
            <ScrollReveal>
              <h2 className="text-display font-heading text-charcoal mb-10 text-center">
                Related Products
              </h2>
              <div className="w-20 lotus-divider mx-auto mb-10" />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp, i) => (
                <ScrollReveal key={rp.id} direction="up" delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="product-card-hover bg-white rounded-2xl overflow-hidden border border-saffron/10 group"
                  >
                    <Link href={`/products/${rp.slug}`}>
                      <div
                        className={cn(
                          "h-48 bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
                          categoryGradient(rp.category)
                        )}
                      >
                        <span className="text-cream/30 font-heading text-base text-center px-4">
                          {rp.name}
                        </span>
                        <div className="absolute inset-0 bg-saffron/0 group-hover:bg-saffron/5 transition-colors duration-500" />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${rp.slug}`}>
                        <h3 className="font-heading text-base text-charcoal mb-1 line-clamp-1 hover:text-saffron transition-colors">
                          {rp.name}
                        </h3>
                      </Link>
                      <span className="text-base font-heading font-bold text-charcoal">
                        {formatPrice(rp.price, "INR")}
                      </span>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
