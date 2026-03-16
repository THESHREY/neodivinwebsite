"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  Mail,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  unreadMessages: number;
  recentOrders: any[];
  recentMessages: any[];
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-16" />
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-12 bg-gray-100 rounded-lg" />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-gold/10 text-gold",
      iconColor: "text-gold",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: "bg-sage/10 text-sage",
      iconColor: "text-sage",
    },
    {
      label: "Total Revenue",
      value: formatPrice(stats?.totalRevenue || 0),
      icon: IndianRupee,
      color: "bg-purple/10 text-purple",
      iconColor: "text-purple",
      isPrice: true,
    },
    {
      label: "Unread Messages",
      value: stats?.unreadMessages || 0,
      icon: Mail,
      color: "bg-gold/10 text-gold",
      iconColor: "text-gold",
    },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-semibold text-charcoal font-body">
          Welcome back, {session?.user?.name || "Admin"}
        </h2>
        <p className="text-charcoal/85 mt-1 text-sm">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-charcoal/85 uppercase tracking-wider">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold text-charcoal mt-2">
                      {card.isPrice ? card.value : card.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
                  >
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
            <Plus className="w-4 h-4 text-gold" />
          </div>
          <span className="text-sm font-medium text-charcoal">Add Product</span>
          <ArrowRight className="w-4 h-4 text-charcoal/30 ml-auto group-hover:text-gold transition-colors" />
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-sage" />
          </div>
          <span className="text-sm font-medium text-charcoal">View Orders</span>
          <ArrowRight className="w-4 h-4 text-charcoal/30 ml-auto group-hover:text-gold transition-colors" />
        </Link>
        <Link
          href="/admin/messages"
          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-gold" />
          </div>
          <span className="text-sm font-medium text-charcoal">Messages</span>
          <ArrowRight className="w-4 h-4 text-charcoal/30 ml-auto group-hover:text-gold transition-colors" />
        </Link>
        <Link
          href="/admin/content"
          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-purple" />
          </div>
          <span className="text-sm font-medium text-charcoal">Edit Content</span>
          <ArrowRight className="w-4 h-4 text-charcoal/30 ml-auto group-hover:text-gold transition-colors" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-charcoal text-sm">Recent Orders</h3>
            <Link
              href="/admin/orders"
              className="text-xs text-gold hover:text-gold-dark font-medium"
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : stats?.recentOrders && stats.recentOrders.length > 0 ? (
              <div className="space-y-3">
                {stats.recentOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-charcoal/85">
                        {order.items?.length || 0} items &middot;{" "}
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[order.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm font-semibold text-charcoal">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-charcoal/80 text-center py-8">
                No orders yet
              </p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-charcoal text-sm">
              Recent Messages
            </h3>
            <Link
              href="/admin/messages"
              className="text-xs text-gold hover:text-gold-dark font-medium"
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : stats?.recentMessages && stats.recentMessages.length > 0 ? (
              <div className="space-y-3">
                {stats.recentMessages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {msg.name}
                        </p>
                        {!msg.read && (
                          <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-charcoal/85 truncate">
                        {msg.subject || msg.message?.slice(0, 50)}
                      </p>
                    </div>
                    <span className="text-xs text-charcoal/80 ml-4 whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-charcoal/80 text-center py-8">
                No messages yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
