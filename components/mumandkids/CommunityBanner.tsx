import Link from "next/link";
import { Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function CommunityBanner() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <div className="bg-gradient-to-r from-green-900/30 to-slate-900 border border-green-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        {/* Background visual flair */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-2 text-green-400 font-bold mb-3 text-sm tracking-wider uppercase">
            <ShieldCheck size={18} />
            <span>Tochi Trusted Mums Club (T3MC)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
            Don't let inflation dictate your child's style.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            Join 88+ smart mums who lock in prices, secure premium outfits with small deposits, and get exclusive vault access before the public.
          </p>
        </div>
        
        <div className="shrink-0 z-10 w-full md:w-auto">
          <Link 
            href="/mumandkids/community" 
            className="w-full bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            <Users size={18} />
            Discover the Inner Circle
          </Link>
        </div>
      </div>
    </section>
  );
}