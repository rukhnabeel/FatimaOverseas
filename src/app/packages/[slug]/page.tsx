import Link from "next/link";
import { Check, Calendar, MapPin, Star, Plane, Coffee, Car, MessageCircle, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { slug: string };

interface Package {
  id: string;
  title: string;
  slug: string;
  type: string;
  durationDays: number;
  priceLabel: string;
  hotelCategory: string;
  hotelName: string;
  departureCity: string;
  tag: string;
  inclusions: string;
  itinerary: string;
  imageUrl: string | null;
  isPublished: boolean;
}

async function getPackage(slug: string): Promise<Package | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/packages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.package ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return { title: "Package | Fatima Overseas" };
  return {
    title: `${pkg.title} | Fatima Overseas`,
    description: pkg.itinerary.slice(0, 160),
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const packageData = await getPackage(slug);

  if (!packageData) notFound();

  const inclusions = packageData.inclusions.split("\n").filter(Boolean);
  const whatsappMessage = `Assalamualaikum, I am interested in the *${packageData.title}* package (${packageData.priceLabel} per person). Please send me more details and availability.`;
  const whatsappUrl = `https://wa.me/918853130084?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full min-h-screen bg-[#f0f9ff] pb-24">
      {/* Hero */}
      <div className="relative h-[420px] bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary overflow-hidden">
        {packageData.imageUrl ? (
          <img src={packageData.imageUrl} alt={packageData.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <img src="/menu/hajj.png" alt={packageData.title} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-secondary/40 to-transparent" />

        <div className="absolute top-6 left-6 z-20">
          <Link href="/packages" className="flex items-center gap-2 glass text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
            <ArrowLeft size={16} /> All Packages
          </Link>
        </div>

        <div className="absolute inset-0 z-10 flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-full">{packageData.durationDays} Days</span>
              <span className="px-3 py-1 glass text-white text-xs font-bold rounded-full">{packageData.hotelCategory} Hotel</span>
              <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">{packageData.type}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3">{packageData.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-sky-200 text-sm">
              {packageData.departureCity && <span className="flex items-center gap-1.5"><MapPin size={16} /> {packageData.departureCity}</span>}
              {packageData.hotelName && <span className="flex items-center gap-1.5"><Star size={16} fill="currentColor" className="text-brand-accent" /> {packageData.hotelName}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-sky-100">
              <h2 className="text-2xl font-black text-brand-dark mb-4">Package Overview</h2>
              <p className="text-sky-600 leading-relaxed mb-8">{packageData.itinerary}</p>

              {inclusions.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-brand-dark mb-5">What&apos;s Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {inclusions.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-brand-light/60 rounded-xl">
                        <div className="w-7 h-7 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-brand-dark font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-sky-100">
              <h2 className="text-2xl font-black text-brand-dark mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-brand-light to-brand-muted rounded-2xl flex items-center justify-center text-brand-primary/40 text-3xl hover:scale-105 transition-transform cursor-pointer">
                    🕌
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-sky-100 sticky top-28">
              <div className="text-center pb-6 border-b border-sky-50 mb-6">
                <span className="text-sky-400 text-sm block mb-2">Starting Price</span>
                <span className="text-5xl font-black text-brand-secondary">{packageData.priceLabel}</span>
                <span className="text-sky-400 text-sm block mt-1">per person</span>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Calendar, label: "Duration", value: `${packageData.durationDays} Days` },
                  { icon: Plane, label: "Flights", value: "Included" },
                  { icon: Coffee, label: "Meals", value: "Included" },
                  { icon: Car, label: "Transport", value: "Included" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-sky-50">
                    <span className="text-sky-500 flex items-center gap-2 text-sm">
                      <row.icon size={16} className="text-brand-primary" /> {row.label}
                    </span>
                    <span className="font-semibold text-brand-dark text-sm">{row.value}</span>
                  </div>
                ))}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle size={22} /> Inquire on WhatsApp
              </a>
              <p className="text-center text-xs text-sky-400 mt-4">Usually replies within minutes!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
