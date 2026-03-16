"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  X,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string | null;
  location: string | null;
  image: string | null;
  category: string | null;
  featured: boolean;
  upcoming: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  upcoming: boolean;
  featured: boolean;
  active: boolean;
}

const emptyForm: FormData = {
  title: "",
  slug: "",
  description: "",
  date: "",
  time: "",
  location: "",
  image: "",
  category: "",
  upcoming: false,
  featured: false,
  active: true,
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const perPage = 10;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/admin/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    const q = search.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.category && e.category.toLowerCase().includes(q)) ||
        (e.location && e.location.toLowerCase().includes(q))
    );
  }, [events, search]);

  const totalPages = Math.ceil(filteredEvents.length / perPage);
  const paginatedEvents = filteredEvents.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (e: Event) => {
    setEditingId(e.id);
    setForm({
      title: e.title,
      slug: e.slug,
      description: e.description,
      date: e.date,
      time: e.time || "",
      location: e.location || "",
      image: e.image || "",
      category: e.category || "",
      upcoming: e.upcoming,
      featured: e.featured,
      active: e.active,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.date) {
      toast.error("Title and date are required");
      return;
    }

    setSaving(true);
    try {
      const url = editingId
        ? `/api/admin/events/${editingId}`
        : "/api/admin/events";
      const method = editingId ? "PUT" : "POST";

      const payload = {
        ...form,
        slug: form.slug || generateSlug(form.title),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingId ? "Event updated" : "Event created");
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
        fetchEvents();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (event: Event) => {
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...event, active: !event.active }),
      });
      if (res.ok) {
        setEvents((prev) =>
          prev.map((e) =>
            e.id === event.id ? { ...e, active: !e.active } : e
          )
        );
        toast.success(
          `Event ${!event.active ? "activated" : "deactivated"}`
        );
      }
    } catch {
      toast.error("Failed to update event");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/events/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== deleteId));
        toast.success("Event deleted");
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

  const getStatusLabel = (event: Event) => {
    if (event.upcoming) return "Upcoming";
    const eventDate = new Date(event.date);
    const now = new Date();
    return eventDate > now ? "Upcoming" : "Past";
  };

  const getStatusStyle = (event: Event) => {
    const label = getStatusLabel(event);
    if (label === "Upcoming") return "bg-sage/10 text-sage";
    return "bg-gray-100 text-charcoal/80";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="space-y-4 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-charcoal/85">
            {events.length} event{events.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          type="text"
          placeholder="Search events by title, category, or location..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {paginatedEvents.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarDays className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
            <p className="text-charcoal/85 text-sm">
              {search ? "No events match your search" : "No events yet"}
            </p>
            {!search && (
              <button
                onClick={openAddForm}
                className="inline-flex items-center gap-2 mt-4 text-gold text-sm font-medium hover:text-gold-dark"
              >
                <Plus className="w-4 h-4" />
                Add your first event
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Event
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                      Date
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                      Category
                    </th>
                    <th className="text-center text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                      Status
                    </th>
                    <th className="text-center text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                      Active
                    </th>
                    <th className="text-right text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate max-w-[280px]">
                            {event.title}
                          </p>
                          {event.location && (
                            <p className="text-xs text-charcoal/80 mt-0.5">
                              {event.location}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-charcoal/85">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        {event.time && (
                          <p className="text-xs text-charcoal/80">{event.time}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        {event.category && (
                          <span className="text-xs font-medium text-charcoal/80 bg-gray-100 px-2.5 py-1 rounded-full">
                            {event.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            event
                          )}`}
                        >
                          {getStatusLabel(event)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            event.active
                              ? "bg-sage/10 text-sage"
                              : "bg-gray-100 text-charcoal/80"
                          }`}
                        >
                          {event.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditForm(event)}
                            className="p-2 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleActive(event)}
                            className={`p-2 rounded-lg transition-colors ${
                              event.active
                                ? "text-charcoal/80 hover:text-orange-500 hover:bg-orange-50"
                                : "text-charcoal/80 hover:text-sage hover:bg-sage/5"
                            }`}
                            title={event.active ? "Deactivate" : "Activate"}
                          >
                            {event.active ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteId(event.id)}
                            className="p-2 rounded-lg text-charcoal/80 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-charcoal/85">
                  Showing {(page - 1) * perPage + 1} to{" "}
                  {Math.min(page * perPage, filteredEvents.length)} of{" "}
                  {filteredEvents.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                          p === page
                            ? "bg-gold text-charcoal"
                            : "text-charcoal/85 hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={page === totalPages}
                    className="p-2 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-charcoal">
                {editingId ? "Edit Event" : "Add Event"}
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
                  placeholder="Event title"
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
                  placeholder="Event description"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Time
                  </label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, time: e.target.value }))
                    }
                    placeholder="e.g. 10:00 AM - 4:00 PM"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Venue or City"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="e.g. Workshops, Retreats"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                  />
                </div>
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
                  placeholder="/images/events/..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        upcoming: !prev.upcoming,
                      }))
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      form.upcoming ? "bg-sage" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        form.upcoming ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-charcoal/85">Upcoming</span>
                </div>

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
              Delete Event
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this event? This action cannot be
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
