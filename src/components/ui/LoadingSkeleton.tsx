"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SkeletonBaseProps {
  className?: string;
  style?: CSSProperties;
}

/* Warm shimmer skeleton — cream-dark (#F5ECDF) base with golden shimmer */
function Shimmer({ className, style }: SkeletonBaseProps) {
  return (
    <div
      className={cn("rounded-lg relative overflow-hidden", className)}
      style={{ backgroundColor: "#F5ECDF", ...style }}
    >
      {/* Warm shimmer overlay */}
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(110deg, transparent 25%, rgba(200,169,81,0.12) 37%, rgba(224,124,36,0.08) 50%, rgba(200,169,81,0.12) 63%, transparent 75%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white gold-border shadow-sm">
      {/* Image placeholder */}
      <Shimmer className="aspect-[4/3] rounded-none" />

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category badge placeholder */}
        <Shimmer className="w-24 h-4 rounded-full" />

        {/* Name */}
        <Shimmer className="w-3/4 h-5" />

        {/* Pack size */}
        <Shimmer className="w-16 h-3" />

        {/* Price */}
        <Shimmer className="w-20 h-6" />

        {/* Button */}
        <Shimmer className="w-full h-11 rounded-full" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-white gold-border shadow-sm">
      {/* Quote mark */}
      <Shimmer className="w-10 h-8 mb-4" />

      {/* Text lines */}
      <div className="space-y-2 mb-6">
        <Shimmer className="w-full h-4" />
        <Shimmer className="w-full h-4" />
        <Shimmer className="w-3/4 h-4" />
      </div>

      {/* Stars */}
      <Shimmer className="w-24 h-4 mb-4" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-full" />
        <div className="space-y-1.5">
          <Shimmer className="w-24 h-4" />
          <Shimmer className="w-16 h-3" />
        </div>
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="bg-gradient-hero py-32 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {/* Small label */}
        <Shimmer
          className="w-40 h-4 mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />

        {/* Title */}
        <Shimmer
          className="w-64 h-12 mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        />

        {/* Subtitle */}
        <Shimmer
          className="w-80 h-5 mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />

        {/* Divider */}
        <Shimmer
          className="w-16 h-0.5 mx-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />

        {/* Description */}
        <div className="space-y-2 max-w-lg mx-auto">
          <Shimmer
            className="w-full h-4"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          />
          <Shimmer
            className="w-3/4 h-4 mx-auto"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-sandal/30">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Shimmer
            className={cn(
              "h-4",
              i === 0 ? "w-8" : i === 1 ? "w-32" : i === columns - 1 ? "w-20" : "w-24"
            )}
          />
        </td>
      ))}
    </tr>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
