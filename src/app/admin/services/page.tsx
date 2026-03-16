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
  Briefcase,
  GripVertical,
} from "lucide-react";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  category: string | null;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
  active: boolean;
  sortOrder: string;
}

const emptyForm: FormData = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  category: "",
  active: true,
  sortOrder: "0",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (s: Service) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      slug: s.slug,
      description: s.description,
      icon: s.icon || "",
      category: s.category || "",
      active: s.active,
      sortOrder: String(s.sortOrder),
    });
    setShowForm(true);
  };

  const updateFormField = (field: keyof FormData, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name" && !editingId && prev.slug === slugify(prev.name)) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error("Name and slug are required");
      return;
    }

    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/services/${editingId}`
        : "/api/admin/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(editingId ? "Service updated" : "Service created");
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchServices();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save service");
      }
    } catch {
      toast.error("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (s: Service) => {
    try {
      const res = await fetch(`/api/admin/services/${s.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...s,
          active: !s.active,
        }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((svc) =>
            svc.id === s.id ? { ...svc, active: !svc.active } : svc
          )
        );
        toast.success(`Service ${!s.active ? "activated" : "deactivated"}`);
      }
    } catch {
      toast.error("Failed to update service");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/services/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== deleteId));
        toast.success("Service deleted");
        setDeleteId(null);
      } else {
        toast.error("Failed to delete service");
      }
    } catch {
      toast.error("Failed to delete service");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-36 animate-pulse" />
        </div>
        <div className="space-y-3 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-5 h-20"
            />
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
          {services.length} service{services.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Services List */}
      {services.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <Briefcase className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
          <p className="text-charcoal/85 text-sm">No services yet</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 mt-4 text-gold text-sm font-medium hover:text-gold-dark"
          >
            <Plus className="w-4 h-4" />
            Add your first service
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <GripVertical className="w-4 h-4 text-charcoal/20 flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-charcoal">
                    {s.name}
                  </h4>
                  {s.icon && (
                    <span className="text-xs text-charcoal/80 bg-gray-100 px-1.5 py-0.5 rounded">
                      {s.icon}
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal/85 truncate mt-0.5">
                  {s.description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {s.category && (
                  <span className="text-xs bg-purple/5 text-purple px-2 py-1 rounded-full hidden sm:inline-block">
                    {s.category}
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    s.active
                      ? "bg-sage/10 text-sage"
                      : "bg-gray-100 text-charcoal/80"
                  }`}
                >
                  {s.active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => openEditForm(s)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleActive(s)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-sage hover:bg-sage/5 transition-colors"
                  title={s.active ? "Deactivate" : "Activate"}
                >
                  {s.active ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setDeleteId(s.id)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-red-500 hover:bg-red-50 transition-colors"
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
                {editingId ? "Edit Service" : "Add Service"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateFormField("name", e.target.value)}
                    placeholder="Service name"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Slug <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => updateFormField("slug", e.target.value)}
                    placeholder="auto-generated"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateFormField("description", e.target.value)
                  }
                  rows={4}
                  placeholder="Describe this healing service..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => updateFormField("icon", e.target.value)}
                    placeholder="e.g., Heart, Star, Shield"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                  <p className="text-xs text-charcoal/80 mt-1">
                    Lucide icon name
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) =>
                      updateFormField("category", e.target.value)
                    }
                    placeholder="e.g., Energy Healing"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) =>
                      updateFormField("sortOrder", e.target.value)
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>

                <div className="flex items-center gap-3 pt-7">
                  <button
                    type="button"
                    onClick={() => updateFormField("active", !form.active)}
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
                {editingId ? "Save Changes" : "Create Service"}
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
              Delete Service
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this service? This action cannot
              be undone.
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
