import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ReserveButton from "./ReserveButton";

export default function MakoProductCard({ product }: { product: any }) {
  const price = Number(product.price || 0);
  const sizeLabel = product.shoe_size?.trim() ? "Size" : product.age_range ? "Age range" : "";
  const sizeValue = product.shoe_size?.trim() || product.age_range;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[#1e3b30]/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,59,48,0.12)]">
      <Link href={`/mumandkids/products/${product.id}`} className="relative block aspect-[4/4.5] overflow-hidden bg-[#eeeae0]">
        {product.image_url ? <Image src={product.image_url} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" alt={product.name || "Mum and Kids outfit"} className="object-cover transition duration-700 group-hover:scale-105"/> : <div className="flex h-full items-center justify-center text-4xl text-[#a47b4e]">✦</div>}
        {product.category && <span className="absolute left-3 top-3 rounded-full bg-[#f7f5ef]/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#1e3b30] shadow-sm">{product.category}</span>}
        {!product.in_stock && <span className="absolute bottom-3 left-3 rounded-full bg-[#1e3b30]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">Ask for restock</span>}
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#1e3b30] shadow-lg transition group-hover:bg-[#e8c98a]"><ArrowUpRight size={17}/></span>
      </Link>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Link href={`/mumandkids/products/${product.id}`}><h3 className="line-clamp-2 min-h-[2.8rem] font-serif text-lg leading-snug text-[#1e3b30] transition group-hover:text-[#a46e35] md:text-xl">{product.name}</h3></Link>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div><p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9a927f]">Price to confirm</p><p className="mt-0.5 text-lg font-black text-[#1e3b30]">₦{price.toLocaleString("en-NG")}</p></div>
          {sizeValue && <div className="text-right"><p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9a927f]">{sizeLabel}</p><p className="mt-1 rounded-full bg-[#f4f0e7] px-2.5 py-1 text-[10px] font-bold text-[#53645b]">{sizeValue}</p></div>}
        </div>
        <div className="mt-4"><ReserveButton product={product}/></div>
      </div>
    </article>
  );
}
