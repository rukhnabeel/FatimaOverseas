"use client";

import Link from "next/link";
import { Package, FileText, Users, TrendingUp, ArrowRight, Plus, Eye } from "lucide-react";

const stats = [
  { label: "Total Packages", value: "6", change: "+2 this month", icon: Package, color: "from-brand-primary to-brand-secondary" },
  { label: "WhatsApp Enquiries", value: "—", change: "Via WhatsApp", icon: Users, color: "from-[#25D366] to-[#128C7E]" },
  { label: "Packages Published", value: "6", change: "All active", icon: TrendingUp, color: "from-amber-400 to-amber-600" },
];

const recentPackages = [
  { title: "Economy Umrah", price: "₹65,000", type: "Umrah", status: "Published", slug: "economy-umrah" },
  { title: "Standard Umrah", price: "₹78,000", type: "Umrah", status: "Published", slug: "standard-umrah" },
  { title: "Premium Umrah", price: "₹95,000", type: "Umrah", status: "Published", slug: "premium-umrah" },
  { title: "Family Hajj", price: "₹1,85,000", type: "Hajj", status: "Published", slug: "family-hajj" },
];

const quickActions = [
  { label: "Add New Package", href: "/admin/packages/new", icon: Plus, color: "bg-brand-primary" },
  { label: "View Website", href: "/", icon: Eye, color: "bg-brand-dark" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-black text-brand-dark">Dashboard</h1>
        <p className="text-sky-500 mt-1">Welcome back, Administrator. Here&apos;s an overview of your website.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-sky-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={18} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-black text-brand-dark">{stat.value}</p>
            <p className="text-sm text-brand-dark font-semibold mt-0.5">{stat.label}</p>
            <p className="text-xs text-sky-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-brand-dark mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              target={action.href === "/" ? "_blank" : undefined}
              className={`flex items-center gap-2 px-5 py-3 ${action.color} text-white text-sm font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-sm`}
            >
              <action.icon size={16} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Packages */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-sky-50 flex items-center justify-between">
            <h2 className="font-black text-brand-dark">Recent Packages</h2>
            <Link href="/admin/packages" className="text-brand-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-sky-50">
            {recentPackages.map((pkg) => (
              <div key={pkg.slug} className="px-6 py-4 flex items-center justify-between hover:bg-[#f0f9ff] transition-colors">
                <div>
                  <p className="font-semibold text-brand-dark text-sm">{pkg.title}</p>
                  <p className="text-xs text-sky-400 mt-0.5">{pkg.type} · {pkg.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">{pkg.status}</span>
                  <Link href={`/admin/packages/${pkg.slug}/edit`} className="text-brand-primary text-xs font-medium hover:underline">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info / Tips */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6">
          <h2 className="font-black text-brand-dark mb-4">Setup Checklist</h2>
          <div className="space-y-3">
            {[
              { done: true, text: "Project initialized with Next.js & Tailwind" },
              { done: true, text: "Public website pages created" },
              { done: true, text: "WhatsApp integration complete" },
              { done: true, text: "Admin portal built" },
              { done: false, text: "Connect Supabase database" },
              { done: false, text: "Setup real authentication" },
              { done: false, text: "Enable package image uploads" },
              { done: false, text: "Deploy to Vercel" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  item.done ? "bg-green-100 text-green-600" : "bg-sky-100 text-sky-400"
                }`}>
                  {item.done ? "✓" : "○"}
                </div>
                <span className={item.done ? "text-brand-dark" : "text-sky-500"}>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-700">
            <strong>Next Step:</strong> Add your Supabase credentials to the .env file to enable real data management.
          </div>
        </div>
      </div>
    </div>
  );
}
