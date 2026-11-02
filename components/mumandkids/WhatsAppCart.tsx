"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { ChevronDown, MessageCircle, ShoppingBag, X } from "lucide-react";

export default function WhatsAppCart() {
  const reservedItems = useCartStore((state) => state.reservedItems);
  const removeItem = useCartStore((state) => state.removeItem);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (reservedItems.length > 0) setIsMinimized(false);
  }, [reservedItems.length]);

  const totalValue = reservedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSendToWhatsApp = () => {
    if (!reservedItems.length) return;
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        value: totalValue,
        currency: "NGN",
        content_ids: reservedItems.map((item) => item.id),
        num_items: reservedItems.length
      });
    }
    let message = "Hello Madam Tochi, I'd like to reserve these items. Please confirm availability, current prices, delivery and the deposit option:\n\n";
    reservedItems.forEach((item) => {
      message += "• " + item.name + " — ₦" + (item.price?.toLocaleString() || "To confirm") + "\n";
    });
    message += "\nEstimated total: ₦" + totalValue.toLocaleString() + "\nPlease guide me through the next step.";
    window.open("https://wa.me/2347060405103?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  };

  if (!reservedItems.length) return null;

  if (isMinimized) {
    return <button onClick={() => setIsMinimized(false)} className="fixed bottom-5 right-4 z-[60] inline-flex items-center gap-3 rounded-full border border-[#e8c98a]/40 bg-[#1e3b30] px-5 py-3.5 text-sm font-black text-white shadow-2xl sm:bottom-7 sm:right-7">
      <ShoppingBag size={17} className="text-[#e8c98a]"/> {reservedItems.length} reserved <span className="rounded-full bg-[#e8c98a] px-2 py-1 text-[10px] text-[#1e3b30]">View</span>
    </button>;
  }

  return <aside className="fixed bottom-4 right-3 z-[60] w-[min( calc(100vw-1.5rem),24rem)] overflow-hidden rounded-[1.5rem] border border-[#1e3b30]/15 bg-[#f7f5ef] shadow-[0_25px_80px_rgba(15,35,27,0.28)] sm:bottom-7 sm:right-7">
    <div className="flex items-center justify-between bg-[#1e3b30] px-5 py-4 text-white">
      <div className="flex items-center gap-2"><ShoppingBag size={17} className="text-[#e8c98a]"/><h3 className="text-sm font-black">Your reserve list <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px]">{reservedItems.length}</span></h3></div>
      <button onClick={() => setIsMinimized(true)} aria-label="Minimize reserve list" className="rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"><ChevronDown size={18}/></button>
    </div>
    <ul className="max-h-44 space-y-2 overflow-y-auto p-4">
      {reservedItems.map((item, index) => <li key={String(item.id) + "-" + index} className="flex items-center gap-2 rounded-xl border border-[#1e3b30]/10 bg-white px-3 py-2.5 text-xs">
        <span className="min-w-0 flex-1 truncate font-semibold text-[#1e3b30]">{item.name}</span>
        <span className="shrink-0 font-black text-[#1e3b30]">₦{item.price?.toLocaleString() || "0"}</span>
        <button onClick={() => removeItem(item.id)} aria-label={"Remove " + item.name} className="rounded-full p-1 text-[#9b8f7b] hover:bg-red-50 hover:text-red-600"><X size={14}/></button>
      </li>)}
    </ul>
    <div className="flex items-center justify-between border-t border-[#1e3b30]/10 px-5 py-3"><span className="text-xs font-semibold text-[#73786f]">Estimated total</span><span className="text-lg font-black text-[#1e3b30]">₦{totalValue.toLocaleString()}</span></div>
    <div className="px-4 pb-4"><button onClick={handleSendToWhatsApp} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b47c3b] px-4 py-3.5 text-xs font-black text-white transition hover:bg-[#98632d]"><MessageCircle size={16}/> Confirm reserve on WhatsApp</button><p className="mt-2 text-center text-[9px] leading-4 text-[#8b806d]">Prices and availability are confirmed by the store before payment.</p></div>
  </aside>;
}
