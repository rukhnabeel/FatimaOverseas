import Link from 'next/link';
import { Mail, MapPin, Phone, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* Top CTA strip */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to Begin Your Journey?</h3>
            <p className="text-sky-100">Speak with our expert team and book your perfect package today.</p>
          </div>
          <a
            href="https://wa.me/918853130084?text=Assalamualaikum, I am interested in your Hajj/Umrah packages."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 bg-white text-brand-secondary font-bold rounded-full hover:bg-brand-light transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
          >
            WhatsApp Us Now →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4">
              <img src="/logo.jpg" alt="Fatima Overseas Logo" className="h-16 w-auto object-contain bg-white rounded p-1" />
            </Link>
            <p className="text-sky-200 text-sm leading-relaxed mb-4">
              Your trusted partner for spiritual journeys to the holy lands. Hajj & Umrah with full comfort.
            </p>
            <div className="flex items-center gap-1 text-brand-accent">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              <span className="text-sky-300 text-xs ml-1">Trusted since 2017</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Packages', href: '/packages' },
                { label: 'Visa Services', href: '/visas' },
                { label: 'Group Fares', href: '/group-fares' },
                { label: 'Taxi Booking', href: '/taxi-booking' },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sky-200 hover:text-white transition-colors text-sm">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h3 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-5">Packages</h3>
            <ul className="space-y-3">
              {['Economy Umrah', 'Premium Hajj', 'Ramadan Special', 'Family Packages', 'Group Tours'].map((item) => (
                <li key={item}>
                  <Link href="/packages" className="text-sky-200 hover:text-white transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-brand-muted uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-sky-200 text-sm">Yatharth Chamber Ground Floor 33 Cantt. Rd, Near Odeon Cinema, Lucknow - 226001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+918853130084" className="text-sky-200 hover:text-white text-sm transition-colors">+91 88531 30084</a>
                  <a href="tel:+917084210406" className="text-sky-200 hover:text-white text-sm transition-colors">+91 70842 10406</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="mailto:fatimaoverseas24@gmail.com" className="text-sky-200 hover:text-white text-sm transition-colors">fatimaoverseas24@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sky-400 text-sm">
            &copy; {new Date().getFullYear()} Fatima Overseas. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sky-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sky-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
