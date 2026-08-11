import Link from "next/link";
import { ArrowRight, Star, Shield, HeartHandshake, Map } from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";

const features = [
  { icon: Star, title: "Premium Hotels", desc: "Stay in top-rated hotels steps from the Haram, for maximum comfort and convenience." },
  { icon: Shield, title: "Verified Agency", desc: "Government approved and certified travel agency you can trust fully." },
  { icon: HeartHandshake, title: "Expert Guidance", desc: "Accompanied by experienced scholars for deep spiritual guidance." },
  { icon: Map, title: "Complete Logistics", desc: "Visa, flights, local transport, and ziyarat handled seamlessly end-to-end." },
];


const packages = [
  { title: "Economy Umrah", duration: "10 Days", price: "₹65,000", hotel: "3★", tag: "Budget-Friendly", slug: "economy-umrah", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop" },
  { title: "Premium Umrah", duration: "15 Days", price: "₹95,000", hotel: "5★", tag: "Most Popular", slug: "premium-umrah", image: "https://images.unsplash.com/photo-1584988636166-512c9c546db2?q=80&w=800&auto=format&fit=crop" },
  { title: "Family Hajj", duration: "21 Days", price: "₹1,85,000", hotel: "4★", tag: "Family Special", slug: "family-hajj", image: "https://images.unsplash.com/photo-1580250645607-422878c7a6e1?q=80&w=800&auto=format&fit=crop" },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Features / Why Choose Us ── */}
      <section className="py-24 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-2 mb-4">Built for the Believer</h2>
            <p className="text-sky-600 max-w-xl mx-auto">Every detail of your sacred journey is handled with care, expertise, and devotion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-sky-100 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-light to-brand-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-brand-primary">
                  <f.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{f.title}</h3>
                <p className="text-sky-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Packages ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Popular Packages</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-2 mb-4">Find Your Package</h2>
            <p className="text-sky-600 max-w-xl mx-auto">Carefully designed packages for every budget and preference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.slug}
                className="group rounded-3xl overflow-hidden border border-sky-100 bg-white hover:shadow-2xl hover:shadow-sky-100 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Card image area */}
                <div className="relative h-52 bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-40 h-40 rounded-full bg-white blur-3xl" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-brand-accent text-white text-xs font-bold rounded-full shadow">
                      {pkg.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 glass text-white text-xs font-semibold rounded-full">
                      {pkg.duration}
                    </span>
                  </div>
                  <img 
                    src={pkg.image}
                    alt={pkg.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{pkg.title}</h3>
                    <span className="text-xs bg-brand-light text-brand-secondary font-semibold px-2 py-1 rounded-full">{pkg.hotel}</span>
                  </div>
                  <p className="text-sky-600 text-sm mb-6 leading-relaxed">
                    Includes visa, direct flights, meals, ziyarat tours & accommodation near the Haram.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-sky-50">
                    <div>
                      <span className="text-xs text-sky-400 block">Starting from</span>
                      <span className="text-2xl font-black text-brand-secondary">{pkg.price}</span>
                    </div>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-semibold rounded-full hover:shadow-md hover:shadow-sky-300 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/packages" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-primary text-brand-primary font-bold rounded-full hover:bg-brand-primary hover:text-white transition-all duration-200">
              View All Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust / Testimonials placeholder ── */}
      <section className="py-20 bg-gradient-to-br from-brand-dark to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-brand-muted font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-black mt-2 mb-12">What Our Pilgrims Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Aisha Begum", city: "Delhi", quote: "Alhamdulillah, everything was perfectly arranged. Best Umrah experience of my life!" },
              { name: "Mohammad Saleem", city: "Mumbai", quote: "The team was incredibly supportive throughout the journey. Highly recommended!" },
              { name: "Fatima Khatoon", city: "Hyderabad", quote: "5-star hotel right next to Haram. The ziyarat tours were deeply spiritual." },
            ].map((t) => (
              <div key={t.name} className="glass rounded-3xl p-6 text-left">
                <div className="flex text-brand-accent mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sky-100 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-sky-400 text-xs">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
