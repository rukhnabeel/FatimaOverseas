import type { Metadata } from "next";
import { ShieldCheck, Database, Lock, Eye, Mail, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Fatima Overseas",
  description: "Privacy Policy for Fatima Overseas.",
};

const sections = [
  {
    id: "introduction",
    icon: ShieldCheck,
    title: "1. Introduction",
    content: "Welcome to Fatima Overseas. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.",
  },
  {
    id: "data-collection",
    icon: Database,
    title: "2. The Data We Collect",
    content: "We may collect, use, store, and transfer different kinds of personal data about you for the purpose of processing your Hajj, Umrah, or Visa applications. This includes Identity Data (passport, name, DOB), Contact Data (address, email, phone), Financial Data (payment details), and Transaction Data.",
  },
  {
    id: "usage",
    icon: Eye,
    title: "3. How We Use Your Data",
    content: "We will only use your personal data when the law allows us to. Most commonly, we use your personal data to perform the contract we are about to enter into with you (e.g., booking flights, hotels, visas), where it is necessary for our legitimate interests, or to comply with a legal obligation.",
  },
  {
    id: "security",
    icon: Lock,
    title: "4. Data Security",
    content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data to those employees and agents who have a business need to know.",
  },
  {
    id: "sharing",
    icon: Share2,
    title: "5. Sharing Your Data",
    content: "To provide our services, we may have to share your personal data with third parties such as airlines, hotels, transport companies, and embassies (e.g., Saudi Ministry of Hajj and Umrah) for visa processing.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f0f9ff]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop" alt="Privacy Background" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-brand-muted" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Privacy Policy
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Your trust is our priority. Learn how we collect, protect, and use your personal information.
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
                    <Mail size={16} />
                    6. Contact Us
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

                  <div id="contact" className="scroll-mt-24 bg-sky-50 rounded-2xl p-8 border border-sky-100 mt-12">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                      <Mail className="text-brand-primary" />
                      6. Contact Us
                    </h2>
                    <p className="text-sky-700 mb-6 leading-relaxed">
                      If you have any questions about this privacy policy or our privacy practices, please contact us.
                    </p>
                    <div className="space-y-2 text-brand-dark font-medium">
                      <p>Fatima Overseas</p>
                      <p className="text-sky-600">Email: <a href="mailto:info@fatimaoverseas.com" className="text-brand-primary hover:underline">info@fatimaoverseas.com</a></p>
                      <p className="text-sky-600">Phone: <a href="tel:+918853130084" className="text-brand-primary hover:underline">+91 8853130084</a></p>
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
