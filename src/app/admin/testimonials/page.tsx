"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Star,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Award,
  Loader2,
  X,
  MessageSquare,
  MapPin,
  Video,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  image: string | null;
  videoUrl: string | null;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

interface FormData {
  name: string;
  location: string;
  rating: number;
  text: string;
  videoUrl: string;
  featured: boolean;
  active: boolean;
}

const emptyForm: FormData = {
  name: "",
  location: "",
  rating: 5,
  text: "",
  videoUrl: "",
  featured: false,
  active: true,
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      location: t.location || "",
      rating: t.rating,
      text: t.text,
      videoUrl: t.videoUrl || "",
      featured: t.featured,
      active: t.active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      toast.error("Name and text are required");
      return;
    }

    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(
          editingId ? "Testimonial updated" : "Testimonial created"
        );
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchTestimonials();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  const toggleField = async (id: string, field: "active" | "featured", currentValue: boolean) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !currentValue }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, [field]: !currentValue } : t
          )
        );
        toast.success(`Testimonial ${field} updated`);
      }
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteId));
        toast.success("Testimonial deleted");
        setDeleteId(null);
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? "text-gold fill-gold" : "text-gray-200"
          }`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-charcoal/85">
          {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Grid */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <MessageSquare className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
          <p className="text-charcoal/85 text-sm">No testimonials yet</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 mt-4 text-gold text-sm font-medium hover:text-gold-dark"
          >
            <Plus className="w-4 h-4" />
            Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-charcoal">
                    {t.name}
                  </h4>
                  {t.location && (
                    <p className="text-xs text-charcoal/80 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {t.location}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {t.featured && (
                    <span className="px-1.5 py-0.5 bg-gold/10 text-gold rounded text-[10px] font-medium">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      t.active
                        ? "bg-sage/10 text-sage"
                        : "bg-gray-100 text-charcoal/80"
                    }`}
                  >
                    {t.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {renderStars(t.rating)}

              {t.videoUrl && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-saffron font-medium">
                  <Play className="w-3 h-3" />
                  Video testimonial
                </div>
              )}

              <p className="text-sm text-charcoal/80 mt-3 line-clamp-3">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-50">
                <button
                  onClick={() => openEditForm(t)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleField(t.id, "active", t.active)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-sage hover:bg-sage/5 transition-colors"
                  title={t.active ? "Deactivate" : "Activate"}
                >
                  {t.active ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => toggleField(t.id, "featured", t.featured)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    t.featured
                      ? "text-gold hover:bg-gold/5"
                      : "text-charcoal/80 hover:text-gold hover:bg-gold/5"
                  }`}
                  title={t.featured ? "Unfeature" : "Feature"}
                >
                  <Award className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteId(t.id)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-red-500 hover:bg-red-50 transition-colors ml-auto"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-charcoal">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="p-1 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Customer name"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="City, Country"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, rating: i }))
                      }
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          i <= form.rating
                            ? "text-gold fill-gold"
                            : "text-gray-200 hover:text-gold/50"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Testimonial Text <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.text}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, text: e.target.value }))
                  }
                  rows={4}
                  placeholder="What did the customer say?"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-saffron" />
                    Video URL
                  </span>
                </label>
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, videoUrl: e.target.value }))
                  }
                  placeholder="https://youtube.com/watch?v=... or video file URL"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
                <p className="text-xs text-charcoal/60 mt-1">
                  YouTube, Vimeo, or direct video file URL. Leave blank for text-only testimonial.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, featured: !prev.featured }))
                    }
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
                  <span className="text-sm text-charcoal/85">Featured</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, active: !prev.active }))
                    }
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
                  <span className="text-sm text-charcoal/85">Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-end mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-gold text-charcoal hover:bg-gold-light transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Delete Testimonial
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this testimonial? This action
              cannot be undone.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
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
