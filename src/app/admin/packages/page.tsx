"use client";

import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Package {
  id: string;
  title: string;
  slug: string;
  type: string;
  durationDays: number;
  priceLabel: string;
  hotelCategory: string;
  tag: string;
  isPublished: boolean;
}

const typeColors: Record<string, string> = {
  Umrah: "bg-brand-light text-brand-secondary",
  Hajj: "bg-amber-100 text-amber-700",
  "Holiday Packages": "bg-purple-100 text-purple-700",
  "Hindu Religious Yatra": "bg-orange-100 text-orange-700",
  Group: "bg-sky-100 text-sky-700",
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/packages?all=true");
      const data = await res.json();
      setPackages(data.packages ?? []);
    } catch {
      console.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const filtered = packages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = async (pkg: Package) => {
    const res = await fetch(`/api/packages/${pkg.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...pkg, isPublished: !pkg.isPublished }),
    });
    if (res.ok) {
      setPackages((prev) => prev.map((p) => p.slug === pkg.slug ? { ...p, isPublished: !p.isPublished } : p));
    }
  };

  const deletePackage = async (pkg: Package) => {
    if (!confirm(`Delete "${pkg.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/packages/${pkg.slug}`, { method: "DELETE" });
    if (res.ok) {
      setPackages((prev) => prev.filter((p) => p.slug !== pkg.slug));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark">Packages</h1>
          <p className="text-sky-500 mt-1">{packages.length} packages in database</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button onClick={fetchPackages} className="p-3 text-sky-400 hover:text-brand-primary hover:bg-white rounded-xl border border-transparent hover:border-sky-100 transition-all" title="Refresh">
            <RefreshCw size={18} />
          </button>
          <Link href="/admin/packages/new"
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Plus size={18} /> Add New Package
          </Link>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-sky-400">
            <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading packages...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f0f9ff] border-b border-sky-100">
                  <th className="text-left px-6 py-4 text-xs font-bold text-sky-500 uppercase tracking-wider">Package</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-sky-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-sky-500 uppercase tracking-wider">Duration</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-sky-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-4 text-xs font-bold text-sky-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-sky-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {filtered.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-[#f0f9ff]/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-brand-dark">{pkg.title}</p>
                      <p className="text-xs text-sky-400">{pkg.hotelCategory} · {pkg.tag}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${typeColors[pkg.type] || "bg-sky-100 text-sky-600"}`}>{pkg.type}</span>
                    </td>
                    <td className="px-4 py-4 text-brand-dark">{pkg.durationDays} Days</td>
                    <td className="px-4 py-4 font-bold text-brand-secondary">{pkg.priceLabel}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => togglePublish(pkg)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${pkg.isPublished ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                      >
                        {pkg.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/packages/${pkg.slug}`} target="_blank"
                          className="p-2 text-sky-400 hover:text-brand-primary hover:bg-brand-light rounded-lg transition-all" title="View">
                          <Eye size={16} />
                        </Link>
                        <Link href={`/admin/packages/${pkg.slug}/edit`}
                          className="p-2 text-sky-400 hover:text-brand-secondary hover:bg-brand-light rounded-lg transition-all" title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => deletePackage(pkg)}
                          className="p-2 text-sky-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-12 text-center text-sky-400">No packages found.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
