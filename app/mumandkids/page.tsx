import Hero from "@/components/mumandkids/Hero";
import Countdown from "@/components/mumandkids/Countdown";
import PromoBanner from "@/components/mumandkids/PromoBanner";
import MakoProductGrid from "@/components/mumandkids/MakoProductGrid";
import CommunityBanner from "@/components/mumandkids/CommunityBanner";
import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Page() {
  const { data: latestBlog } = await supabase
    .from("makoblogs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { count: productCount } = await supabase
    .from("makoproducts")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ef] text-[#172d25]">
      <div className="sticky top-0 z-40 border-b border-[#1e3b30]/10 bg-[#f7f5ef]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="/mumandkids" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1e3b30] text-sm font-black tracking-tight text-[#e8c98a]">MK</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black uppercase tracking-[0.16em] text-[#1e3b30]">Mum & Kids</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b806d]">Outfits · Made for moments</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#53645b] lg:flex">
            <Link href="/mumandkids" className="transition hover:text-[#b47c3b]">Home</Link>
            <Link href="/mumandkids/feed" className="transition hover:text-[#b47c3b]">Shop all</Link>
            <Link href="/mumandkids/community" className="transition hover:text-[#b47c3b]">T3MC Club</Link>
            <Link href="/mumandkids/blog" className="transition hover:text-[#b47c3b]">Mummy insights</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/mumandkids/assistant" className="hidden rounded-full border border-[#1e3b30]/20 px-4 py-2.5 text-xs font-bold text-[#1e3b30] transition hover:bg-[#1e3b30] hover:text-white sm:inline-flex">Find their fit</Link>
            <Link href="/mumandkids/feed" className="inline-flex items-center gap-2 rounded-full bg-[#b47c3b] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#b47c3b]/20 transition hover:bg-[#98632d]">Shop now <ArrowRight size={14}/></Link>
          </div>
        </div>
      </div>

      <Hero />
      <Countdown />
      <PromoBanner />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.28em] text-[#b47c3b]">The collection</p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[#1e3b30] md:text-5xl">Pieces for little people.<br/><span className="italic text-[#a47b4e]">Memories for a lifetime.</span></h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6f776f] md:text-base">Thoughtfully selected outfits for growing children and the mums who make every moment special.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#1e3b30]/10 bg-white px-4 py-2 text-xs font-bold text-[#53645b]">{productCount ?? "—"} pieces in the collection</span>
            <Link href="/mumandkids/feed" className="inline-flex items-center gap-2 text-sm font-bold text-[#1e3b30] hover:text-[#b47c3b]">Explore all <ArrowRight size={16}/></Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#1e3b30]/10 bg-white/70 p-3 shadow-[0_24px_80px_rgba(30,59,48,0.06)] md:p-6">
          <MakoProductGrid />
        </div>
      </section>

      <section className="border-y border-[#1e3b30]/10 bg-[#eeeae0]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8 md:py-16">
          <div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#b47c3b]"><ShieldCheck size={20}/></span><div><h3 className="font-bold text-[#1e3b30]">Shop with confidence</h3><p className="mt-1 text-sm leading-6 text-[#73786f]">Clear product details and direct access to Madam Tochi for confirmation.</p></div></div>
          <div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#b47c3b]"><Truck size={20}/></span><div><h3 className="font-bold text-[#1e3b30]">Delivery across Nigeria</h3><p className="mt-1 text-sm leading-6 text-[#73786f]">Arrange delivery and collection details directly with the store.</p></div></div>
          <div className="flex gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#b47c3b]"><Sparkles size={20}/></span><div><h3 className="font-bold text-[#1e3b30]">Smart price reservation</h3><p className="mt-1 text-sm leading-6 text-[#73786f]">Ask about the deposit option and current availability before you pay.</p></div></div>
        </div>
      </section>

      {latestBlog && (
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-[#b47c3b]">From the journal</p><h2 className="font-serif text-3xl text-[#1e3b30] md:text-4xl">Mummy insights</h2></div>
            <Link href="/mumandkids/blog" className="text-sm font-bold text-[#1e3b30] hover:text-[#b47c3b]">All articles →</Link>
          </div>
          <Link href={`/mumandkids/blog/${latestBlog.slug}`} className="group grid overflow-hidden rounded-[2rem] border border-[#1e3b30]/10 bg-white shadow-[0_20px_60px_rgba(30,59,48,0.06)] md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-64 bg-[#e6e0d3]">
              {latestBlog.image_url ? <img src={latestBlog.image_url} alt={latestBlog.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/> : <div className="flex h-full min-h-64 items-center justify-center text-5xl">✦</div>}
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4efe5] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b713e]"><BookOpen size={13}/> Latest story</span>
              <h3 className="font-serif text-3xl leading-tight text-[#1e3b30] transition group-hover:text-[#a46e35] md:text-4xl">{latestBlog.title}</h3>
              <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#747970]">{latestBlog.excerpt}</p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#1e3b30]">Read the story <ArrowRight size={16}/></span>
            </div>
          </Link>
        </section>
      )}

      <CommunityBanner />
      <footer className="mt-10 bg-[#1e3b30] px-5 py-10 text-center text-white md:px-8">
        <p className="font-serif text-2xl text-[#e8c98a]">Mum & Kids Outfits</p>
        <p className="mt-2 text-xs tracking-wide text-white/60">Thoughtful style. Smart shopping. Happier little moments.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs font-semibold text-white/75"><Link href="/mumandkids/feed">Shop</Link><Link href="/mumandkids/community">T3MC Club</Link><Link href="/mumandkids/blog">Journal</Link><Link href="/mumandkids/assistant">Shopping assistant</Link></div>
        <p className="mt-8 text-[10px] text-white/35">Powered by DaizLab Store</p>
      </footer>
    </main>
  );
}
