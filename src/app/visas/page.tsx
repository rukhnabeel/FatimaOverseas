import type { Metadata } from "next";
import { FileText, CheckCircle2, Clock, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Visa Services | Fatima Overseas",
  description: "Fast, reliable, and hassle-free visa services for Saudi Arabia including Umrah, Hajj, and tourist visas.",
};

const features = [
  { icon: Clock, title: "Fast Processing", desc: "Get your visa approved quickly with our streamlined process." },
  { icon: CheckCircle2, title: "100% Guaranteed", desc: "High success rate with accurate document verification." },
  { icon: Globe, title: "All Types of Visas", desc: "Umrah, Hajj, Business, and Tourist visas available." },
];

export const revalidate = 0; // ensure dynamic rendering

export default async function VisasPage() {
  const visas = await prisma.visa.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img 
          src="/menu/visa.png" 
          alt="Visa Services Background" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" 
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-brand-muted text-sm font-semibold mb-6 uppercase tracking-widest">
            Visa Services
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Hassle-Free <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-muted to-white">Visa Processing</span>
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            We simplify the visa process so you can focus entirely on your spiritual journey. Let our experts handle the paperwork.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dynamic Visas Grid */}
          {visas.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Available Visas</h2>
                <p className="text-sky-600 max-w-2xl mx-auto">Select the visa that suits your needs and contact us directly to start the application process.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visas.map((visa: any) => {
                  const whatsappMessage = `Assalamualaikum, I want to inquire about the ${visa.title} (${visa.country}).`;
                  const whatsappUrl = `https://wa.me/918853130084?text=${encodeURIComponent(whatsappMessage)}`;
                  
                  return (
                    <div key={visa.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sky-100 hover:shadow-xl hover:shadow-brand-primary/10 transition-all group flex flex-col">
                      {visa.imageUrl ? (
                        <div className="h-48 relative overflow-hidden bg-sky-50">
                          <img src={visa.imageUrl} alt={visa.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-primary text-xs font-bold rounded-lg shadow-sm">
                              {visa.country}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center text-sky-300">
                          <FileText size={48} />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white text-brand-primary text-xs font-bold rounded-lg shadow-sm">
                              {visa.country}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{visa.title}</h3>
                          <div className="text-right">
                            <div className="text-lg font-black text-brand-primary">{visa.priceLabel}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="bg-[#f0f9ff] p-3 rounded-xl border border-sky-50">
                            <div className="text-xs text-sky-500 font-medium mb-1">Processing</div>
                            <div className="font-bold text-brand-dark">{visa.processingTime}</div>
                          </div>
                          <div className="bg-[#f0f9ff] p-3 rounded-xl border border-sky-50">
                            <div className="text-xs text-sky-500 font-medium mb-1">Validity</div>
                            <div className="font-bold text-brand-dark">{visa.validity}</div>
                          </div>
                        </div>

                        <div className="mb-6 flex-1">
                          <h4 className="text-sm font-bold text-brand-dark mb-2">Documents Required:</h4>
                          <ul className="space-y-1">
                            {visa.documentsRequired.split('\n').filter(Boolean).map((doc: string, i: number) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-sky-600">
                                <CheckCircle2 size={16} className="text-brand-primary mt-0.5 shrink-0" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <a 
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/20"
                        >
                          Inquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Why Choose Us */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-sky-100 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Why Choose Our Visa Services?</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {features.map((f, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#f0f9ff] text-brand-primary flex items-center justify-center mx-auto mb-4">
                    <f.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{f.title}</h3>
                  <p className="text-sky-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#f0f9ff] p-8 rounded-2xl text-center border border-sky-100">
              <FileText className="w-12 h-12 text-brand-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Need a different Visa?</h3>
              <p className="text-sky-600 mb-8 max-w-md mx-auto">
                Contact our visa specialists today on WhatsApp to get a personalized checklist of required documents and fast-track your application.
              </p>
              <a 
                href={`https://wa.me/918853130084?text=${encodeURIComponent("Assalamualaikum, I want to inquire about Visa services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] hover:scale-105 transition-all shadow-lg hover:shadow-xl shadow-[#25D366]/20"
              >
                Chat with Specialist
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
