"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function getCategoryLabel(category: string): string {
  if (category === "all") return "All";
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const allCategories = ["all", ...categories];

  const checkScrollFade = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 10);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScrollFade();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollFade, { passive: true });
      window.addEventListener("resize", checkScrollFade);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollFade);
      window.removeEventListener("resize", checkScrollFade);
    };
  }, []);

  return (
    <div className="relative">
      {/* Left fade */}
      {showLeftFade && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-soft-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Right fade */}
      {showRightFade && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-soft-white to-transparent z-10 pointer-events-none" />
      )}

      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mb-1"
        role="tablist"
        aria-label="Product categories"
      >
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "relative flex-shrink-0 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 whitespace-nowrap",
                isActive
                  ? "text-white"
                  : "text-charcoal/80 bg-white border border-charcoal/12 hover:bg-saffron/10 hover:border-saffron/30 hover:text-charcoal/80"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="category-active-bg"
                  className="absolute inset-0 bg-saffron rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{getCategoryLabel(category)}</span>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
