"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Inbox,
  Clock,
  User,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (msg: Message) => {
    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !msg.read }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m))
        );
        toast.success(msg.read ? "Marked as unread" : "Marked as read");
      }
    } catch {
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/messages/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deleteId));
        if (expandedId === deleteId) setExpandedId(null);
        toast.success("Message deleted");
        setDeleteId(null);
      } else {
        toast.error("Failed to delete message");
      }
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setDeleting(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    // Mark as read when expanding
    const msg = messages.find((m) => m.id === id);
    if (msg && !msg.read && expandedId !== id) {
      fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      }).then(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
      });
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

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
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
      <div className="flex items-center gap-3">
        <p className="text-sm text-charcoal/85">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </p>
        {unreadCount > 0 && (
          <span className="px-2 py-0.5 bg-gold/10 text-gold rounded-full text-xs font-medium">
            {unreadCount} unread
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <Inbox className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
          <p className="text-charcoal/85 text-sm">No messages yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 w-8" />
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                    From
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                    Email
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                    Subject
                  </th>
                  <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-right text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {messages.map((msg) => (
                  <>
                    <tr
                      key={msg.id}
                      className={`transition-colors cursor-pointer ${
                        !msg.read
                          ? "bg-gold/[0.02] hover:bg-gold/[0.05]"
                          : "hover:bg-gray-50/50"
                      }`}
                      onClick={() => toggleExpand(msg.id)}
                    >
                      <td className="pl-6 py-4">
                        {!msg.read && (
                          <span className="w-2 h-2 rounded-full bg-gold block" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className={`text-sm ${
                            !msg.read
                              ? "font-semibold text-charcoal"
                              : "text-charcoal/85"
                          }`}
                        >
                          {msg.name}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-sm text-charcoal/85">{msg.email}</p>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <p className="text-sm text-charcoal/80 truncate max-w-[200px]">
                          {msg.subject || msg.message.slice(0, 40) + "..."}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-xs text-charcoal/80 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(msg.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => toggleRead(msg)}
                            className="p-1.5 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                            title={msg.read ? "Mark as unread" : "Mark as read"}
                          >
                            {msg.read ? (
                              <Mail className="w-4 h-4" />
                            ) : (
                              <MailOpen className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteId(msg.id)}
                            className="p-1.5 rounded-lg text-charcoal/80 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleExpand(msg.id)}
                            className="p-1.5 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
                          >
                            {expandedId === msg.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Message */}
                    {expandedId === msg.id && (
                      <tr key={`${msg.id}-expand`}>
                        <td colSpan={6} className="px-6 py-6 bg-gray-50/50">
                          <div className="max-w-2xl space-y-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="flex items-center gap-1.5 text-charcoal/80">
                                <User className="w-3.5 h-3.5 text-charcoal/80" />
                                {msg.name}
                              </span>
                              <span className="flex items-center gap-1.5 text-charcoal/80">
                                <Mail className="w-3.5 h-3.5 text-charcoal/80" />
                                {msg.email}
                              </span>
                              {msg.phone && (
                                <span className="flex items-center gap-1.5 text-charcoal/80">
                                  <Phone className="w-3.5 h-3.5 text-charcoal/80" />
                                  {msg.phone}
                                </span>
                              )}
                            </div>
                            {msg.subject && (
                              <p className="text-sm font-medium text-charcoal">
                                Subject: {msg.subject}
                              </p>
                            )}
                            <div className="bg-white rounded-xl border border-gray-100 p-4">
                              <p className="text-sm text-charcoal/85 whitespace-pre-wrap leading-relaxed">
                                {msg.message}
                              </p>
                            </div>
                            <p className="text-xs text-charcoal/80">
                              Received: {formatDate(msg.createdAt)}
                            </p>
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Delete Message
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this message? This action cannot
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
