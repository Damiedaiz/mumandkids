"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

const HERO_IMAGE = "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782277568460-pmy9f76yif.jpeg";
const WHATSAPP_NUMBER = "2347060405103";

export default function Hero() {
  const message = encodeURIComponent("Hello Madam Tochi, I'd love to shop for my family. Please help me with available outfits, sizes and the smart deposit option.");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <section className="relative overflow-hidden bg-[#1e3b30] text-white">
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#f3dfb8_0.7px,transparent_0.7px)] [background-size:18px_18px]"/>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8 md:pb-20 md:pt-16">
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:0.65}} className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c98a]/30 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#e8c98a]"><Sparkles size={13}/> Tochi Trusted Mums Club</span>
          <h1 className="mt-7 max-w-2xl font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Little looks.<br/><span className="italic text-[#e8c98a]">Big memories.</span></h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">Beautifully selected outfits for children and mums. Shop with confidence, reserve your favourites and ask about our smart deposit option to plan purchases with ease.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/mumandkids/feed" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#e8c98a] px-7 py-4 text-sm font-black text-[#1e3b30] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#f2dcae]">Explore the collection <ArrowRight size={17}/></Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => { if (typeof window !== "undefined" && window.fbq) { window.fbq("trackCustom", "WhatsAppClick", {source:"Hero_Main_CTA"}); window.fbq("track", "Contact"); } }} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"><MessageCircle size={17}/> Chat with Madam Tochi</a>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-semibold text-white/55"><span>✓ Family-friendly selections</span><span>✓ Delivery across Nigeria</span><span>✓ Personal shopping support</span></div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.12}} className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -inset-5 rounded-[2.5rem] border border-[#e8c98a]/20"/>
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-[#d9d0bd] shadow-2xl">
            <img src={HERO_IMAGE} alt="Mum and Kids Outfits collection" className="h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#142b22]/75 via-transparent to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#e8c98a]">The family edit</p>
              <p className="mt-2 max-w-xs font-serif text-2xl leading-tight text-white md:text-3xl">Style that grows with every little moment.</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-[#1e3b30]/10 bg-[#f7f5ef] px-5 py-4 text-[#1e3b30] shadow-xl sm:-left-8"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#a47b4e]">Shop thoughtfully</p><p className="mt-1 font-serif text-lg">For every little one</p></div>
        </motion.div>
      </div>
    </section>
  );
}
