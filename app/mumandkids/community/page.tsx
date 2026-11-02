import Link from "next/link";
import { ArrowLeft, MessageCircle, ShieldCheck, TrendingDown, Clock } from "lucide-react";
import PixelTracker from "@/components/mumandkids/PixelTracker";

export const metadata = {
  title: 'T3MC Inner Circle | Mummy & Kids',
  description: 'Join our exclusive WhatsApp community to beat inflation and secure premium kids wears before they hit the public catalog.',
};

export default function CommunityPage() {
  const WHATSAPP_NUMBER = "2347060405103";
  const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Madam%20Tochi,%20I%20want%20to%20join%20the%20T3MC%20Inner%20Circle%20to%20secure%20premium%20outfits!`;

  return (
    <main className="min-h-screen bg-[#05070b] text-white pb-32">
      <PixelTracker event="ViewContent" payload={{ content_name: 'Community Page' }} />
      
      {/* 1. ESCAPE HATCH: Back to Store Header */}
      <div className="sticky top-0 z-40 bg-[#05070b]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/mumandkids" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Store</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-green-400 font-bold text-sm">
            <ShieldCheck size={16} /> Verified T3MC Portal
          </div>
        </div>
      </div>

      {/* 2. MAIN HERO (Matching image_10.png exactly) */}
      <div className="mx-auto max-w-4xl px-6 pt-20 text-center">
        <span className="inline-block border border-green-500/30 bg-green-500/10 text-green-400 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-8">
          Exclusive WhatsApp Community
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white tracking-tight">
          The Smartest Way To <br className="hidden md:block"/> Shop For Your Kids.
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-14">
          Welcome to the inner circle. We don't just sell outfits; we protect your purchasing power. Lock prices, beat inflation, and secure premium wears before they ever hit the public catalog.
        </p>

        {/* 3. DUAL ACTION ROUTING */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <a 
            href={WA_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(22,163,74,0.3)] flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            <MessageCircle size={20} />
            Join the WhatsApp Hub
          </a>
          <Link 
            href="/mumandkids/feed" 
            className="w-full sm:w-auto bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
          >
            Explore The Vault
          </Link>
        </div>
      </div>

      {/* 4. VALUE PROPOSITION CARDS */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center mb-6">
              <TrendingDown size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Beat Inflation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Don't wait for prices to double. Our strategic deposit system lets you lock in today's price and pay the balance later.
            </p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Priority Access</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Before a product is ever uploaded to the main website, the Inner Circle gets first pick. Never miss a limited restock.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Verified Quality</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join a community of mothers who share reviews, sizing advice, and styling tips so you always buy with total confidence.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}