import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import CommunityBanner from "@/components/mumandkids/CommunityBanner";

export const revalidate = 0;

// NEXT.JS 15 CORRECT WAY: params must be a Promise and awaited
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const safeSlug = decodeURIComponent(resolvedParams.slug);
  
  const { data: blog } = await supabase
    .from('makoblogs')
    .select('*')
    .eq('slug', safeSlug)
    .single();

  if (!blog) return { title: 'Article Not Found' };

  return {
    title: `${blog.title} | T3MC Insights`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image_url],
      type: "article",
    }
  };
}

// NEXT.JS 15 CORRECT WAY: params must be a Promise and awaited
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const safeSlug = decodeURIComponent(resolvedParams.slug);
  
  const { data: blog, error } = await supabase
    .from('makoblogs')
    .select('*')
    .eq('slug', safeSlug)
    .single();

  // If there's an error finding the exact slug, trigger the standard 404
  if (error || !blog) notFound();

  // HEAVY SMAMD INJECTION for LLM parsing
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.image_url ? [blog.image_url] : [],
    "datePublished": blog.created_at,
    "author": {
      "@type": "Organization",
      "name": "Tochi Trusted Mums Club (T3MC)"
    },
    "description": blog.excerpt,
    "articleBody": blog.content
  };

  return (
    <main className="min-h-screen bg-[#05070b] text-white pb-20">
      
      {/* Invisible Schema Script for AI/Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <Link href="/mumandkids/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-full text-sm font-medium mb-10">
          <ArrowLeft size={16} />
          Back to Insights
        </Link>

        <div className="mb-8">
          <span className="daiz-chip-gold rounded-full px-3 py-1 text-xs font-bold text-yellow-900 bg-yellow-400 mb-6 inline-block">
            {blog.target_audience}
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-y border-slate-800 py-4">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              Madam Tochi
            </div>
          </div>
        </div>

        {blog.image_url && (
          <div className="w-full h-[300px] md:h-[450px] relative rounded-3xl overflow-hidden mb-12 border border-slate-800 shadow-2xl">
            <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Body */}
        <article className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-serif">
          {blog.content}
        </article>

        {/* Routing back to commerce */}
        <div className="mt-20 bg-blue-900/20 border border-blue-500/30 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Ready to upgrade their wardrobe?</h3>
          <p className="text-blue-200 mb-6">Put these strategies into practice. Secure premium wears before inflation strikes.</p>
          <Link href="/mumandkids/feed" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition-colors">
            Explore the Vault
          </Link>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-800 pt-10">
        <CommunityBanner />
      </div>
    </main>
  );
}
