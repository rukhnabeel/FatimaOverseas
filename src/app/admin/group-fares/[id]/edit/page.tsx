"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function EditGroupFarePage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", airline: "", sector: "", priceLabel: "", price: "",
    departureDate: "", returnDate: "", seatsAvailable: "", baggageAllowance: "",
    imageUrl: "", isPublished: true,
  });

  useEffect(() => {
    const fetchFare = async () => {
      try {
        const res = await fetch("/api/group-fares?all=true");
        const data = await res.json();
        const fare = data.groupFares.find((f: any) => f.id === id);
        if (fare) {
          setForm({
            ...fare,
            price: fare.price.toString(),
            seatsAvailable: fare.seatsAvailable.toString(),
            departureDate: fare.departureDate ? new Date(fare.departureDate).toISOString().slice(0, 16) : "",
            returnDate: fare.returnDate ? new Date(fare.returnDate).toISOString().slice(0, 16) : "",
          });
        } else {
          setError("Fare not found");
        }
      } catch (err) {
        setError("Failed to load fare data");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchFare();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const slug = slugify(form.title);
    const payload = { 
      ...form, 
      slug, 
      price: Number(form.price) || 0,
      seatsAvailable: Number(form.seatsAvailable) || 0,
      departureDate: form.departureDate ? new Date(form.departureDate).toISOString() : null,
      returnDate: form.returnDate ? new Date(form.returnDate).toISOString() : null,
    };

    try {
      const res = await fetch(`/api/group-fares/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      router.push("/admin/group-fares");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update fare");
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
        <Link href="/admin/group-fares" className="p-2 rounded-xl text-sky-400 hover:bg-white hover:text-brand-dark border border-transparent hover:border-sky-100 transition-all"><ArrowLeft size={20} /></Link>
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Edit Group Fare</h1>
          <p className="text-sky-500 mt-1">Update details for this fare.</p>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-sky-100 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-bold text-brand-dark">Title</label>
            <input required type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Airline</label>
            <input required type="text" name="airline" value={form.airline} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Sector/Route</label>
            <input required type="text" name="sector" value={form.sector} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Departure Date</label>
            <input type="datetime-local" name="departureDate" value={form.departureDate} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Return Date</label>
            <input type="datetime-local" name="returnDate" value={form.returnDate} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Display Price Label</label>
            <input required type="text" name="priceLabel" value={form.priceLabel} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Numeric Price (in Paise)</label>
            <input required type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Seats Available</label>
            <input required type="number" name="seatsAvailable" value={form.seatsAvailable} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-dark">Baggage Allowance</label>
            <input required type="text" name="baggageAllowance" value={form.baggageAllowance} onChange={handleChange} className="w-full p-3 bg-[#f0f9ff]/50 border border-sky-100 rounded-xl" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-brand-dark">Airline/Fare Image</label>
          <ImageUpload value={form.imageUrl} onChange={(url) => setForm(prev => ({ ...prev, imageUrl: url }))} />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isPublished" name="isPublished" checked={form.isPublished} onChange={handleChange} className="w-5 h-5 text-brand-primary rounded border-sky-200 focus:ring-brand-primary" />
          <label htmlFor="isPublished" className="font-medium text-brand-dark cursor-pointer">Publish immediately</label>
        </div>

        <div className="pt-4 flex justify-end">
          <button disabled={saving} type="submit" className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-colors shadow-lg hover:shadow-xl shadow-brand-primary/20 disabled:opacity-70">
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={20} />}
            {saving ? "Saving..." : "Update Fare"}
          </button>
        </div>
      </form>
    </div>
  );
}
