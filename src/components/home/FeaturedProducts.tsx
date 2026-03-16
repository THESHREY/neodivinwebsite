"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductQuickView from "@/components/products/ProductQuickView";
import { ProductCardSkeleton } from "@/components/ui/LoadingSkeleton";
import ScrollReveal from "@/components/animations/ScrollReveal";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number | null;
  category: string;
  image: string;
  packSize: string;
  benefits: string;
  description?: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products?featured=true");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="section-padding bg-gradient-section relative overflow-hidden">
      {/* Decorative warm glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-saffron/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="container-wide mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <p className="text-xs font-body uppercase tracking-[0.3em] text-saffron/70 mb-3">
              Handcrafted with Intention
            </p>
            <h2 className="text-display font-heading font-bold text-charcoal mb-1">
              <span className="text-gradient-saffron">Divine</span>{" "}
              Collection
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-saffron to-transparent mx-auto mt-4 mb-4" />
            <p className="text-base text-charcoal/85 font-body max-w-md mx-auto">
              Sacred products for your spiritual journey
            </p>
          </div>
        </ScrollReveal>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal/80 font-body">
              Our divine collection is being prepared. Check back soon.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Navigation Arrows */}
            {products.length > 3 && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-saffron/20 text-charcoal/85 hover:text-saffron hover:border-saffron/50 shadow-lg shadow-saffron/10 transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white border border-saffron/20 text-charcoal/85 hover:text-saffron hover:border-saffron/50 shadow-lg shadow-saffron/10 transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mb-4"
            >
              {products.map((product, index) => (
                <ScrollReveal
                  key={product.id}
                  direction="up"
                  delay={index * 0.1}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] snap-start"
                >
                  <ProductCard
                    product={product}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* View All Link */}
        {products.length > 0 && (
          <ScrollReveal direction="up" delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 border border-saffron/30 text-saffron font-body font-semibold text-sm rounded-xl hover:bg-saffron hover:text-white hover:border-saffron transition-all duration-300"
              >
                View All Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
