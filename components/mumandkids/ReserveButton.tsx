"use client";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function ReserveButton({ product }: { product: any }) {
  const reserveItem = useCartStore((state) => state.reserveItem);
  const [isReserved, setIsReserved] = useState(false);
  const handleReserve = () => {
    reserveItem(product);
    if (typeof window !== "undefined" && window.fbq) window.fbq("track", "AddToCart", { content_name: product.name, content_ids: [product.id], content_type: "product", value: product.price, currency: "NGN" });
    setIsReserved(true);
    window.setTimeout(() => setIsReserved(false), 1800);
  };
  return <button onClick={handleReserve} disabled={isReserved} className={"flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-black transition " + (isReserved ? "bg-[#e8efe9] text-[#1e3b30]" : "bg-[#1e3b30] text-white hover:bg-[#315a49]")}>
    {isReserved ? <><Check size={15}/> Added to your reserve list</> : <><ShoppingBag size={15}/> Add to reserve list</>}
  </button>;
}
