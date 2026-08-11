"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, RefreshCw, Stamp } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Visa {
  id: string;
  title: string;
  slug: string;
  country: string;
  priceLabel: string;
  processingTime: string;
  isPublished: boolean;
}

export default function AdminVisasPage() {
  const [visas, setVisas] = useState<Visa[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVisas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/visas?all=true");
      const data = await res.json();
      setVisas(data.visas ?? []);
    } catch {
      console.error("Failed to fetch visas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVisas(); }, [fetchVisas]);

  const filtered = visas.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()) ||
    v.country.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = async (visa: Visa) => {
    const res = await fetch(`/api/visas/${visa.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...visa, isPublished: !visa.isPublished }),
    });
    if (res.ok) {
      setVisas((prev) => prev.map((v) => v.slug === visa.slug ? { ...v, isPublished: !v.isPublished } : v));
    }
  };

  const deleteVisa = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this visa?")) return;
    const res = await fetch(`/api/visas/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setVisas((prev) => prev.filter((v) => v.slug !== slug));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-dark flex items-center gap-3">
            <Stamp className="w-8 h-8 text-brand-primary" />
            Visa Management
          </h1>
          <p className="text-sky-600 mt-1">Manage visa offerings and processing details.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchVisas}
            className="p-3 text-sky-600 hover:text-brand-primary hover:bg-sky-50 rounded-xl transition-colors"
            title="Refresh"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <Link
            href="/admin/visas/new"
            className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary transition-colors shadow-lg hover:shadow-xl shadow-brand-primary/20"
          >
            <Plus size={20} />
            Post New Visa
          </Link>
        </div>
      </div>

      {/* Filters & Content */}
      <div className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-sky-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400" />
            <input
              type="text"
              placeholder="Search visas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f0f9ff]/50 border-none rounded-xl text-brand-dark font-medium placeholder:text-sky-400 focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#f0f9ff]/30 text-sky-600 text-sm">
                <th className="px-6 py-4 font-bold rounded-tl-2xl">Title</th>
                <th className="px-6 py-4 font-bold">Country</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Processing</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right rounded-tr-2xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sky-400">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                    Loading visas...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sky-400">
                    No visas found. Create one!
                  </td>
                </tr>
              ) : (
                filtered.map((visa) => (
                  <tr key={visa.id} className="hover:bg-[#f0f9ff]/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-dark">{visa.title}</div>
                      <div className="text-xs text-sky-400 font-mono mt-0.5">/{visa.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-lg">
                        {visa.country}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-brand-primary">{visa.priceLabel}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-brand-dark">{visa.processingTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePublish(visa)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                          visa.isPublished 
                            ? "bg-green-100 text-green-700 hover:bg-green-200" 
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {visa.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/visas/${visa.slug}/edit`}
                          className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => deleteVisa(visa.slug)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
