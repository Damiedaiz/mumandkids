"use client";

import React from "react";

// Default categories as a fallback, but the parent should ideally pass dynamic ones
const defaultCategories = ["All", "Girls", "Boys", "School", "Featured"];

export default function CategoryFilter({ 
  activeCategory, 
  setActiveCategory,
  categories = defaultCategories
}: { 
  activeCategory: string; 
  setActiveCategory: (category: string) => void;
  categories?: string[];
}) {
  return (
    <div className="flex flex-wrap gap-3 py-6 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
            activeCategory === category
              ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
