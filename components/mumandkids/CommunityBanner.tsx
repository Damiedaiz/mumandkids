import Link from "next/link";
import { Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function CommunityBanner() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 md:px-6 md:py-16">
      <div className="relative isolate flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[2rem] border border-[#e8c98a]/25 bg-[#142b22] p-8 text-center shadow-[0_28px_80px_rgba(20,43,34,0.22)] md:flex-row md:p-12 md:text-left">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-[#d4a85f]/15 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-[#4f8067]/25 blur-3xl" />

        <div className="z-10 flex-1">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#f0cb83] md:justify-start">
            <ShieldCheck size={18} />
            <span>Tochi Trusted Mums Club (T3MC)</span>
          </div>
          <h2 className="mb-4 max-w-2xl font-serif text-3xl font-bold leading-tight text-[#fffaf0] md:text-4xl">
            Don&apos;t let inflation dictate your child&apos;s <span className="italic text-[#f0cb83]">style.</span>
          </h2>
          <p className="max-w-xl text-sm leading-7 text-white/90 md:text-base">
            Join 88+ smart mums who lock in prices, secure premium outfits with small deposits, and get exclusive vault access before the public.
          </p>
        </div>

        <div className="z-10 w-full shrink-0 md:w-auto">
          <Link
            href="/mumandkids/community"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f0cb83] px-7 py-4 text-sm font-extrabold text-[#172d25] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 hover:bg-[#ffdfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0cb83] md:w-auto"
          >
            <Users size={18} />
            Discover the Inner Circle
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
