import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CreditCard, XCircle, FileSearch, RefreshCcw, AlertTriangle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Fatima Overseas",
  description: "Terms and Conditions for Fatima Overseas packages and services.",
};

const sections = [
  {
    id: "agreement",
    icon: FileText,
    title: "1. Agreement to Terms",
    content: "By booking a Hajj, Umrah, Visa, or any travel package with Fatima Overseas, you agree to be bound by these Terms and Conditions. These terms form the contract between you (the Pilgrim/Traveler) and Fatima Overseas.",
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "2. Bookings and Payments",
    content: "A non-refundable deposit is required at the time of booking to secure your seat. The full balance must be paid by the deadline specified in your confirmation. Prices are subject to change due to currency fluctuations or Saudi Ministry policies, but are guaranteed once fully paid.",
  },
  {
    id: "cancellations",
    icon: XCircle,
    title: "3. Cancellations & Refunds",
    content: "Cancellations must be submitted in writing. The initial deposit is non-refundable. Cancellations made after visas have been issued or flights ticketed incur 100% cancellation charges. Rejections by the Saudi Embassy will be refunded minus administrative fees.",
  },
  {
    id: "visa",
    icon: FileSearch,
    title: "4. Visa & Documentation",
    content: "While we assist in the visa application process, issuance is solely at the discretion of the Saudi Embassy. We are not liable for delays or rejections. Passports must be valid for at least 6 months from the date of travel.",
  },
  {
    id: "itinerary",
    icon: RefreshCcw,
    title: "5. Changes to Itinerary",
    content: "Fatima Overseas reserves the right to modify the itinerary, change hotels (to similar standards), or alter flights if circumstances beyond our control dictate (e.g., airline schedule changes, government regulations).",
  },
  {
    id: "liability",
    icon: AlertTriangle,
    title: "6. Liability",
    content: "Fatima Overseas acts only as an agent for suppliers. We accept no liability for loss, damage, injury, delay, or irregularity caused by defects in vehicles or acts of companies engaged in conveying passengers.",
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66cb85?q=80&w=2000&auto=format&fit=crop" alt="Terms Background" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-brand-muted" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Terms & Conditions
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Please read these terms carefully before booking any package with us to ensure a smooth journey.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <div className="hidden md:block w-1/3">
              <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-sm border border-sky-100">
                <h3 className="text-lg font-bold text-brand-dark mb-4 uppercase tracking-wider">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((sec) => (
                    <a key={sec.id} href={`#${sec.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 text-sky-700 hover:text-brand-primary transition-colors text-sm font-medium">
                      <sec.icon size={16} />
                      {sec.title}
                    </a>
                  ))}
                  <a href="#contact" className="flex items-center gap-3 p-3 rounded-xl hover:bg-sky-50 text-sky-700 hover:text-brand-primary transition-colors text-sm font-medium">
                    <Phone size={16} />
                    7. Contact Info
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-sky-100">
                <div className="mb-10 pb-6 border-b border-sky-100">
                  <p className="text-sm text-sky-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                    Last Updated: August 2026
                  </p>
                </div>

                <div className="space-y-12">
                  {sections.map((sec) => (
                    <div key={sec.id} id={sec.id} className="scroll-mt-24 group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-sky-50 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                          <sec.icon size={24} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-brand-dark mb-3">{sec.title}</h2>
                          <p className="text-sky-700 leading-relaxed">{sec.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div id="contact" className="scroll-mt-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl p-8 mt-12 text-white shadow-xl shadow-brand-primary/20">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <Phone className="text-white/80" />
                      7. Contact Information
                    </h2>
                    <p className="text-sky-100 mb-6 leading-relaxed">
                      For any questions regarding these terms, please reach out to us directly.
                    </p>
                    <div className="space-y-3 font-medium">
                      <p className="text-lg">Fatima Overseas</p>
                      <p className="text-sky-100 flex items-center gap-2">
                        Phone: <a href="tel:+918853130084" className="text-white hover:underline">+91 8853130084</a>
                      </p>
                      <Link href="/contact" className="inline-block mt-2 px-6 py-2 bg-white text-brand-primary rounded-full text-sm font-bold hover:scale-105 transition-transform">
                        Visit Contact Page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
