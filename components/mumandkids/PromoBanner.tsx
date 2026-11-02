import Link from "next/link";
import { LockKeyhole, Truck, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return <section className="border-y border-[#1e3b30]/10 bg-[#eeeae0]">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-9 gap-y-4 px-5 py-4 text-center md:px-8">
      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#53645b]"><Truck size={16} className="text-[#a47b4e}"/> Delivery across Nigeria</span>
      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#53645b]"><LockKeyhole size={16} className="text-[#a47b4e}"/> Ask about smart deposits and price reservations</span>
      <Link href="/mumandkids/assistant" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#1e3b30] shadow-sm transition hover:bg-[#1e3b30] hover:text-white"><Sparkles size={14}/> Let us find the right fit</Link>
    </div>
  </section>;
}
