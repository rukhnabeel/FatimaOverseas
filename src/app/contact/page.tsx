"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 88531 30084, +91 70842 10406",
    href: "tel:+918853130084",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 88531 30084",
    href: "https://wa.me/918853130084",
  },
  {
    icon: Mail,
    label: "Email",
    value: "fatimaoverseas24@gmail.com",
    href: "mailto:fatimaoverseas24@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Yatharth Chamber Ground Floor 33 Cantt. Rd, Near Odeon Cinema, Lucknow - 226001",
    href: "#",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", packageType: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message from form data
    const msg = `Assalamualaikum! My name is ${form.name}.\nPhone: ${form.phone}\nEmail: ${form.email}\nInterested in: ${form.packageType || "General Enquiry"}\n\nMessage: ${form.message}`;
    window.open(`https://wa.me/918853130084?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-24 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1542044801-44bf83311ec6?q=80&w=2000&auto=format&fit=crop" alt="Contact Us Background" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-brand-muted text-sm font-semibold mb-6 uppercase tracking-widest">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">Contact Us</h1>
          <p className="text-sky-200 text-lg font-light max-w-xl mx-auto">
            Have a question about a package? Ready to book? Our team is here to help you every step of the way.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#f0f9ff]">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-black text-brand-dark mb-2">Let&apos;s Talk</h2>
                <p className="text-sky-600 leading-relaxed">
                  Whether you&apos;re planning your first Umrah or a family Hajj trip, reach out to us through any channel below.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-sky-100 hover:border-brand-primary/30 hover:shadow-md transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-light to-brand-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-brand-primary">
                      <c.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-brand-primary font-semibold uppercase tracking-wider">{c.label}</p>
                      <p className="text-brand-dark font-medium mt-0.5 text-sm">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl border border-sky-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-brand-primary" />
                  <h3 className="font-bold text-brand-dark">Office Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sky-500">Monday — Saturday</span>
                    <span className="font-semibold text-brand-dark">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-500">Sunday</span>
                    <span className="font-semibold text-brand-dark">10:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle size={40} className="text-[#25D366]" />
                    </div>
                    <h3 className="text-2xl font-black text-brand-dark mb-2">Message Sent!</h3>
                    <p className="text-sky-600">
                      You&apos;ve been redirected to WhatsApp. Our team will respond shortly, In sha&apos; Allah.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-3 border-2 border-brand-primary text-brand-primary rounded-full font-semibold hover:bg-brand-primary hover:text-white transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-brand-dark mb-1">Send an Enquiry</h2>
                    <p className="text-sky-500 text-sm mb-6">
                      Fill in your details and we&apos;ll send your message directly via WhatsApp.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Mohammed Ali"
                            className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                            Phone Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 9876543210"
                            className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Package of Interest</label>
                        <select
                          name="packageType"
                          value={form.packageType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all bg-white"
                        >
                          <option value="">Select a package type...</option>
                          <option>Economy Umrah</option>
                          <option>Standard Umrah</option>
                          <option>Premium Umrah</option>
                          <option>Economy Hajj</option>
                          <option>Premium Hajj</option>
                          <option>Holiday Packages</option>
                          <option>Hindu Religious Yatra</option>
                          <option>Other Services</option>
                          <option>Custom Package</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">
                          Your Message <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Tell us about your travel plans, dates, number of people..."
                          className="w-full px-4 py-3 rounded-xl border border-sky-200 text-brand-dark text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <MessageCircle size={20} />
                        Send via WhatsApp
                      </button>

                      <p className="text-center text-xs text-sky-400">
                        Your message will be sent to our WhatsApp number directly. We usually reply within minutes.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
