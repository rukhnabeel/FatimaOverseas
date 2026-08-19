import type { Metadata } from "next";
import { Users, Ticket, Plane, ShieldCheck, Calendar, Briefcase, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

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

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function GroupFaresPage() {
  const whatsappMessage = "Assalamualaikum, I want to inquire about Group Fares.";
  const whatsappUrl = `https://wa.me/918853130084?text=${encodeURIComponent(whatsappMessage)}`;

  // Fetch active group fares
  const groupFares = await prisma.groupFare.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img 
          src="/menu/group-fares.png" 
          alt="Group Fares Background" 
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

      {/* Available Fares */}
      {groupFares.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Available Group Fares</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {groupFares.map((fare) => {
                const bookMessage = `Assalamualaikum, I want to book the group fare: ${fare.title} (${fare.sector}) priced at ${fare.priceLabel}.`;
                const bookUrl = `https://wa.me/918853130084?text=${encodeURIComponent(bookMessage)}`;

                return (
                  <div key={fare.id} className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="h-48 relative overflow-hidden bg-sky-50">
                      {fare.imageUrl ? (
                        <img src={fare.imageUrl} alt={fare.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sky-200">
                          <Plane size={64} />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-brand-primary font-bold text-sm shadow-sm">
                        {fare.seatsAvailable} Seats Left
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="text-xs font-bold tracking-wider text-sky-500 uppercase mb-1">{fare.airline}</div>
                          <h3 className="text-xl font-bold text-brand-dark leading-tight">{fare.title}</h3>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-black text-brand-primary">{fare.priceLabel}</div>
                          <div className="text-xs text-sky-400">per passenger</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-8 flex-1">
                        <div className="flex items-center gap-3 text-sm text-brand-dark">
                          <Plane className="w-4 h-4 text-sky-400 shrink-0" />
                          <span className="font-medium">{fare.sector}</span>
                        </div>
                        {fare.departureDate && (
                          <div className="flex items-center gap-3 text-sm text-brand-dark">
                            <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
                            <span>
                              {new Date(fare.departureDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                              {fare.returnDate && ` — ${new Date(fare.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                            </span>
                          </div>
                        )}
                        {fare.baggageAllowance && (
                          <div className="flex items-center gap-3 text-sm text-brand-dark">
                            <Briefcase className="w-4 h-4 text-sky-400 shrink-0" />
                            <span>{fare.baggageAllowance}</span>
                          </div>
                        )}
                      </div>

                      <a 
                        href={bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#f0f9ff] text-brand-primary font-bold rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors"
                      >
                        Inquire Now <ChevronRight size={18} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
