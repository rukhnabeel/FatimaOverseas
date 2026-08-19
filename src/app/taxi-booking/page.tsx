import type { Metadata } from "next";
import { Car, Clock, ShieldCheck, MapPin, Users, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Taxi Booking | Fatima Overseas",
  description: "Reliable and comfortable taxi services across Saudi Arabia for Umrah and Hajj pilgrims.",
};

const features = [
  { icon: Car, title: "Comfortable Vehicles", desc: "Clean, air-conditioned cars and SUVs for your comfort." },
  { icon: Clock, title: "Punctual Service", desc: "On-time pickups and drop-offs to your destinations." },
  { icon: ShieldCheck, title: "Safe Drivers", desc: "Experienced and trusted drivers familiar with the routes." },
  { icon: MapPin, title: "City-to-City", desc: "Transfers between Jeddah, Makkah, and Madinah." },
];

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function TaxiBookingPage() {
  const whatsappMessage = "Assalamualaikum, I want to inquire about Taxi Booking.";
  const whatsappUrl = `https://wa.me/918853130084?text=${encodeURIComponent(whatsappMessage)}`;

  // Fetch active taxi bookings
  const taxiBookings = await prisma.taxiBooking.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img 
          src="/menu/taxi.png" 
          alt="Taxi Booking Background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" 
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-brand-muted text-sm font-semibold mb-6 uppercase tracking-widest">
            Taxi Booking
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Comfortable <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-muted to-white">Transport</span>
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Travel with ease between airports and holy cities. We provide reliable and safe taxi services for pilgrims.
          </p>
        </div>
      </section>

      {/* Available Taxis */}
      {taxiBookings.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Popular Taxi Routes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {taxiBookings.map((taxi) => {
                const bookMessage = `Assalamualaikum, I want to book a taxi: ${taxi.title} (${taxi.route}) for ${taxi.priceLabel}.`;
                const bookUrl = `https://wa.me/918853130084?text=${encodeURIComponent(bookMessage)}`;

                return (
                  <div key={taxi.id} className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="h-48 relative overflow-hidden bg-sky-50">
                      {taxi.imageUrl ? (
                        <img src={taxi.imageUrl} alt={taxi.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sky-200">
                          <Car size={64} />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-brand-primary font-bold text-sm shadow-sm flex items-center gap-1.5">
                        <Users size={14} /> Up to {taxi.capacity} Pax
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4 flex-1">
                        <div className="text-xs font-bold tracking-wider text-sky-500 uppercase mb-1">{taxi.vehicleType}</div>
                        <h3 className="text-xl font-bold text-brand-dark leading-tight mb-3">{taxi.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-brand-dark">
                          <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                          <span className="font-medium">{taxi.route}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-sky-50 flex items-center justify-between gap-4 mb-6">
                        <div className="text-sky-500 text-sm font-medium">Starting at</div>
                        <div className="text-2xl font-black text-brand-primary">{taxi.priceLabel}</div>
                      </div>

                      <a 
                        href={bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#f0f9ff] text-brand-primary font-bold rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-colors"
                      >
                        Book Ride <ChevronRight size={18} />
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
            <h2 className="text-3xl font-bold text-brand-dark mb-12 text-center">Why Book With Us?</h2>
            
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

            <div className="bg-gradient-to-r from-white to-[#f0f9ff] p-8 rounded-2xl text-center border border-sky-100 shadow-sm max-w-3xl mx-auto">
              <Car className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Book Your Ride Now</h3>
              <p className="text-sky-600 mb-8 max-w-md mx-auto">
                Need a pickup from Jeddah airport or a transfer to Madinah? Send us your details on WhatsApp and we will confirm your booking instantly.
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
