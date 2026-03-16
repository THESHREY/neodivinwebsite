"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Save,
  Loader2,
  ChevronRight,
  ArrowLeft,
  Globe,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

interface PageContent {
  id: string;
  pageSlug: string;
  title: string;
  subtitle: string | null;
  content: string;
  heroImage: string | null;
  metaTitle: string | null;
  metaDesc: string | null;
  active: boolean;
}

const defaultPages = [
  { slug: "home", label: "Home Page", description: "Main landing page content" },
  { slug: "about", label: "About Us", description: "About NEH Wellness Centre" },
  { slug: "purpose", label: "Our Purpose", description: "Mission and purpose" },
  { slug: "philosophy", label: "Philosophy", description: "Spiritual philosophy" },
  {
    slug: "spiritual-message",
    label: "Spiritual Message",
    description: "Spiritual message from the founder",
  },
];

interface EditForm {
  title: string;
  subtitle: string;
  content: string;
  heroImage: string;
  metaTitle: string;
  metaDesc: string;
}

export default function ContentPage() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<EditForm>({
    title: "",
    subtitle: "",
    content: "",
    heroImage: "",
    metaTitle: "",
    metaDesc: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (err) {
      console.error("Failed to fetch content:", err);
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const openEditor = (slug: string) => {
    const existing = pages.find((p) => p.pageSlug === slug);
    const pageDef = defaultPages.find((p) => p.slug === slug);
    setForm({
      title: existing?.title || pageDef?.label || "",
      subtitle: existing?.subtitle || "",
      content: existing?.content || "",
      heroImage: existing?.heroImage || "",
      metaTitle: existing?.metaTitle || "",
      metaDesc: existing?.metaDesc || "",
    });
    setEditingSlug(slug);
  };

  const handleSave = async () => {
    if (!editingSlug) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${editingSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Page content saved");
        fetchContent();
        setEditingSlug(null);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-64" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Editor view
  if (editingSlug) {
    const pageDef = defaultPages.find((p) => p.slug === editingSlug);
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setEditingSlug(null)}
            className="p-2 rounded-lg text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-charcoal">
              Edit: {pageDef?.label}
            </h2>
            <p className="text-sm text-charcoal/85">{pageDef?.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-charcoal/80" />
              Page Content
            </h3>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Subtitle
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, subtitle: e.target.value }))
                }
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Content
              </label>
              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={12}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-charcoal/80" />
                Hero Image URL
              </label>
              <input
                type="text"
                value={form.heroImage}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, heroImage: e.target.value }))
                }
                placeholder="/images/hero-about.jpg"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-charcoal/80" />
              SEO Settings
            </h3>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Meta Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, metaTitle: e.target.value }))
                }
                placeholder="Page title for search engines"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
              <p className="text-xs text-charcoal/80 mt-1">
                {form.metaTitle.length}/60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
                Meta Description
              </label>
              <textarea
                value={form.metaDesc}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, metaDesc: e.target.value }))
                }
                rows={3}
                placeholder="Brief description for search engine results"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
              />
              <p className="text-xs text-charcoal/80 mt-1">
                {form.metaDesc.length}/160 characters
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setEditingSlug(null)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-charcoal/80 hover:text-charcoal hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pages list view
  return (
    <div className="space-y-6">
      <p className="text-sm text-charcoal/85">
        Manage the content for each page of your website.
      </p>

      <div className="space-y-3">
        {defaultPages.map((pageDef) => {
          const existing = pages.find((p) => p.pageSlug === pageDef.slug);
          return (
            <button
              key={pageDef.slug}
              onClick={() => openEditor(pageDef.slug)}
              className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-gold/20 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple/5 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple/60" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-charcoal">
                  {pageDef.label}
                </h3>
                <p className="text-xs text-charcoal/80">
                  {pageDef.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {existing ? (
                  <span className="px-2 py-1 bg-sage/10 text-sage rounded-full text-xs font-medium hidden sm:inline-block">
                    Has Content
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-charcoal/80 rounded-full text-xs font-medium hidden sm:inline-block">
                    Empty
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-charcoal/30 group-hover:text-gold transition-colors" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
