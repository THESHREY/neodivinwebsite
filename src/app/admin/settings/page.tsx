"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  Globe,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Building,
} from "lucide-react";
import toast from "react-hot-toast";

interface SettingsForm {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialSettings: SettingsForm = {
  siteName: "",
  tagline: "",
  email: "",
  phone: "",
  address: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  whatsappNumber: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsForm>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings({
          siteName: data.siteName || "",
          tagline: data.tagline || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          instagramUrl: data.instagramUrl || "",
          facebookUrl: data.facebookUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          whatsappNumber: data.whatsappNumber || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Settings saved successfully");
      } else {
        toast.error("Failed to save settings");
      }
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (res.ok) {
        toast.success("Password changed successfully");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to change password");
      }
    } catch {
      toast.error("Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-32 mb-5" />
            <div className="space-y-4">
              <div className="h-10 bg-gray-100 rounded-xl" />
              <div className="h-10 bg-gray-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Site Info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider flex items-center gap-2">
          <Building className="w-4 h-4 text-charcoal/80" />
          Site Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, siteName: e.target.value }))
              }
              placeholder="NEO Divine Products"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, tagline: e.target.value }))
              }
              placeholder="Making Moment Magical"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-charcoal/80" />
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="info@nehwellness.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-charcoal/80" />
              Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-charcoal/80" />
            Address
          </label>
          <textarea
            value={settings.address}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, address: e.target.value }))
            }
            rows={2}
            placeholder="Full business address"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 resize-none"
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-charcoal/80" />
          Social Media
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-charcoal/80" />
              Instagram URL
            </label>
            <input
              type="url"
              value={settings.instagramUrl}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  instagramUrl: e.target.value,
                }))
              }
              placeholder="https://instagram.com/..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5 text-charcoal/80" />
              Facebook URL
            </label>
            <input
              type="url"
              value={settings.facebookUrl}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  facebookUrl: e.target.value,
                }))
              }
              placeholder="https://facebook.com/..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-charcoal/80" />
              YouTube URL
            </label>
            <input
              type="url"
              value={settings.youtubeUrl}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  youtubeUrl: e.target.value,
                }))
              }
              placeholder="https://youtube.com/..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-charcoal/80" />
              WhatsApp Number
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  whatsappNumber: e.target.value,
                }))
              }
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-charcoal/80" />
          Payment
        </h3>

        <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
          <div className="w-3 h-3 rounded-full bg-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Stripe Test Mode
            </p>
            <p className="text-xs text-yellow-600 mt-0.5">
              Payment processing is in test mode. Switch to live mode in your
              environment variables when ready.
            </p>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="px-6 py-2.5 bg-gold text-charcoal rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Settings
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-charcoal/80" />
          Change Password
        </h3>

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/80"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/80"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal/85 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-body focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
            />
            {passwordForm.confirmPassword &&
              passwordForm.newPassword !== passwordForm.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
          </div>

          <button
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="px-5 py-2.5 bg-charcoal text-cream rounded-xl text-sm font-semibold hover:bg-charcoal-light transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {changingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
