import { supabase } from "../../lib/supabase";
import MakoProductSearch from "./MakoProductSearch";

export const revalidate = 0;

export default async function MakoProductGrid() {
  const { data: products, error } = await supabase
    .from('makoproducts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !products) {
    return <div className="text-red-500 text-center py-10">Inventory sync error.</div>;
  }

  if (products.length === 0) {
    return <div className="text-slate-400 text-center py-20 text-lg">New arrivals dropping soon!</div>;
  }

  const uniqueCategories = [
    "All", 
    ...Array.from(new Set(products.map((p: any) => p.category).filter(Boolean)))
  ];

  return (
    <MakoProductSearch 
      products={products}
      dynamicCategories={uniqueCategories}
    />
  );
}
