import type { Metadata } from "next";
import { Award, Users, Heart, Shield, CheckCircle2, Star, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Fatima Overseas — Trusted Hajj & Umrah Agency",
  description:
    "Learn about Fatima Overseas — over 7 years of experience guiding 2,500+ pilgrims on sacred Hajj and Umrah journeys with care, trust, and devotion.",
};

const values = [
  {
    icon: Heart,
    title: "Spiritual Dedication",
    desc: "Every journey we plan is rooted in sincerity and devotion to help you achieve your spiritual goals.",
  },
  {
    icon: Shield,
    title: "Trusted & Licensed",
    desc: "Government-registered and fully licensed travel agency with a proven track record since 2017.",
  },
  {
    icon: Users,
    title: "Pilgrims First",
    desc: "Your comfort, safety, and peace of mind are our highest priority from booking to return.",
  },
  {
    icon: Award,
    title: "Excellence in Service",
    desc: "Consistently rated 5-stars by our pilgrims for quality of hotels, guidance, and logistics.",
  },
];

const team = [
  {
    name: "Shakib Hasan Khan",
    role: "Founder",
    phone: "+91 8853130084, +91 7084210406",
    image: "/team/founder.jpg"
  },
  {
    name: "Nazrul Hasan Khan\n(EX Inspector)",
    role: "Sales & Marketing Head",
    phone: "+91 9919997570, +91 9936002930",
    image: "/team/marketing.jpg"
  },
  {
    name: "Aarish Siddiqui",
    role: "Sales Executive",
    phone: "+91 6393746314",
    image: "/team/sales.png"
  }
];

const milestones = [
  { year: "2017", event: "Founded Fatima Overseas" },
  { year: "2018", event: "First group Umrah tour — 25 pilgrims" },
  { year: "2022", event: "Expanded to Umrah packages nationwide" },
  { year: "2023", event: "Crossed 1,000+ happy pilgrims milestone" },
  { year: "2024", event: "2,500+ pilgrims served across India" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-primary text-white py-28 relative overflow-hidden">
        <img src="/menu/hajj.png" alt="About Us Background" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-muted/10 rounded-full blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-brand-muted text-sm font-semibold mb-6 uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-muted to-white">Fatima Overseas</span>
          </h1>
          <p className="text-sky-200 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            For over 7 years, we have been the trusted partner for pilgrims across India seeking a meaningful, comfortable, and spiritually enriching Hajj & Umrah experience.
          </p>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#f0f9ff]">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#f0f9ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "7+", label: "Years of Experience" },
              { value: "2,500+", label: "Happy Pilgrims" },
              { value: "50+", label: "Packages Offered" },
              { value: "5★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-3xl p-6 text-center border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl font-black text-brand-secondary mb-1">{s.value}</p>
                <p className="text-sky-500 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Who We Are</span>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-2 mb-6">
                A Legacy of Faith <br /> & Service
              </h2>
              <div className="space-y-4 text-sky-600 leading-relaxed">
                <p>
                  Fatima Overseas was founded in 2017 with a single mission: to make the sacred journey of Hajj and Umrah accessible, affordable, and spiritually fulfilling for every Muslim family in India.
                </p>
                <p>
                  Today, we proudly serve pilgrims from across India with a full suite of government-approved packages, expert guidance from experienced scholars, and hotel partnerships with top establishments in Makkah and Madinah.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex text-brand-accent">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="text-brand-dark font-semibold">Trusted by 2,500+ pilgrims across India</span>
              </div>
            </div>

            {/* Milestones */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-dark mb-6">Our Journey</h3>
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-white font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-sky-100 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">{m.year}</p>
                    <p className="text-brand-dark font-medium mt-0.5">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#f0f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-2 mb-4">What Drives Us</h2>
            <p className="text-sky-600 max-w-xl mx-auto">
              Every decision we make is guided by these core principles that put our pilgrims first.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-sky-100 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-light to-brand-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-brand-primary">
                  <v.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{v.title}</h3>
                <p className="text-sky-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-semibold text-sm uppercase tracking-widest">Our People</span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mt-2 mb-4">Meet the Team</h2>
            <p className="text-sky-600 max-w-xl mx-auto">
              A dedicated team of experienced professionals committed to your spiritual journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-[#f0f9ff] rounded-[2rem] p-8 text-center border border-sky-100 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 group"
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark whitespace-pre-line">{member.name}</h3>
                <p className="text-brand-primary text-sm font-bold uppercase tracking-wider mt-1.5">{member.role}</p>
                <div className="mt-4 pt-4 border-t border-sky-100 space-y-1 text-sky-600 font-medium text-sm">
                  {member.phone.split(',').map(p => <p key={p}>{p.trim()}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gradient-to-br from-brand-dark to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-12 h-12 text-brand-muted mx-auto mb-4" />
          <h2 className="text-3xl font-black mb-3">Visit Our Office</h2>
          <p className="text-sky-200 mb-2">Yatharth Chamber Ground Floor 33 Cantt. Rd, Near Odeon Cinema, Lucknow - 226001</p>
          <p className="text-sky-300 text-sm">Mon–Sat: 9:00 AM – 7:00 PM &nbsp;|&nbsp; Sunday: 10:00 AM – 2:00 PM</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918853130084"
              className="px-8 py-4 bg-white text-brand-secondary font-bold rounded-full hover:bg-brand-light transition-all shadow-lg hover:-translate-y-0.5"
            >
              Call Us Now
            </a>
            <a
              href="https://wa.me/918853130084"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#128C7E] transition-all shadow-lg hover:-translate-y-0.5"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
