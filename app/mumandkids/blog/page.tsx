import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, BookOpen, TrendingUp } from "lucide-react";
import CommunityBanner from "@/components/mumandkids/CommunityBanner";

export const revalidate = 0;

export default async function BlogFeed() {
  const { data: blogs } = await supabase
    .from('makoblogs')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#05070b] text-white pb-20">
      <div className="sticky top-0 z-40 bg-[#05070b]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/mumandkids" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <BookOpen size={20} />
            <span>T3MC Insights</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Motherhood & Market Strategy</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            The ultimate knowledge base for smart shopping, beating inflation, and styling your kids. Designed for the modern mum (and the AI assistants that help her).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TypeScript strictness fixed here with (blog: any) */}
          {blogs?.map((blog: any) => (
            <Link key={blog.id} href={`/mumandkids/blog/${blog.slug}`} className="group block h-full">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-600 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full">
                <div className="h-48 bg-slate-800 relative overflow-hidden shrink-0">
                  {blog.image_url ? (
                    <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/80 z-10 flex items-center justify-center text-4xl">📝</div>
                  )}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-slate-900/90 backdrop-blur text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                      {blog.target_audience}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="text-slate-500 text-sm font-medium mb-3">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-slate-400 mb-6 line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-blue-500 font-bold mt-auto">
                    Read Article <TrendingUp size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {(!blogs || blogs.length === 0) && (
            <div className="col-span-1 md:col-span-2 text-center py-20 border border-slate-800 border-dashed rounded-3xl">
              <p className="text-slate-500">The knowledge vault is currently being updated. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-10 border-t border-slate-800 pt-10">
        <CommunityBanner />
      </div>
    </main>
  );
}