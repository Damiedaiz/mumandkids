"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ReserveButton from "@/components/mumandkids/ReserveButton";
import Link from "next/link";
import { Home } from "lucide-react";

export default function AIShoppingAssistant() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [criteria, setCriteria] = useState({
    gender: "",
    age: "",
    budget: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('makoproducts').select('*').eq('in_stock', true);
      if (!error && data) setLiveProducts(data);
      setIsLoadingData(false);
    };
    fetchProducts();
  }, []);

  const updateCriteria = (field: string, value: string) => {
    setCriteria((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 3) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(4);
      }, 1500);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  if (isLoadingData) {
    return <div className="min-h-screen bg-[#05070b] text-white flex items-center justify-center">Loading inventory...</div>;
  }

  return (
    <div className="min-h-screen bg-[#05070b] text-white flex flex-col items-center pt-20 px-4 pb-32 relative">
      
      {/* HOME BUTTON ADDED HERE */}
      <Link href="/mumandkids" className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
        <Home size={18} />
        <span className="font-medium text-sm">Store Home</span>
      </Link>

      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative mt-4">
        
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Shopping Assistant</h1>
          <p className="text-slate-400 text-sm">Let the system find the perfect outfit for you.</p>
        </div>

        {/* Step 1: Gender (Added Adults) */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-medium text-center">Are we shopping for Kids or Adults?</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Boy", "Girl", "Unisex", "Adults"].map((option) => (
                <button
                  key={option}
                  onClick={() => updateCriteria("gender", option)}
                  className={`py-4 rounded-xl border-2 transition-all ${
                    criteria.gender === option
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-slate-700 hover:border-slate-500 text-slate-300"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!criteria.gender}
              className="w-full mt-6 bg-blue-600 disabled:bg-slate-700 text-white py-4 rounded-xl font-bold transition-colors"
            >
              Next Step
            </button>
          </div>
        )}

        {/* Step 2: Age (Added Adult Option) */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-medium text-center">What is the age range?</h2>
            <select
              value={criteria.age}
              onChange={(e) => updateCriteria("age", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 appearance-none"
            >
              <option value="" disabled>Select age range...</option>
              <option value="0-2">0-2 years (Toddler)</option>
              <option value="3-5">3-5 years (Pre-school)</option>
              <option value="6-9">6-9 years (Kids)</option>
              <option value="10-12">10-12 years (Pre-teen)</option>
              <option value="Adult">Adult (18+)</option>
            </select>
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="w-1/3 border border-slate-700 text-slate-300 py-4 rounded-xl hover:bg-slate-800">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!criteria.age}
                className="w-2/3 bg-blue-600 disabled:bg-slate-700 text-white py-4 rounded-xl font-bold"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-medium text-center">What is your maximum budget? (₦)</h2>
            <input
              type="number"
              placeholder="e.g., 15000"
              value={criteria.budget}
              onChange={(e) => updateCriteria("budget", e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(2)} className="w-1/3 border border-slate-700 text-slate-300 py-4 rounded-xl hover:bg-slate-800">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!criteria.budget || isAnalyzing}
                className="w-2/3 bg-blue-600 disabled:bg-slate-700 text-white py-4 rounded-xl font-bold flex justify-center items-center"
              >
                {isAnalyzing ? "Analyzing Inventory..." : "Find Matches"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-medium text-center mb-6">
              Best matches for {criteria.gender} under ₦{Number(criteria.budget).toLocaleString()}
            </h2>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {liveProducts
                .filter(
                  (p) =>
                    (p.gender === criteria.gender || p.gender === "Unisex" || (criteria.gender === "Adults" && p.category === "Adults")) &&
                    p.price <= Number(criteria.budget)
                )
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-4">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-slate-700 flex items-center justify-center">👗</div>
                      )}
                      <div>
                        <h3 className="font-bold text-white text-sm line-clamp-1">{product.name}</h3>
                        <p className="text-blue-400 font-medium">₦{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <ReserveButton product={product} />
                  </div>
                ))}

              {liveProducts.filter((p) => (p.gender === criteria.gender || p.gender === "Unisex" || (criteria.gender === "Adults" && p.category === "Adults")) && p.price <= Number(criteria.budget)).length === 0 && (
                <div className="text-center p-6 text-slate-400 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="mb-4">No exact matches found for this budget right now.</p>
                  <button onClick={() => setStep(3)} className="text-blue-500 font-bold mt-4">Adjust budget</button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setStep(1);
                setCriteria({ gender: "", age: "", budget: "" });
              }}
              className="w-full mt-6 border border-slate-700 text-slate-300 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}