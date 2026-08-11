import type { Metadata } from "next";
import { Users, Ticket, Plane, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Group Fares | Fatima Overseas",
  description: "Special discounted flight rates for large groups traveling for Umrah, Hajj, or tours.",
};

const features = [
  { icon: Users, title: "Large Capacity", desc: "We manage bookings for groups of any size seamlessly." },
  { icon: Ticket, title: "Special Discounts", desc: "Enjoy exclusive reduced rates on top airlines." },
  { icon: Plane, title: "Custom Routing", desc: "Flexible travel dates and convenient routes for your group." },
  { icon: ShieldCheck, title: "Secure Booking", desc: "100% reliable reservations with confirmed PNRs." },
];

export default function GroupFaresPage() {
  const whatsappMessage = "Assalamualaikum, I want to inquire about Group Fares.";
  const whatsappUrl = `https://wa.me/918853130084?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1540339832862-4745998073b1?q=80&w=2000&auto=format&fit=crop" 
          alt="Group Fares" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" 
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-brand-muted text-sm font-semibold mb-6 uppercase tracking-widest">
            Group Fares
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Fly Together, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-muted to-white">Save Together</span>
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Traveling in a large group? Get access to exclusive discounted flight rates and priority seating.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-sky-100">
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Benefits of Group Fares</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {features.map((f, i) => (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-[#f0f9ff] text-brand-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <f.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{f.title}</h3>
                  <p className="text-sky-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-[#f0f9ff] to-white p-8 rounded-2xl text-center border border-sky-100 shadow-sm max-w-3xl mx-auto">
              <Users className="w-12 h-12 text-brand-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Get Your Group Quote</h3>
              <p className="text-sky-600 mb-8 max-w-md mx-auto">
                Tell us your destination, dates, and group size, and we will provide you with the best possible discounted rates on WhatsApp.
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
