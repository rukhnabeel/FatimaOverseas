"use client";

import Link from "next/link";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const filters = ["All", "Umrah", "Hajj", "Ramadan", "Group", "Family"];

interface Package {
  id: string;
  title: string;
  slug: string;
  type: string;
  durationDays: number;
  priceLabel: string;
  hotelCategory: string;
  tag: string;
  imageUrl: string;
  isPublished: boolean;
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#f0f9ff] flex items-center justify-center">Loading packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}

function PackagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const activeFilter = typeParam && filters.includes(typeParam) ? typeParam : "All";

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/packages")
      .then((r) => r.json())
      .then((data) => setPackages(data.packages ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const displayed = activeFilter === "All"
    ? packages
    : packages.filter((p) => p.type === activeFilter);

  return (
    <div className="w-full min-h-screen bg-[#f0f9ff]">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-secondary text-white py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1579899388319-7e3e9d40134b?q=80&w=2000&auto=format&fit=crop" alt="Our Packages Background" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/20 rounded-full blur-3xl z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-brand-muted font-semibold text-sm uppercase tracking-widest">Explore</span>
          <h1 className="text-4xl md:text-6xl font-black mt-2 mb-4">Our Packages</h1>
          <p className="text-sky-200 max-w-xl mx-auto text-lg font-light">
            Premium Hajj &amp; Umrah packages tailored to every budget, timeline, and family size.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" className="w-full h-10 fill-[#f0f9ff]">
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border border-sky-100">
          <div className="flex items-center gap-2 text-brand-dark font-semibold">
            <SlidersHorizontal size={20} className="text-brand-primary" />
            <span>Filter By Type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  if (f === "All") {
                    router.push("/packages");
                  } else {
                    router.push(`/packages?type=${f}`);
                  }
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-md"
                    : "border border-sky-200 text-sky-600 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-light/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-sky-400 text-sm">{displayed.length} package{displayed.length !== 1 ? "s" : ""}</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl overflow-hidden border border-sky-100 bg-white animate-pulse">
                <div className="h-52 bg-gradient-to-br from-sky-100 to-sky-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-sky-100 rounded-full w-3/4" />
                  <div className="h-4 bg-sky-50 rounded-full w-1/2" />
                  <div className="h-4 bg-sky-50 rounded-full w-full" />
                  <div className="h-10 bg-sky-100 rounded-full w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && displayed.length === 0 && (
          <div className="text-center py-20 text-sky-400">
            <p className="text-5xl mb-4">🕌</p>
            <p className="text-lg font-semibold">No packages found for this filter.</p>
            <button onClick={() => router.push("/packages")} className="mt-4 text-brand-primary font-semibold hover:underline">
              Show all packages
            </button>
          </div>
        )}

        {/* Packages Grid */}
        {!loading && displayed.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((pkg) => (
              <div
                key={pkg.slug}
                className="group rounded-3xl overflow-hidden border border-sky-100 bg-white hover:shadow-2xl hover:shadow-sky-100 hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-52 bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary overflow-hidden">
                  {pkg.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={pkg.imageUrl} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop" alt={pkg.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-full shadow">{pkg.tag}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <span className="px-3 py-1 glass text-white text-xs font-semibold rounded-full">{pkg.durationDays} Days</span>
                    <span className="px-3 py-1 glass text-white text-xs font-semibold rounded-full">{pkg.hotelCategory}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors mb-1">{pkg.title}</h3>
                  <span className="text-xs text-brand-primary font-semibold uppercase tracking-wide mb-3">{pkg.type}</span>
                  <p className="text-sky-500 text-sm leading-relaxed flex-1">
                    Includes visa, direct flights, buffet meals, ziyarat tours &amp; accommodation near the Haram.
                  </p>
                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-sky-50">
                    <div>
                      <span className="text-xs text-sky-400 block">Starting from</span>
                      <span className="text-2xl font-black text-brand-secondary">{pkg.priceLabel}</span>
                    </div>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-semibold rounded-full hover:shadow-md hover:shadow-sky-300 transition-all"
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
