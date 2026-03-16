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
  CreditCard,
  Star,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string | null;
  features: string;
  popular: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string;
  popular: boolean;
  active: boolean;
}

const emptyForm: FormData = {
  name: "",
  description: "",
  price: "",
  duration: "",
  features: "",
  popular: false,
  active: true,
};

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/admin/pricing");
      if (res.ok) {
        const data = await res.json();
        setPlans(data);
      }
    } catch (err) {
      console.error("Failed to fetch pricing plans:", err);
      toast.error("Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (plan: PricingPlan) => {
    setEditingId(plan.id);
    setForm({
      name: plan.name,
      description: plan.description,
      price: String(plan.price),
      duration: plan.duration || "",
      features: plan.features,
      popular: plan.popular,
      active: plan.active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/pricing/${editingId}`
        : "/api/admin/pricing";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price) || 0,
        }),
      });

      if (res.ok) {
        toast.success(
          editingId ? "Pricing plan updated" : "Pricing plan created"
        );
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchPlans();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save pricing plan");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (plan: PricingPlan) => {
    try {
      const res = await fetch(`/api/admin/pricing/${plan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...plan, active: !plan.active }),
      });
      if (res.ok) {
        setPlans((prev) =>
          prev.map((p) =>
            p.id === plan.id ? { ...p, active: !p.active } : p
          )
        );
        toast.success(
          `Plan ${!plan.active ? "activated" : "deactivated"}`
        );
      }
    } catch {
      toast.error("Failed to update plan");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pricing/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPlans((prev) => prev.filter((p) => p.id !== deleteId));
        toast.success("Pricing plan deleted");
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

  const getFeaturesList = (features: string) => {
    return features.split("\n").filter((f) => f.trim());
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-24 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-16 mb-3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
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
          {plans.length} pricing plan{plans.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </button>
      </div>

      {/* Grid */}
      {plans.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <CreditCard className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
          <p className="text-charcoal/85 text-sm">No pricing plans yet</p>
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 mt-4 text-gold text-sm font-medium hover:text-gold-dark"
          >
            <Plus className="w-4 h-4" />
            Add your first pricing plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow relative ${
                plan.popular
                  ? "border-gold/30 ring-1 ring-gold/20"
                  : "border-gray-100"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gold text-charcoal rounded-full text-[10px] font-semibold">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-3 mt-1">
                <div>
                  <h4 className="text-sm font-semibold text-charcoal">
                    {plan.name}
                  </h4>
                  {plan.duration && (
                    <p className="text-xs text-charcoal/80 mt-0.5">
                      {plan.duration}
                    </p>
                  )}
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    plan.active
                      ? "bg-sage/10 text-sage"
                      : "bg-gray-100 text-charcoal/80"
                  }`}
                >
                  {plan.active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mb-3">
                {plan.price > 0 ? (
                  <p className="text-2xl font-bold text-charcoal">
                    ₹{plan.price}
                  </p>
                ) : (
                  <p className="text-lg font-semibold text-charcoal">Custom</p>
                )}
              </div>

              {plan.description && (
                <p className="text-xs text-charcoal/85 mb-3">
                  {plan.description}
                </p>
              )}

              <div className="space-y-1.5 mb-4">
                {getFeaturesList(plan.features).map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-charcoal/80"
                  >
                    <Check className="w-3 h-3 text-sage mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1 pt-3 border-t border-gray-50">
                <button
                  onClick={() => openEditForm(plan)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => toggleActive(plan)}
                  className="p-1.5 rounded-lg text-charcoal/80 hover:text-sage hover:bg-sage/5 transition-colors"
                  title={plan.active ? "Deactivate" : "Activate"}
                >
                  {plan.active ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setDeleteId(plan.id)}
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
                {editingId ? "Edit Pricing Plan" : "Add Pricing Plan"}
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
                  placeholder="Plan name"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Description
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, price: e.target.value }))
                    }
                    placeholder="0"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
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
                    placeholder="e.g. 60 minutes"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                  Features (one per line)
                </label>
                <textarea
                  value={form.features}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      features: e.target.value,
                    }))
                  }
                  rows={5}
                  placeholder={"Feature 1\nFeature 2\nFeature 3"}
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
                        popular: !prev.popular,
                      }))
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      form.popular ? "bg-gold" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        form.popular ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-charcoal/85">Popular</span>
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
              Delete Pricing Plan
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this pricing plan? This action
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
