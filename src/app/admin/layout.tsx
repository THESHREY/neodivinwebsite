"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  ShoppingBag,
  Mail,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Calendar,
  CalendarDays,
  GraduationCap,
  CreditCard,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Page Content", href: "/admin/content", icon: FileText },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Courses", href: "/admin/courses", icon: GraduationCap },
  { label: "Pricing", href: "/admin/pricing", icon: CreditCard },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't render admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show nothing while loading session (middleware protects routes)
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-gold/30 border-t-gold rounded-full animate-spin" />
          <p className="text-charcoal/85 text-sm font-body">Loading...</p>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const getPageTitle = () => {
    const current = navItems.find((item) => isActive(item.href));
    if (pathname.includes("/products/new")) return "New Product";
    if (pathname.match(/\/products\/[^/]+$/) && !pathname.includes("/new"))
      return "Edit Product";
    return current?.label || "Dashboard";
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[260px] bg-charcoal z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-6 border-b border-cream/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-cream font-semibold text-sm">NEH Wellness</h2>
              <p className="text-cream/40 text-xs">Admin Panel</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-5 right-4 text-cream/50 hover:text-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                      active
                        ? "bg-gold/15 text-gold"
                        : "text-cream/60 hover:text-cream hover:bg-cream/5"
                    }`}
                  >
                    <Icon
                      className={`w-[18px] h-[18px] ${
                        active ? "text-gold" : "text-cream/40 group-hover:text-cream/70"
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {active && (
                      <ChevronRight className="w-4 h-4 ml-auto text-gold/60" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign Out */}
        <div className="px-3 py-4 border-t border-cream/5">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/50 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-[260px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-charcoal font-body">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-charcoal">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-xs text-charcoal/85">
                  {session?.user?.email}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="text-gold font-semibold text-sm">
                  {(session?.user?.name || "A").charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
