"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import ImageUpload from "@/components/ImageUpload";

interface PackageData {
  id: string; title: string; slug: string; type: string; durationDays: number;
  priceLabel: string; price: number; hotelCategory: string; hotelName: string;
  departureCity: string; tag: string; imageUrl: string; inclusions: string; itinerary: string; isPublished: boolean;
}

export default function EditPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<PackageData | null>(null);

  useEffect(() => {
    fetch(`/api/packages/${slug}`)
      .then((r) => r.json())
      .then((d) => setForm(d.package ?? null))
      .catch(() => setError("Failed to load package"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value } : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/packages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, durationDays: Number(form.durationDays) }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to save");
      router.push("/admin/packages");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!form) return <div className="text-center py-20 text-sky-400"><p>Package not found.</p><Link href="/admin/packages" className="text-brand-primary font-semibold hover:underline mt-2 inline-block">← Back</Link></div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/packages" className="p-2 rounded-xl text-sky-400 hover:bg-white hover:text-brand-dark border border-transparent hover:border-sky-100 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Edit Package</h1>
          <p className="text-sky-500 text-sm mt-0.5">{form.title}</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <h2 className="font-black text-brand-dark text-lg">Basic Information</h2>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Package Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Type</label>
              <select name="type" value={form.type} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                <option>Umrah</option><option>Hajj</option><option>Ramadan</option><option>Group</option><option>Family</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Tag / Badge</label>
              <input name="tag" value={form.tag} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Duration (days)</label>
              <input name="durationDays" type="number" min="1" value={form.durationDays} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Price Display Label</label>
              <input name="priceLabel" value={form.priceLabel} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Hotel Category</label>
              <select name="hotelCategory" value={form.hotelCategory} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white">
                <option>3★</option><option>4★</option><option>5★</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-1.5">Hotel Name</label>
              <input name="hotelName" value={form.hotelName} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Departure Cities</label>
            <input name="departureCity" value={form.departureCity} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20" />
          </div>
          <div>
            <ImageUpload 
              value={form.imageUrl} 
              onChange={(url) => setForm(prev => prev ? { ...prev, imageUrl: url } : prev)} 
              label="Package Cover Image" 
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm space-y-5">
          <h2 className="font-black text-brand-dark text-lg">Content</h2>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Overview / Itinerary</label>
            <textarea name="itinerary" value={form.itinerary} onChange={handleChange} rows={4}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Inclusions (one per line)</label>
            <textarea name="inclusions" value={form.inclusions} onChange={handleChange} rows={6}
              className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none font-mono" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-sky-100 p-6 shadow-sm flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange}
              className="w-5 h-5 rounded accent-brand-primary cursor-pointer" />
            <div>
              <p className="font-semibold text-brand-dark text-sm">Published</p>
              <p className="text-xs text-sky-400">Visible on the website.</p>
            </div>
          </label>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
