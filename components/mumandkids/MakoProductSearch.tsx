"use client";
import { useMemo, useState } from "react";
import MakoProductCard from "./MakoProductCard";

export default function MakoProductSearch({ products, dynamicCategories }: { products: any[]; dynamicCategories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = useMemo(() => selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory), [products, selectedCategory]);
  return (
    <div className="w-full">
      <div className="mb-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {dynamicCategories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category} className={"shrink-0 rounded-full border px-5 py-2.5 text-xs font-bold transition " + (selectedCategory === category ? "border-[#1e3b30] bg-[#1e3b30] text-white shadow-md" : "border-[#1e3b30]/15 bg-[#f7f5ef] text-[#53645b] hover:border-[#b47c3b] hover:text-[#1e3b30]")}>
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
        {filteredProducts.map((product) => <MakoProductCard key={product.id} product={product}/>)}
        {filteredProducts.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-[#1e3b30]/20 bg-[#f7f5ef] px-6 py-16 text-center"><p className="font-serif text-2xl text-[#1e3b30]">Nothing in this edit just yet.</p><p className="mt-2 text-sm text-[#747970]">Try another category to discover more pieces.</p></div>}
      </div>
    </div>
  );
}
