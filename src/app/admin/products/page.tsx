"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Package,
} from "lucide-react";
import { formatPrice, truncate } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice: number | null;
  category: string;
  packSize: string;
  image: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const perPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
    );
  }, [products, search]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const toggleActive = async (product: Product) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !product.active }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, active: !p.active } : p
          )
        );
        toast.success(
          `Product ${!product.active ? "activated" : "deactivated"}`
        );
      }
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        toast.success("Product deleted successfully");
        setDeleteId(null);
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
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
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
        <input
          type="text"
          placeholder="Search products by name, category, or slug..."
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
        {paginatedProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
            <p className="text-charcoal/85 text-sm">
              {search ? "No products match your search" : "No products yet"}
            </p>
            {!search && (
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 mt-4 text-gold text-sm font-medium hover:text-gold-dark"
              >
                <Plus className="w-4 h-4" />
                Add your first product
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Product
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden md:table-cell">
                      Category
                    </th>
                    <th className="text-left text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Price
                    </th>
                    <th className="text-center text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">
                      Status
                    </th>
                    <th className="text-right text-xs font-medium text-charcoal/85 uppercase tracking-wider px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-charcoal truncate max-w-[200px]">
                              {product.name}
                            </p>
                            <p className="text-xs text-charcoal/80">
                              {product.packSize}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-xs font-medium text-charcoal/80 bg-gray-100 px-2.5 py-1 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-charcoal">
                            {formatPrice(product.price)}
                          </p>
                          {product.comparePrice && (
                            <p className="text-xs text-charcoal/80 line-through">
                              {formatPrice(product.comparePrice)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center hidden sm:table-cell">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.active
                              ? "bg-sage/10 text-sage"
                              : "bg-gray-100 text-charcoal/80"
                          }`}
                        >
                          {product.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-2 rounded-lg text-charcoal/80 hover:text-gold hover:bg-gold/5 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => toggleActive(product)}
                            className={`p-2 rounded-lg transition-colors ${
                              product.active
                                ? "text-charcoal/80 hover:text-orange-500 hover:bg-orange-50"
                                : "text-charcoal/80 hover:text-sage hover:bg-sage/5"
                            }`}
                            title={product.active ? "Deactivate" : "Activate"}
                          >
                            {product.active ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteId(product.id)}
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
                  {Math.min(page * perPage, filteredProducts.length)} of{" "}
                  {filteredProducts.length}
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
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-charcoal mb-2">
              Delete Product
            </h3>
            <p className="text-sm text-charcoal/80 mb-6">
              Are you sure you want to delete this product? This action cannot be
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
