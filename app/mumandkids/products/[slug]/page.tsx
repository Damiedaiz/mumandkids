import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import ReserveButton from "@/components/mumandkids/ReserveButton";
import PixelTracker from "@/components/mumandkids/PixelTracker";
import CommunityBanner from "@/components/mumandkids/CommunityBanner";
import { ArrowLeft } from "lucide-react";

// 1. DYNAMIC SEO METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: product } = await supabase
    .from('makoproducts')
    .select('*')
    .eq('id', slug)
    .single();

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Mummy & Kids Outfits`,
    description: `Secure this premium outfit for ₦${product.price.toLocaleString()} with our smart deposit system. Join T3MC to beat inflation.`,
    openGraph: {
      title: product.name,
      description: `Reserve today for ₦${product.price.toLocaleString()} and lock the price before inflation hits.`,
      images: [product.image_url || 'https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782255465781-lvyv736xxx.jpeg'],
      type: "website",
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 2. LIVE SUPABASE INVENTORY FETCH
  const { data: product, error } = await supabase
    .from('makoproducts')
    .select('*')
    .eq('id', slug)
    .single();

  if (error || !product) {
    notFound();
  }

  // 3. SMAMD (Schema Markup)
  const productSmamd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image_url,
    "description": product.description || "Premium kids outfit.",
    "brand": {
      "@type": "Brand",
      "name": "Mummy & Kids Outfits"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://daizlab.vercel.app/mumandkids/products/${slug}`,
      "priceCurrency": "NGN",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 min-h-screen">
      
      {/* FIXED: Using standard script tag for JSON-LD to resolve ts(2322) error */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSmamd) }}
      />

      {/* 4. META PIXEL VIEWCONTENT EVENT */}
      <PixelTracker 
        event="ViewContent" 
        payload={{ content_name: product.name, content_ids: [product.id], value: product.price, currency: 'NGN' }} 
      />

      {/* 5. BACK TO STORE CTA */}
      <div className="mb-8">
        <Link 
          href="/mumandkids" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-full text-sm font-medium w-fit shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={16} />
          Back to Store
        </Link>
      </div>

      <div className="grid gap-12 md:grid-cols-2 mb-20">
        <div className="relative h-[400px] md:h-[600px] overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
          {product.image_url ? (
            <Image
              src={product.image_url}
              fill
              alt={product.name}
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-4xl">📸</div>
          )}
          <span className="absolute top-6 left-6 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            {product.category}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="daiz-chip-gold rounded-full px-3 py-1 text-xs font-bold text-yellow-900 bg-yellow-400">
              {product.gender}
            </span>
            <span className="rounded-full px-3 py-1 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700">
              Age: {product.age_range}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              ₦{product.price.toLocaleString()}
            </span>
          </div>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            {product.description || "Premium quality outfit guaranteed to make your child stand out. Secure yours today before it sells out."}
          </p>

          <div className="mt-10 space-y-4">
            <ReserveButton product={product} />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="font-bold text-white flex items-center gap-2">
              🛡️ The T3MC Guarantee
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2"><span>✔</span> <strong>Secure the Price:</strong> Reserve via WhatsApp and lock in this price.</li>
              <li className="flex gap-2"><span>✔</span> <strong>Priority Hold:</strong> Madam Tochi holds this item exclusively for you.</li>
              <li className="flex gap-2"><span>✔</span> <strong>Premium Quality:</strong> Trusted by 88+ smart mums in our community.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-20">
        <CommunityBanner />
      </div>
    </main>
  );
}