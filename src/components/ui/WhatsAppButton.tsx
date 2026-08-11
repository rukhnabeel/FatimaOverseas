"use client";

import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [waNumber, setWaNumber] = useState("918853130084");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.whatsappNumber && data.settings.whatsappNumber !== "910000000000") {
          setWaNumber(data.settings.whatsappNumber);
        }
      })
      .catch(() => {});

    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip briefly after appearing
      setTimeout(() => setShowTooltip(true), 500);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="flex items-center gap-2 bg-white rounded-2xl shadow-xl shadow-sky-100 px-4 py-3 border border-sky-100 animate-in slide-in-from-right-4">
          <p className="text-brand-dark text-sm font-semibold">Chat with us on WhatsApp!</p>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-sky-400 hover:text-brand-dark transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${waNumber}?text=Assalamualaikum, I want to know more about your Hajj and Umrah services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-green-300/50 hover:shadow-xl hover:shadow-green-300/60 hover:-translate-y-1 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
