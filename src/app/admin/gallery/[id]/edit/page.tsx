"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

export default function EditGalleryImagePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", imageUrl: "", isPublished: true,
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch("/api/gallery?all=true");
        const data = await res.json();
        const img = data.galleryImages.find((i: any) => i.id === id);
        if (img) {
          setForm(img);
        } else {
          setError("Image not found");
        }
      } catch (err) {
        setError("Failed to load image data");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchImage();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.imageUrl) {
      setError("Please upload an image.");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      router.push("/admin/gallery");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update image");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><RefreshCw className="w-8 h-8 animate-spin text-brand-primary" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery" className="p-2 rounded-xl text-sky-400 hover:bg-white hover:text-brand-dark border border-transparent hover:border-sky-100 transition-all"><ArrowLeft size={20} /></Link>
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Edit Image</h1>
          <p className="text-sky-500 mt-1">Update details for this gallery picture.</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-sky-100 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark">Title / Description (Max 100 characters)</label>
          <input required type="text" name="title" maxLength={100} value={form.title} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          <p className="text-xs text-sky-500 text-right">{form.title.length}/100</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark">Image</label>
          <ImageUpload value={form.imageUrl} onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))} />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isPublished" name="isPublished" checked={form.isPublished} onChange={handleChange} className="w-5 h-5 text-brand-primary rounded border-sky-200 focus:ring-brand-primary" />
          <label htmlFor="isPublished" className="font-medium text-brand-dark cursor-pointer">Publish immediately</label>
        </div>

        <div className="pt-4 flex justify-end">
          <button disabled={saving} type="submit" className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-colors shadow-lg hover:shadow-xl shadow-brand-primary/20 disabled:opacity-70">
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
            {saving ? "Saving..." : "Update Image"}
          </button>
        </div>
      </form>
    </div>
  );
}
