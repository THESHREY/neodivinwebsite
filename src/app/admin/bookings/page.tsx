"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Loader2,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  serviceId: string | null;
  serviceName: string;
  date: string;
  time: string;
  notes: string | null;
  status: string;
  createdAt: string;
}

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

const statusDotStyles: Record<string, string> = {
  pending: "bg-yellow-500",
  confirmed: "bg-green-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const perPage = 10;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.customerName.toLowerCase().includes(q) ||
        b.customerEmail.toLowerCase().includes(q) ||
        b.serviceName.toLowerCase().includes(q) ||
        b.status.toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const totalPages = Math.ceil(filteredBookings.length / perPage);
  const paginatedBookings = filteredBookings.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdatingStatus(bookingId);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: newStatus } : b
          )
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
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
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          type="text"
          placeholder="Search by customer, service, or status..."
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
        {paginatedBookings.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
            <p className="text-charcoal/85 text-sm">
              {search
                ? "No bookings match your search"
                : "No bookings yet"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Customer
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                      Service
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                      Date & Time
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Status
                    </th>
                    <th className="text-right text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedBookings.map((booking) => (
                    <>
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-charcoal">
                              {booking.customerName}
                            </p>
                            <p className="text-xs text-charcoal/80 truncate max-w-[180px]">
                              {booking.customerEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-sm text-charcoal/85">
                            {booking.serviceName}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <p className="text-sm text-charcoal/85">
                            {new Date(booking.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-xs text-charcoal/80">
                            {booking.time}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <select
                              value={booking.status}
                              onChange={(e) =>
                                updateStatus(booking.id, e.target.value)
                              }
                              disabled={updatingStatus === booking.id}
                              className={`appearance-none pl-6 pr-8 py-1.5 rounded-full text-xs font-medium border cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold/30 ${
                                statusStyles[booking.status] ||
                                statusStyles.pending
                              } ${
                                updatingStatus === booking.id
                                  ? "opacity-50"
                                  : ""
                              }`}
                            >
                              {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                              ))}
                            </select>
                            <span
                              className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                                statusDotStyles[booking.status] ||
                                statusDotStyles.pending
                              }`}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() =>
                                setExpandedId(
                                  expandedId === booking.id
                                    ? null
                                    : booking.id
                                )
                              }
                              className="p-2 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                              title="View Details"
                            >
                              {expandedId === booking.id ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === booking.id && (
                        <tr key={`${booking.id}-details`}>
                          <td
                            colSpan={5}
                            className="px-6 py-4 bg-gray-50/50"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="flex items-start gap-2">
                                <User className="w-4 h-4 text-charcoal/30 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-charcoal/80">
                                    Customer
                                  </p>
                                  <p className="text-sm text-charcoal">
                                    {booking.customerName}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Mail className="w-4 h-4 text-charcoal/30 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-charcoal/80">
                                    Email
                                  </p>
                                  <p className="text-sm text-charcoal break-all">
                                    {booking.customerEmail}
                                  </p>
                                </div>
                              </div>
                              {booking.customerPhone && (
                                <div className="flex items-start gap-2">
                                  <Phone className="w-4 h-4 text-charcoal/30 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs text-charcoal/80">
                                      Phone
                                    </p>
                                    <p className="text-sm text-charcoal">
                                      {booking.customerPhone}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-start gap-2">
                                <Clock className="w-4 h-4 text-charcoal/30 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-xs text-charcoal/80">
                                    Date & Time
                                  </p>
                                  <p className="text-sm text-charcoal">
                                    {new Date(
                                      booking.date
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}{" "}
                                    at {booking.time}
                                  </p>
                                </div>
                              </div>
                              {booking.notes && (
                                <div className="flex items-start gap-2 sm:col-span-2 lg:col-span-4">
                                  <FileText className="w-4 h-4 text-charcoal/30 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs text-charcoal/80">
                                      Notes
                                    </p>
                                    <p className="text-sm text-charcoal">
                                      {booking.notes}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-charcoal/85">
                  Showing {(page - 1) * perPage + 1} to{" "}
                  {Math.min(page * perPage, filteredBookings.length)} of{" "}
                  {filteredBookings.length}
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
    </div>
  );
}
