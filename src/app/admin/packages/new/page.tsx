"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewPackagePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", type: "Umrah", durationDays: "", priceLabel: "", price: "",
    hotelCategory: "4★", hotelName: "", departureCity: "", tag: "", imageUrl: "",
    inclusions: "Visa Processing\nReturn Flights\nZiyarat Tours\nMeals\nLocal Transport",
    itinerary: "", isPublished: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const slug = slugify(form.title);
    const payload = { ...form, slug, durationDays: Number(form.durationDays), price: Number(form.price) || 0 };

    try {
      const res = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      router.push("/admin/packages");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save package");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/packages" className="p-2 rounded-xl text-sky-400 hover:bg-white hover:text-brand-dark border border-transparent hover:border-sky-100 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-brand-dark">New Package</h1>
          <p className="text-sky-500 text-sm mt-0.5">Fill in the details to create a new package.</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <h2 className="font-black text-brand-dark text-lg">Basic Information</h2>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Package Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              placeholder="e.g. Premium Umrah Package — 15 Days"
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
            {form.title && <p className="text-xs text-sky-400 mt-1">Slug: <code>{slugify(form.title)}</code></p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Package Type *</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                <option>Umrah</option><option>Hajj</option><option>Ramadan</option><option>Group</option><option>Family</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Tag / Badge *</label>
              <input name="tag" value={form.tag} onChange={handleChange} required placeholder="e.g. Budget, Popular, Luxury"
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Duration (days) *</label>
              <input name="durationDays" type="number" min="1" value={form.durationDays} onChange={handleChange} required placeholder="15"
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Price Display Label *</label>
              <input name="priceLabel" value={form.priceLabel} onChange={handleChange} required placeholder="₹95,000"
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Hotel Category *</label>
              <select name="hotelCategory" value={form.hotelCategory} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                <option>3★</option><option>4★</option><option>5★</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Hotel Name</label>
              <input name="hotelName" value={form.hotelName} onChange={handleChange} placeholder="Hilton Makkah"
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Departure Cities</label>
            <input name="departureCity" value={form.departureCity} onChange={handleChange} placeholder="Delhi / Mumbai / Hyderabad"
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
          <div>
            <ImageUpload 
              value={form.imageUrl} 
              onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))} 
              label="Package Cover Image" 
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <h2 className="font-black text-brand-dark text-lg">Package Content</h2>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Overview / Itinerary *</label>
            <textarea name="itinerary" value={form.itinerary} onChange={handleChange} required rows={4}
              placeholder="Describe the package journey and highlights..."
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">What&apos;s Included (one per line) *</label>
            <textarea name="inclusions" value={form.inclusions} onChange={handleChange} required rows={6}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none font-mono"
            />
            <p className="text-xs text-sky-400 mt-1">Each line becomes a checkbox item.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange}
              className="w-5 h-5 rounded accent-brand-primary cursor-pointer"
            />
            <div>
              <p className="font-semibold text-brand-dark text-sm">Publish immediately</p>
              <p className="text-xs text-sky-400">Package will appear on the website.</p>
            </div>
          </label>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-60"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Package"}
          </button>
        </div>
      </form>
    </div>
  );
}
