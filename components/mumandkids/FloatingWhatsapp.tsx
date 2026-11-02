"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsapp() {
  const WHATSAPP_NUMBER = "2347060405103";
  const PREFILLED_MESSAGE = encodeURIComponent(
    "Hello Madam Tochi, I'm visiting your digital store and I have an inquiry about the premium kids wears."
  );

  const handleClick = () => {
    // 1. Fire the Meta Pixel Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('trackCustom', 'WhatsAppClick', {
        source: 'Floating_CTA'
      });
      // Also fire standard Contact event to help Facebook optimize
      window.fbq('track', 'Contact'); 
    }

    // 2. Open WhatsApp in a new tab
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILLED_MESSAGE}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        gap-3
        rounded-full
        bg-green-600
        px-6
        py-4
        shadow-[0_0_20px_rgba(22,163,74,0.4)]
        hover:bg-green-500
        hover:-translate-y-1
        transition-all
        duration-300
        group
      "
      aria-label="Chat on WhatsApp"
    >
      {/* Subtle ping animation underneath the icon */}
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
        <MessageCircle size={22} className="relative text-white group-hover:scale-110 transition-transform" />
      </span>
      <span className="font-bold text-white tracking-wide">Chat with us</span>
    </button>
  );
}
