"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Loader2,
  ImageIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

const categories = [
  "Spiritual Sprays",
  "Planetary Sprays",
  "Chakra Sprays",
  "Dhoop & Incense",
  "Bath & Body",
  "Other",
];

interface FormData {
  name: string;
  slug: string;
  description: string;
  benefits: string;
  price: string;
  comparePrice: string;
  category: string;
  subCategory: string;
  packSize: string;
  image: string;
  featured: boolean;
  active: boolean;
  sortOrder: string;
}

const initialForm: FormData = {
  name: "",
  slug: "",
  description: "",
  benefits: "",
  price: "",
  comparePrice: "",
  category: categories[0],
  subCategory: "",
  packSize: "",
  image: "",
  featured: false,
  active: true,
  sortOrder: "0",
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const updateField = (field: keyof FormData, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name" && prev.slug === slugify(prev.name)) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.url }));
        toast.success("Image uploaded");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to upload image");
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.slug.trim()) errs.slug = "Slug is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.price || parseFloat(form.price) <= 0)
      errs.price = "Valid price is required";
    if (!form.category) errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slug: form.slug || slugify(form.name),
        }),
      });

      if (res.ok) {
        toast.success("Product created successfully");
        router.push("/admin/products");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to create product");
      }
    } catch {
      toast.error("Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-lg font-semibold text-charcoal">New Product</h2>
          <p className="text-sm text-charcoal/85">
            Add a new product to your store
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g., Aura Cleansing Spray"
                className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all ${
                  errors.name ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="auto-generated-from-name"
                className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all ${
                  errors.slug ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.slug && (
                <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              placeholder="Product description..."
              className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none ${
                errors.description ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Benefits
              <span className="text-charcoal/80 font-normal ml-1">
                (one per line)
              </span>
            </label>
            <textarea
              value={form.benefits}
              onChange={(e) => updateField("benefits", e.target.value)}
              rows={3}
              placeholder="Cleanses negative energy&#10;Enhances meditation&#10;Promotes inner peace"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Pricing & Category
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Price ($) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="0.00"
                className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all ${
                  errors.price ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            {/* Compare Price */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Compare Price ($)
                <span className="text-charcoal/80 font-normal ml-1">
                  (optional)
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.comparePrice}
                onChange={(e) => updateField("comparePrice", e.target.value)}
                placeholder="0.00"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>

            {/* Pack Size */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Pack Size
              </label>
              <input
                type="text"
                value={form.packSize}
                onChange={(e) => updateField("packSize", e.target.value)}
                placeholder="e.g., 100 ML"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Sub Category
                <span className="text-charcoal/80 font-normal ml-1">
                  (optional)
                </span>
              </label>
              <input
                type="text"
                value={form.subCategory}
                onChange={(e) => updateField("subCategory", e.target.value)}
                placeholder="e.g., Premium Collection"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Product Image
          </h3>

          <div className="flex items-start gap-6">
            {/* Preview */}
            <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              {form.image ? (
                <>
                  <Image
                    src={form.image}
                    alt="Product preview"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-300" />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <label className="block">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-medium text-charcoal/85 hover:bg-gray-200 transition-colors cursor-pointer">
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </>
                  )}
                </span>
              </label>
              <p className="text-xs text-charcoal/80">
                JPEG, PNG, WebP or GIF. Max 5MB.
              </p>
              <div>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  placeholder="Or enter image URL directly"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => updateField("sortOrder", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3 pt-6">
              <button
                type="button"
                onClick={() => updateField("featured", !form.featured)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  form.featured ? "bg-gold" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    form.featured ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <label className="text-sm font-medium text-charcoal/85">
                Featured
              </label>
            </div>

            {/* Active */}
            <div className="flex items-center gap-3 pt-6">
              <button
                type="button"
                onClick={() => updateField("active", !form.active)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  form.active ? "bg-sage" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    form.active ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <label className="text-sm font-medium text-charcoal/85">
                Active
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
}
