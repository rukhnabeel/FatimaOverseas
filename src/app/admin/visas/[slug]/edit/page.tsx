"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

export default function EditVisaPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", country: "", priceLabel: "", price: "",
    processingTime: "", validity: "", imageUrl: "",
    documentsRequired: "", isPublished: true,
  });

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await fetch(`/api/visas/${slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        setForm({
          title: data.visa.title,
          country: data.visa.country,
          priceLabel: data.visa.priceLabel,
          price: data.visa.price.toString(),
          processingTime: data.visa.processingTime,
          validity: data.visa.validity,
          imageUrl: data.visa.imageUrl || "",
          documentsRequired: data.visa.documentsRequired,
          isPublished: data.visa.isPublished,
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load visa");
      } finally {
        setLoading(false);
      }
    };
    fetchVisa();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = { ...form, price: Number(form.price) || 0 };

    try {
      const res = await fetch(`/api/visas/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      router.push("/admin/visas");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update visa");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-sky-500">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/visas" className="p-2 rounded-xl text-sky-400 hover:bg-white hover:text-brand-dark border border-transparent hover:border-sky-100 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Edit Visa</h1>
          <p className="text-sky-500 mt-1">Update information for {form.title}.</p>
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
            <input required type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Country</label>
            <input required type="text" name="country" value={form.country} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Processing Time</label>
            <input required type="text" name="processingTime" value={form.processingTime} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Validity</label>
            <input required type="text" name="validity" value={form.validity} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Display Price Label</label>
            <input required type="text" name="priceLabel" value={form.priceLabel} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Numeric Price (in Paise)</label>
            <input required type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark">Documents Required (One per line)</label>
          <textarea required name="documentsRequired" value={form.documentsRequired} onChange={handleChange} rows={5} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all" />
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
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
