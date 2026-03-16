"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Loader2,
  Package,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  shippingAddress: string;
  total: number;
  status: string;
  paymentId: string | null;
  paymentStatus: string;
  notes: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

const statusOptions = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
        toast.success(`Order status updated to ${status}`);
      } else {
        toast.error("Failed to update order status");
      }
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
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
      <p className="text-sm text-charcoal/85">
        {orders.length} order{orders.length !== 1 ? "s" : ""} total
      </p>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
          <p className="text-charcoal/85 text-sm">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                    Order
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                    Customer
                  </th>
                  <th className="text-center text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                    Items
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                    Total
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-center text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-charcoal/80">
                          {order.id.slice(0, 8)}...
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm font-medium text-charcoal">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-charcoal/80">
                          {order.customerEmail}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span className="text-sm text-charcoal/80">
                          {order.items.length}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-charcoal">
                          {formatPrice(order.total)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(order.id, e.target.value)
                            }
                            disabled={updatingId === order.id}
                            className={`text-xs font-medium px-2.5 py-1 rounded-full border appearance-none cursor-pointer pr-6 ${
                              statusColors[order.status] ||
                              "bg-gray-100 text-gray-700 border-gray-200"
                            } ${
                              updatingId === order.id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            {statusOptions.map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                          {updatingId === order.id && (
                            <Loader2 className="w-3 h-3 animate-spin absolute right-1 top-1/2 -translate-y-1/2 text-charcoal/80" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs text-charcoal/85">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === order.id ? null : order.id
                            )
                          }
                          className="p-1.5 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
                        >
                          {expandedId === order.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Details */}
                    {expandedId === order.id && (
                      <tr key={`${order.id}-details`}>
                        <td
                          colSpan={7}
                          className="px-6 py-6 bg-gray-50/50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Customer Info */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                                Customer Info
                              </h4>
                              <div className="space-y-2">
                                <p className="text-sm text-charcoal flex items-center gap-2">
                                  <User className="w-3.5 h-3.5 text-charcoal/80" />
                                  {order.customerName}
                                </p>
                                <p className="text-sm text-charcoal/80 flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-charcoal/80" />
                                  {order.customerEmail}
                                </p>
                                {order.customerPhone && (
                                  <p className="text-sm text-charcoal/80 flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 text-charcoal/80" />
                                    {order.customerPhone}
                                  </p>
                                )}
                                <p className="text-sm text-charcoal/80 flex items-start gap-2">
                                  <MapPin className="w-3.5 h-3.5 text-charcoal/80 mt-0.5" />
                                  {order.shippingAddress}
                                </p>
                              </div>
                            </div>

                            {/* Items */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                                Items ({order.items.length})
                              </h4>
                              <div className="space-y-2">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center justify-between text-sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Package className="w-3.5 h-3.5 text-charcoal/30" />
                                      <span className="text-charcoal">
                                        {item.product.name}
                                      </span>
                                      <span className="text-charcoal/80">
                                        x{item.quantity}
                                      </span>
                                    </div>
                                    <span className="text-charcoal/80 font-medium">
                                      {formatPrice(item.price * item.quantity)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Payment Info */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                                Payment
                              </h4>
                              <div className="space-y-2">
                                <p className="text-sm text-charcoal flex items-center gap-2">
                                  <CreditCard className="w-3.5 h-3.5 text-charcoal/80" />
                                  Status:{" "}
                                  <span
                                    className={`font-medium ${
                                      order.paymentStatus === "paid"
                                        ? "text-sage"
                                        : "text-yellow-600"
                                    }`}
                                  >
                                    {order.paymentStatus}
                                  </span>
                                </p>
                                {order.paymentId && (
                                  <p className="text-xs text-charcoal/80 font-mono">
                                    ID: {order.paymentId}
                                  </p>
                                )}
                                <div className="pt-2 border-t border-gray-200">
                                  <p className="text-sm font-semibold text-charcoal">
                                    Total: {formatPrice(order.total)}
                                  </p>
                                </div>
                                {order.notes && (
                                  <div className="pt-2">
                                    <p className="text-xs text-charcoal/80 font-medium">
                                      Notes:
                                    </p>
                                    <p className="text-xs text-charcoal/80 mt-1">
                                      {order.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
