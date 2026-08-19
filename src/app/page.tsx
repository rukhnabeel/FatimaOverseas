import Link from "next/link";
import { ArrowRight, Star, Shield, HeartHandshake, Map, Plane, FileText, CheckCircle, PhoneCall, FileCheck, Car, Users } from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";

const features = [
  { icon: Star, title: "Premium Hotels", desc: "Stay in top-rated hotels steps from the Haram, for maximum comfort and convenience." },
  { icon: Shield, title: "Verified Agency", desc: "Government approved and certified travel agency you can trust fully." },
  { icon: HeartHandshake, title: "Expert Guidance", desc: "Accompanied by experienced scholars for deep spiritual guidance." },
  { icon: Map, title: "Complete Logistics", desc: "Visa, flights, local transport, and ziyarat handled seamlessly end-to-end." },
];


const packages = [
  { title: "Economy Umrah", duration: "10 Days", price: "₹65,000", hotel: "3★", tag: "Budget-Friendly", slug: "economy-umrah", image: "/menu/umrah.png" },
  { title: "Premium Umrah", duration: "15 Days", price: "₹95,000", hotel: "5★", tag: "Most Popular", slug: "premium-umrah", image: "/menu/hajj.png" },
  { title: "Family Hajj", duration: "21 Days", price: "₹1,85,000", hotel: "4★", tag: "Family Special", slug: "family-hajj", image: "/menu/family.png" },
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

      {/* ── Our Services ── */}
      <section className="py-24 bg-white border-t border-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Beyond Packages</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-2 mb-4">Comprehensive Services</h2>
            <p className="text-sky-600 max-w-xl mx-auto">We provide end-to-end travel solutions to ensure a completely hassle-free experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/visas" className="group p-8 rounded-3xl bg-[#f8fcff] border border-sky-100 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white text-brand-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <FileCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-white transition-colors">Visa Processing</h3>
              <p className="text-sky-600 leading-relaxed mb-6 group-hover:text-sky-100 transition-colors">Fast and reliable Umrah, Hajj, and tourist visa processing with minimal documentation.</p>
              <span className="inline-flex items-center gap-2 text-brand-primary font-bold group-hover:text-white transition-colors">Learn More <ArrowRight size={18} /></span>
            </Link>

            <Link href="/taxi-booking" className="group p-8 rounded-3xl bg-[#f8fcff] border border-sky-100 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white text-brand-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Car size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-white transition-colors">Local Transport</h3>
              <p className="text-sky-600 leading-relaxed mb-6 group-hover:text-sky-100 transition-colors">Comfortable AC cabs and buses for airport transfers and local ziyarat tours in Saudi Arabia.</p>
              <span className="inline-flex items-center gap-2 text-brand-primary font-bold group-hover:text-white transition-colors">Learn More <ArrowRight size={18} /></span>
            </Link>

            <Link href="/group-fares" className="group p-8 rounded-3xl bg-[#f8fcff] border border-sky-100 hover:bg-brand-primary hover:border-brand-primary transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white text-brand-primary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-white transition-colors">Group Fares</h3>
              <p className="text-sky-600 leading-relaxed mb-6 group-hover:text-sky-100 transition-colors">Special discounted airline fares for large groups and families traveling together.</p>
              <span className="inline-flex items-center gap-2 text-brand-primary font-bold group-hover:text-white transition-colors">Learn More <ArrowRight size={18} /></span>
            </Link>
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

      {/* ── How It Works ── */}
      <section className="py-24 bg-[#f0f9ff] border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-4xl font-black text-brand-dark mt-2 mb-4">How To Book Your Journey</h2>
            <p className="text-sky-600 max-w-xl mx-auto">Four simple steps between you and the House of Allah.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-sky-200" />
            
            {[
              { icon: Map, title: "1. Choose Package", desc: "Select from our range of Economy, Premium, or Custom packages." },
              { icon: FileText, title: "2. Submit Docs", desc: "Provide your passport, photos, and necessary documents." },
              { icon: CheckCircle, title: "3. Get Visa & Tickets", desc: "We process your visa and confirm your flights and hotels." },
              { icon: Plane, title: "4. Begin Journey", desc: "Travel with peace of mind and complete spiritual focus." },
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center group">
                <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-[#f0f9ff] shadow-xl shadow-sky-100 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">{step.title}</h3>
                <p className="text-sky-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust / Testimonials ── */}
      <section className="py-24 bg-gradient-to-br from-brand-dark to-brand-secondary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-brand-muted font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 mb-16">What Our Pilgrims Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Aisha Begum", city: "Delhi", quote: "Alhamdulillah, everything was perfectly arranged. The hotels were very close to the Haram, and the food was excellent. Best Umrah experience of my life!" },
              { name: "Mohammad Saleem", city: "Mumbai", quote: "The team was incredibly supportive throughout the journey. From visa processing to local ziyarat, everything was smooth. Highly recommended!" },
              { name: "Fatima Khatoon", city: "Hyderabad", quote: "5-star hotel right next to Haram. The ziyarat tours were deeply spiritual and our scholar guided us perfectly. Thank you Fatima Overseas." },
            ].map((t) => (
              <div key={t.name} className="glass rounded-3xl p-8 text-left hover:-translate-y-2 transition-transform duration-300">
                <div className="flex text-amber-400 mb-4 gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sky-100 text-sm leading-relaxed mb-6 font-light">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/50 flex items-center justify-center font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-sky-300 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f0f9ff] rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-light/30 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-primary rotate-12">
            <PhoneCall size={40} className="-rotate-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-sky-600 mb-10 max-w-2xl mx-auto">
            Contact our travel experts today for a free consultation and let us help you plan the perfect pilgrimage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+918853130084"
              className="px-8 py-4 bg-brand-primary text-white font-bold rounded-full hover:bg-brand-secondary transition-all shadow-lg hover:shadow-brand-primary/30 flex items-center justify-center gap-2 text-lg"
            >
              Call Now: +91 8853130084
            </a>
            <Link 
              href="/contact"
              className="px-8 py-4 bg-white text-brand-primary font-bold rounded-full border-2 border-brand-primary hover:bg-brand-light transition-all flex items-center justify-center gap-2 text-lg"
            >
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
