"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminMako() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("products"); // 'products' or 'blogs'

  // --- PRODUCT STATE ---
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    name: "", description: "", price: "", image_url: "", category: "Featured", gender: "Unisex", age_range: "3-5", shoe_size: ""
  };
  const [formData, setFormData] = useState(initialForm);

  // --- BLOG STATE ---
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogMessage, setBlogMessage] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const initialBlogForm = {
    title: "", slug: "", excerpt: "", content: "", image_url: "", target_audience: "Mums & Kids"
  };
  const [blogFormData, setBlogFormData] = useState(initialBlogForm);

  // Fetch data on load
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchBlogs();
    }
  }, [isAuthenticated]);

  // --- PRODUCT FUNCTIONS ---
  const fetchProducts = async () => {
    const { data } = await supabase.from("makoproducts").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingId) {
      const { error } = await supabase.from("makoproducts").update({
        ...formData, price: parseFloat(formData.price)
      }).eq('id', editingId);
      if (error) setMessage("Update Error: " + error.message);
      else { setMessage("Product updated!"); setFormData(initialForm); setEditingId(null); fetchProducts(); }
    } else {
      const { error } = await supabase.from("makoproducts").insert([{
        ...formData, price: parseFloat(formData.price), in_stock: true
      }]);
      if (error) setMessage("Insert Error: " + error.message);
      else { setMessage("Product added!"); setFormData(initialForm); fetchProducts(); }
    }
    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    await supabase.from("makoproducts").delete().eq("id", id);
    fetchProducts();
  };

  // --- BLOG FUNCTIONS ---
  const fetchBlogs = async () => {
    const { data } = await supabase.from("makoblogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogLoading(true);
    
    if (editingBlogId) {
      const { error } = await supabase.from("makoblogs").update(blogFormData).eq('id', editingBlogId);
      if (error) setBlogMessage("Update Error: " + error.message);
      else { setBlogMessage("Article updated!"); setBlogFormData(initialBlogForm); setEditingBlogId(null); fetchBlogs(); }
    } else {
      const { error } = await supabase.from("makoblogs").insert([blogFormData]);
      if (error) setBlogMessage("Insert Error: " + error.message);
      else { setBlogMessage("Article published!"); setBlogFormData(initialBlogForm); fetchBlogs(); }
    }
    setBlogLoading(false);
    setTimeout(() => setBlogMessage(""), 3000);
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Delete this article?")) return;
    await supabase.from("makoblogs").delete().eq("id", id);
    fetchBlogs();
  };

  // --- AUTO-GENERATE SLUG ---
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setBlogFormData({ ...blogFormData, title, slug });
  };


  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-sm text-center shadow-2xl">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🔐</div>
          <h1 className="text-xl font-bold text-white mb-2">T3MC Master Portal</h1>
          <p className="text-slate-400 text-sm mb-6">Enter access code to manage platform</p>
          <input 
            type="password" 
            placeholder="Enter Password" 
            className="w-full p-4 rounded-xl bg-slate-800 text-white mb-4 focus:border-blue-500 focus:outline-none border border-slate-700 text-center tracking-widest"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && password === "7391") setIsAuthenticated(true); }}
          />
          <button 
            onClick={() => { if (password === "7391") setIsAuthenticated(true); else alert("Wrong password!"); }}
            className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-4 rounded-xl font-bold text-white shadow-lg"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070b] text-white p-6 md:p-10 pb-32">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & TABS */}
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-6 flex items-center gap-3">
            Platform Command Center
          </h1>
          <div className="flex gap-4 border-b border-slate-800 pb-px">
            <button 
              onClick={() => setActiveTab("products")}
              className={`pb-4 px-4 font-bold transition-colors ${activeTab === "products" ? "text-blue-400 border-b-2 border-blue-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              📦 Inventory Manager
            </button>
            <button 
              onClick={() => setActiveTab("blogs")}
              className={`pb-4 px-4 font-bold transition-colors ${activeTab === "blogs" ? "text-green-400 border-b-2 border-green-400" : "text-slate-500 hover:text-slate-300"}`}
            >
              🧠 AI Content Engine (SMAMD)
            </button>
          </div>
        </div>

        {/* ======================================= */}
        {/* TAB 1: PRODUCT INVENTORY MANAGER        */}
        {/* ======================================= */}
        {activeTab === "products" && (
          <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in slide-in-from-bottom-4">
            {/* LEFT: Product Form */}
            <div className="w-full lg:w-1/3">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 sticky top-10 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-blue-400">{editingId ? "Edit Product" : "Add New Product"}</h2>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <input placeholder="Product Name" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} required />
                  <input placeholder="Price (₦)" type="number" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, price: e.target.value})} value={formData.price} required />
                  <input placeholder="Image URL" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, image_url: e.target.value})} value={formData.image_url} required />
                  <textarea placeholder="Description" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, category: e.target.value})} value={formData.category}>
                      <option>Featured</option><option>Girls</option><option>Boys</option><option>School</option><option>Adults</option>
                    </select>
                    <select className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, gender: e.target.value})} value={formData.gender}>
                      <option>Unisex</option><option>Boy</option><option>Girl</option><option>Adult</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <select className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, age_range: e.target.value})} value={formData.age_range}>
                      <option value="0-2">0-2 years</option><option value="3-5">3-5 years</option><option value="6-9">6-9 years</option><option value="10-12">10-12 years</option><option value="Adult">Adult (18+)</option>
                    </select>
                    <input placeholder="Shoe Size (e.g. 27)" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setFormData({...formData, shoe_size: e.target.value})} value={formData.shoe_size} />
                  </div>

                  <button disabled={loading} className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition">
                    {loading ? "Processing..." : editingId ? "Update Product" : "Save Product"}
                  </button>
                  {editingId && <button type="button" onClick={() => {setFormData(initialForm); setEditingId(null);}} className="w-full bg-slate-700 py-4 rounded-xl font-bold mt-2">Cancel Edit</button>}
                </form>
                {message && <p className="mt-4 text-center font-bold text-green-400">{message}</p>}
              </div>
            </div>

            {/* RIGHT: Product Table */}
            <div className="w-full lg:w-2/3">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-xl">
                <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
                  Live Inventory <span className="text-sm font-normal bg-slate-800 px-3 py-1 rounded-full">{products.length} Items</span>
                </h2>
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-sm">
                      <th className="pb-3">Product Name</th><th className="pb-3">Price</th><th className="pb-3">Category</th><th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="py-4 flex items-center gap-3"><img src={p.image_url || ''} className="w-10 h-10 rounded object-cover" alt="" /><span className="line-clamp-1">{p.name}</span></td>
                        <td className="py-4 text-blue-400">₦{p.price.toLocaleString()}</td>
                        <td className="py-4"><span className="text-xs bg-slate-800 px-2 py-1 rounded">{p.category}</span></td>
                        <td className="py-4 text-right">
                          <button onClick={() => {setFormData({name: p.name, description: p.description||"", price: p.price.toString(), image_url: p.image_url||"", category: p.category, gender: p.gender, age_range: p.age_range||"3-5", shoe_size: p.shoe_size||""}); setEditingId(p.id); window.scrollTo(0,0);}} className="text-blue-400 mr-4">Edit</button>
                          <button onClick={() => deleteProduct(p.id)} className="text-red-400">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* TAB 2: AI CONTENT ENGINE (BLOGS)        */}
        {/* ======================================= */}
        {activeTab === "blogs" && (
          <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in slide-in-from-bottom-4">
            {/* LEFT: Blog Form */}
            <div className="w-full lg:w-5/12">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 sticky top-10 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-green-400 flex items-center gap-2">
                  {editingBlogId ? "Edit Schematic Article" : "Write Schematic Article"}
                </h2>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">Article Title</label>
                    <input placeholder="e.g. How to Beat Inflation in 2026" className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={handleTitleChange} value={blogFormData.title} required />
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">URL Slug (Auto-generated)</label>
                    <input placeholder="how-to-beat-inflation" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-500 font-mono text-sm" onChange={(e) => setBlogFormData({...blogFormData, slug: e.target.value})} value={blogFormData.slug} required />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">Cover Image URL</label>
                    <input placeholder="https://..." className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setBlogFormData({...blogFormData, image_url: e.target.value})} value={blogFormData.image_url} required />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">Excerpt (For Landing Page & LLM Preview)</label>
                    <textarea placeholder="A short 2-sentence summary of the value here..." rows={2} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})} value={blogFormData.excerpt} required />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 block">Target Audience Context</label>
                    <select className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white" onChange={(e) => setBlogFormData({...blogFormData, target_audience: e.target.value})} value={blogFormData.target_audience}>
                      <option>Mums & Kids</option>
                      <option>Adult Fashion</option>
                      <option>Kids Exclusives</option>
                      <option>Financial Advice</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 flex justify-between">
                      <span>Full Content (Schematic Data)</span>
                      <span className="text-blue-400 font-normal lowercase">supports markdown</span>
                    </label>
                    <textarea placeholder="Write your full article here. Use ## for headings, bullet points, etc. This feeds the LLMs." rows={8} className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white custom-scrollbar font-mono text-sm" onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})} value={blogFormData.content} required />
                  </div>

                  <button disabled={blogLoading} className="w-full bg-green-600 py-4 rounded-xl font-bold hover:bg-green-500 transition shadow-lg shadow-green-900/20">
                    {blogLoading ? "Syncing..." : editingBlogId ? "Update Article" : "Publish to Engine"}
                  </button>
                  {editingBlogId && <button type="button" onClick={() => {setBlogFormData(initialBlogForm); setEditingBlogId(null);}} className="w-full bg-slate-700 py-4 rounded-xl font-bold mt-2">Cancel Edit</button>}
                </form>
                {blogMessage && <p className="mt-4 text-center font-bold text-green-400">{blogMessage}</p>}
              </div>
            </div>

            {/* RIGHT: Blog Table */}
            <div className="w-full lg:w-7/12">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-xl">
                <h2 className="text-xl font-bold mb-6 flex justify-between items-center">
                  Published Articles <span className="text-sm font-normal bg-slate-800 px-3 py-1 rounded-full">{blogs.length} Active</span>
                </h2>
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-sm">
                      <th className="pb-3">Title & Target</th>
                      <th className="pb-3">Date Published</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.length === 0 ? (
                      <tr><td colSpan={3} className="py-10 text-center text-slate-500">No articles in the engine yet. Write your first schematic blog!</td></tr>
                    ) : (
                      blogs.map((b) => (
                        <tr key={b.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="py-4 pr-4">
                            <div className="font-bold text-white line-clamp-1">{b.title}</div>
                            <div className="text-xs text-slate-500 mt-1">{b.target_audience}</div>
                          </td>
                          <td className="py-4 text-sm text-slate-400">
                            {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4 text-right shrink-0">
                            <button onClick={() => {setBlogFormData({title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content, image_url: b.image_url, target_audience: b.target_audience}); setEditingBlogId(b.id); window.scrollTo(0,0);}} className="text-green-400 mr-4 font-medium">Edit</button>
                            <button onClick={() => deleteBlog(b.id)} className="text-red-400 font-medium">Drop</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
