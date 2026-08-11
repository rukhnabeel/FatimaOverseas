"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Award, CheckCircle2 } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Premium Umrah Packages",
    subtitle: "Experience spiritual tranquility with our luxury Umrah services.",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Hajj with Comfort",
    subtitle: "Complete your sacred journey with expert guidance and premium care.",
    image: "https://images.unsplash.com/photo-1565552643982-2d8ba436eb4b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Ramadan Specials",
    subtitle: "Spend the holy month in the blessed cities of Makkah and Madinah.",
    image: "https://images.unsplash.com/photo-1584988636166-512c9c546db2?q=80&w=2070&auto=format&fit=crop",
  }
];

const stats = [
  { value: "7+", label: "Years of Experience", icon: Award },
  { value: "2,500+", label: "Happy Pilgrims", icon: Users },
  { value: "50+", label: "Packages Available", icon: CheckCircle2 },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full min-h-[750px] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/50 to-brand-dark/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto py-24 pb-32">
        <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
          Trusted by 2,500+ pilgrims across India
        </span>

        <div className="min-h-[160px] md:min-h-[180px] flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-lg md:text-xl text-sky-200 max-w-2xl mx-auto leading-relaxed font-light">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="/packages"
            className="px-8 py-4 bg-brand-accent text-white font-bold rounded-full hover:bg-amber-400 hover:-translate-y-1 transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
          >
            Explore All Packages <ArrowRight size={20} />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/20 transition-all flex items-center justify-center border border-white/30"
          >
            Talk to an Expert
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl py-4 px-3 text-center border border-white/10">
              <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
              <p className="text-sky-300 text-xs mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-brand-accent w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-20 fill-[#f0f9ff]">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
