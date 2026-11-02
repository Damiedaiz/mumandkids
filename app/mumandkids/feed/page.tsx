import { supabase } from "@/lib/supabase";
import MakoProductCard from "@/components/mumandkids/MakoProductCard";
import Link from "next/link";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";

export const revalidate = 0;

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // TECHNICAL FIX: Must await searchParams in Next.js 15
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 12; 
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  // Fetch paginated products
  const { data: products, count } = await supabase
    .from('makoproducts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  const totalPages = count ? Math.ceil(count / itemsPerPage) : 1;

  return (
    <main className="min-h-screen bg-[#05070b] text-white pb-32">
      
      {/* SERP Header */}
      <div className="sticky top-0 z-40 bg-[#05070b]/90 backdrop-blur-xl border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <Link href="/mumandkids" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Hub</span>
          </Link>
          
          <div className="flex-1 max-w-xl w-full relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search the vault..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white border border-slate-700 px-4 py-2 rounded-full text-sm">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black">All Uploads</h1>
            <p className="text-slate-400 text-sm mt-1">Showing {(products?.length || 0)} items (Page {currentPage} of {totalPages})</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((product: any) => (
            <MakoProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination Controls - RESTORED TO YOUR ORIGINAL UI */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            {currentPage > 1 && (
              <Link href={`/mumandkids/feed?page=${currentPage - 1}`} className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800">
                Previous
              </Link>
            )}
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link 
                  key={i} 
                  href={`/mumandkids/feed?page=${i + 1}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border ${currentPage === i + 1 ? 'bg-blue-600 border-blue-500 font-bold' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link href={`/mumandkids/feed?page=${currentPage + 1}`} className="px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800">
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}