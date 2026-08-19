"use client";

import Link from 'next/link';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const packageCategories = [
  { name: "Umrah", image: "/menu/umrah.png", desc: "Experience spiritual tranquility" },
  { name: "Hajj", image: "/menu/hajj.png", desc: "Complete your sacred journey" },
  { name: "Holiday Packages", image: "/menu/ramadan.png", desc: "Explore beautiful destinations worldwide" },
  { name: "Hindu Religious Yatra", image: "/menu/ramadan.png", desc: "Spiritual journeys to sacred places" },
  { name: "Group", image: "/menu/group.png", desc: "Travel together with loved ones" },
  { name: "Family", image: "/menu/family.png", desc: "Special packages for families" }
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/visas', label: 'Visa Services' },
  { href: '/group-fares', label: 'Group Fares' },
  { href: '/taxi-booking', label: 'Taxi Booking' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full bg-white transition-shadow ${scrolled ? "shadow-md border-b-transparent" : "border-b border-gray-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.jpg" alt="Fatima Overseas Logo" className="h-14 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                l.label === 'Packages' ? (
                  <div 
                    key={l.href} 
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-brand-dark/80 hover:text-brand-primary rounded-lg hover:bg-brand-light/60 transition-all duration-200">
                      {l.label} <ChevronDown size={14} className={`transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full -left-20 lg:-left-48 mt-1 w-[320px] sm:w-[500px] lg:w-[650px] p-4 bg-white border border-sky-100 rounded-2xl shadow-xl transition-all duration-200 z-50 ${megaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {packageCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={`/packages?type=${cat.name}`}
                            onClick={() => setMegaMenuOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-light/50 transition-colors group/item"
                          >
                            <img src={cat.image} alt={cat.name} className="w-16 h-16 rounded-lg object-cover group-hover/item:scale-105 transition-transform" />
                            <div>
                              <h4 className="text-brand-dark font-bold text-sm group-hover/item:text-brand-primary transition-colors">{cat.name} Packages</h4>
                              <p className="text-xs text-sky-600/80 mt-0.5 leading-snug">{cat.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-sky-50 flex justify-center">
                        <Link
                          href="/packages"
                          onClick={() => setMegaMenuOpen(false)}
                          className="text-sm font-bold text-brand-primary hover:text-brand-secondary flex items-center gap-1 transition-colors"
                        >
                          View All Packages &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="relative px-4 py-2 text-sm font-medium text-brand-dark/80 hover:text-brand-primary rounded-lg hover:bg-brand-light/60 transition-all duration-200"
                  >
                    {l.label}
                  </Link>
                )
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+918853130084"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-brand-secondary transition-colors"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-brand-dark hover:bg-brand-light transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-brand-dark/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-20 left-0 right-0 glass shadow-xl border-b border-sky-100">
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((l) => (
                l.label === 'Packages' ? (
                  <div key={l.href} className="flex flex-col gap-1">
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-brand-dark font-medium rounded-xl hover:bg-brand-light transition-colors"
                    >
                      {l.label}
                    </Link>
                    <div className="pl-6 flex flex-col gap-1 border-l-2 border-sky-100 ml-4 mb-2">
                      {["Umrah", "Hajj", "Holiday Packages", "Hindu Religious Yatra", "Group", "Family"].map((cat) => (
                        <Link
                          key={cat}
                          href={`/packages?type=${cat}`}
                          onClick={() => setMobileOpen(false)}
                          className="px-4 py-2 text-sm font-medium text-brand-dark/80 hover:text-brand-primary rounded-lg hover:bg-brand-light/50 transition-colors"
                        >
                          {cat} Packages
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-brand-dark font-medium rounded-xl hover:bg-brand-light transition-colors"
                  >
                    {l.label}
                  </Link>
                )
              ))}
              <a
                href="tel:+918853130084"
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-secondary transition-colors"
              >
                <Phone size={16} /> Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
