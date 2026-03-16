"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Loader2,
  ImageIcon,
  X,
  Trash2,
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<FormData>({
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
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/admin/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          benefits: data.benefits || "",
          price: String(data.price || ""),
          comparePrice: data.comparePrice ? String(data.comparePrice) : "",
          category: data.category || categories[0],
          subCategory: data.subCategory || "",
          packSize: data.packSize || "",
          image: data.image || "",
          featured: data.featured || false,
          active: data.active !== false,
          sortOrder: String(data.sortOrder || 0),
        });
      } else {
        toast.error("Product not found");
        router.push("/admin/products");
      }
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Product updated successfully");
        router.push("/admin/products");
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to update product");
      }
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Product deleted");
        router.push("/admin/products");
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="grid grid-cols-2 gap-5">
            <div className="h-10 bg-gray-100 rounded-xl" />
            <div className="h-10 bg-gray-100 rounded-xl" />
          </div>
          <div className="h-24 bg-gray-100 rounded-xl" />
          <div className="h-16 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Edit Product
            </h2>
            <p className="text-sm text-charcoal/85">{form.name}</p>
          </div>
        </div>
        <button
          onClick={() => setShowDelete(true)}
          className="p-2 rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="Delete Product"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all ${
                  errors.name ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all ${
                  errors.slug ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.slug && (
                <p className="text-xs text-red-500 mt-1">{errors.slug}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none ${
                errors.description ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

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
                className={`w-full px-3 py-2.5 border rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all ${
                  errors.price ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Compare Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.comparePrice}
                onChange={(e) => updateField("comparePrice", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Pack Size
              </label>
              <input
                type="text"
                value={form.packSize}
                onChange={(e) => updateField("packSize", e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Sub Category
              </label>
              <input
                type="text"
                value={form.subCategory}
                onChange={(e) => updateField("subCategory", e.target.value)}
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

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Delete Product
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete &quot;{form.name}&quot;? This
              action cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowDelete(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-sm font-medium text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
