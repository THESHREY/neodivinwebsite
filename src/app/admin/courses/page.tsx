"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  GraduationCap,
  Award,
  Clock,
  IndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string | null;
  level: string | null;
  price: number | null;
  image: string | null;
  syllabus: string | null;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  image: string;
  syllabus: string;
  featured: boolean;
  active: boolean;
}

const emptyForm: FormData = {
  title: "",
  slug: "",
  description: "",
  duration: "",
  level: "",
  price: "",
  image: "",
  syllabus: "",
  featured: false,
  active: true,
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
      }
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (c: Course) => {
    setEditingId(c.id);
    setForm({
      title: c.title,
      slug: c.slug,
      description: c.description,
      duration: c.duration || "",
      level: c.level || "",
      price: c.price != null ? String(c.price) : "",
      image: c.image || "",
      syllabus: c.syllabus || "",
      featured: c.featured,
      active: c.active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/courses/${editingId}`
        : "/api/admin/courses";
      const method = editingId ? "PUT" : "POST";

      const payload = {
        ...form,
        slug: form.slug || generateSlug(form.title),
        price: form.price ? parseFloat(form.price) : null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Course updated" : "Course created");
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchCourses();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (course: Course) => {
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...course, active: !course.active }),
      });
      if (res.ok) {
        setCourses((prev) =>
          prev.map((c) =>
            c.id === course.id ? { ...c, active: !c.active } : c
          )
        );
        toast.success(
          `Course ${!course.active ? "activated" : "deactivated"}`
        );
      }
    } catch {
      toast.error("Failed to update course");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/courses/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== deleteId));
        toast.success("Course deleted");
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
          {courses.length} course{courses.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Course
        </button>
      </div>

      {/* Grid */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <GraduationCap className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
          <p className="text-charcoal/85 text-sm">No courses yet</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 mt-4 text-gold text-sm font-medium hover:text-gold-dark"
          >
            <Plus className="w-4 h-4" />
            Add your first course
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-charcoal truncate">
                    {course.title}
                  </h4>
                  {course.level && (
                    <p className="text-xs text-charcoal/80 mt-0.5">
                      {course.level}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  {course.featured && (
                    <span className="px-1.5 py-0.5 bg-gold/10 text-gold rounded text-[10px] font-medium">
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      course.active
                        ? "bg-sage/10 text-sage"
                        : "bg-gray-100 text-charcoal/80"
                    }`}
                  >
                    {course.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <p className="text-sm text-charcoal/80 line-clamp-2 mb-3">
                {course.description}
              </p>

              <div className="flex items-center gap-4 mb-3 text-xs text-charcoal/85">
                {course.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                )}
                {course.price != null && (
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {course.price > 0 ? `₹${course.price}` : "Custom"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 pt-3 border-t border-gray-50">
                <button
                  onClick={() => openEditForm(course)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleActive(course)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-sage hover:bg-sage/5 transition-colors"
                  title={course.active ? "Deactivate" : "Activate"}
                >
                  {course.active ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setDeleteId(course.id)}
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
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-charcoal">
                {editingId ? "Edit Course" : "Add Course"}
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
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      title,
                      slug: generateSlug(title),
                    }));
                  }}
                  placeholder="Course title"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="auto-generated-from-title"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 text-charcoal/85"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Course description"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    placeholder="e.g. 2 Days"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Level
                  </label>
                  <input
                    type="text"
                    value={form.level}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, level: e.target.value }))
                    }
                    placeholder="e.g. Beginner, Intermediate"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Price (leave blank for custom pricing)
                </label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Image URL
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/images/courses/..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Syllabus
                </label>
                <textarea
                  value={form.syllabus}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      syllabus: e.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Course syllabus (one topic per line)"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        featured: !prev.featured,
                      }))
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
              Delete Course
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this course? This action cannot be
              undone.
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
