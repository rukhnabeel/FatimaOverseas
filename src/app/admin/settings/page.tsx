"use client";

import { useState, useEffect } from "react";
import { Save, Phone, Mail, MapPin, Globe, RefreshCw } from "lucide-react";

interface Settings {
  id: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  agencyName: string;
  foundedYear: string;
  licenseNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => prev ? { ...prev, [e.target.name]: e.target.value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!settings) return <div className="text-center py-20 text-sky-400">Failed to load settings.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Settings</h1>
          <p className="text-sky-500 mt-1">Manage contact details and integrations.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Phone size={18} className="text-brand-primary" />
            <h2 className="font-black text-brand-dark text-lg">Contact Information</h2>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">WhatsApp Number (with country code, no +)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 text-sm font-mono">wa.me/</span>
              <input name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange}
                className="w-full pl-16 pr-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 font-mono"
              />
            </div>
            <p className="text-xs text-sky-400 mt-1">Preview: wa.me/{settings.whatsappNumber}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Phone Number</label>
              <input name="phoneNumber" value={settings.phoneNumber} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Email Address</label>
              <input name="email" value={settings.email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Office Address</label>
            <input name="address" value={settings.address} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
          </div>
        </div>

        {/* Agency Info */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={18} className="text-brand-primary" />
            <h2 className="font-black text-brand-dark text-lg">Agency Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Agency Name</label>
              <input name="agencyName" value={settings.agencyName} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Founded Year</label>
              <input name="foundedYear" value={settings.foundedYear} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">License / Registration Number</label>
            <input name="licenseNumber" value={settings.licenseNumber} onChange={handleChange}
              placeholder="Government travel agency license number"
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Globe size={18} className="text-brand-primary" />
            <h2 className="font-black text-brand-dark text-lg">Social Media Links</h2>
          </div>
          {[
            { name: "facebookUrl", label: "Facebook Page URL", placeholder: "https://facebook.com/fatimaoverseas" },
            { name: "instagramUrl", label: "Instagram Profile URL", placeholder: "https://instagram.com/fatimaoverseas" },
            { name: "youtubeUrl", label: "YouTube Channel URL", placeholder: "https://youtube.com/@fatimaoverseas" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">{field.label}</label>
              <input name={field.name} value={settings[field.name as keyof Settings]} onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className={`flex items-center gap-2 px-8 py-4 font-bold rounded-xl transition-all disabled:opacity-60 ${saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-md hover:-translate-y-0.5"}`}
          >
            <Save size={18} /> {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
