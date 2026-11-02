"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsappButton({
  product,
}: {
  product: string;
}) {
  const WHATSAPP_NUMBER = "2347060405103";
  
  // The strategic WA³S template
  const text = encodeURIComponent(
    `Hello Madam Tochi,\n\nI want to secure this item before it sells out:\n\n👗 *${product}*\n\nI am ready to make my deposit to lock the price and beat inflation as per the T3MC smart contract. Please confirm availability and send account details.\n\nThank you.`
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // 1. Fire Meta Pixel Conversion Event
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('trackCustom', 'WhatsAppClick', {
        source: 'Product_Detail_Page',
        product_name: product
      });
      window.fbq('track', 'Contact'); // Standard event for Meta algorithm optimization
    }

    // 2. Route to WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`}
      onClick={handleClick}
      target="_blank"
      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 px-4 py-4 text-center font-bold text-white shadow-[0_0_15px_rgba(22,163,74,0.3)] transition-all hover:bg-green-500 hover:scale-[1.02]"
    >
      <MessageCircle size={22} className="group-hover:animate-bounce" />
      <span>Secure via WhatsApp</span>
    </a>
  );
}
