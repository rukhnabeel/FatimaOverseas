"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function NewVisaPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", country: "Saudi Arabia", priceLabel: "", price: "",
    processingTime: "3-5 Days", validity: "90 Days", imageUrl: "",
    documentsRequired: "Passport Copy\nPassport Size Photo\nPAN Card",
    isPublished: true,
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
    const payload = { ...form, slug, price: Number(form.price) || 0 };

    try {
      const res = await fetch("/api/visas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      router.push("/admin/visas");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save visa");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/visas" className="p-2 rounded-xl text-sky-400 hover:bg-white hover:text-brand-dark border border-transparent hover:border-sky-100 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Post New Visa</h1>
          <p className="text-sky-500 mt-1">Create a new visa offering for your customers.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-sky-100 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-brand-dark">Visa Title</label>
            <input required type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="e.g. Umrah Visa, Tourist Visa" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Country</label>
            <input required type="text" name="country" value={form.country} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="e.g. Saudi Arabia, UAE" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Processing Time</label>
            <input required type="text" name="processingTime" value={form.processingTime} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="e.g. 3-5 Days" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Validity</label>
            <input required type="text" name="validity" value={form.validity} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="e.g. 90 Days" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Display Price Label (e.g. ₹8,500)</label>
            <input required type="text" name="priceLabel" value={form.priceLabel} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="e.g. ₹8,500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Numeric Price (in Paise, e.g. 850000 for ₹8,500)</label>
            <input required type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="850000" />
            <p className="text-xs text-sky-500">Only used for sorting/filtering. Don't use commas.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark">Documents Required (One per line)</label>
          <textarea required name="documentsRequired" value={form.documentsRequired} onChange={handleChange} rows={5} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" placeholder="Passport Copy&#10;Photos&#10;Pan Card" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark">Visa Image</label>
          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))}
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isPublished" name="isPublished" checked={form.isPublished} onChange={handleChange} className="w-5 h-5 text-brand-primary rounded border-sky-200 focus:ring-brand-primary" />
          <label htmlFor="isPublished" className="font-medium text-brand-dark cursor-pointer">Publish immediately</label>
        </div>

        <div className="pt-4 flex justify-end">
          <button disabled={saving} type="submit" className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-colors shadow-lg hover:shadow-xl shadow-brand-primary/20 disabled:opacity-70">
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
            {saving ? "Saving..." : "Save Visa"}
          </button>
        </div>
      </form>
    </div>
  );
}
