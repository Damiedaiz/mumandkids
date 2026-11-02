// 1. EXACT SUPABASE SCHEMA TYPES
export type MakoCategory = "Girls" | "Boys" | "School" | "Featured" | "Unisex";
export type MakoGender = "Boy" | "Girl" | "Unisex";

export interface MakoProduct {
  id: string; // Assuming UUID in Supabase, or stringified slug for now
  name: string;
  description: string;
  price: number; // CRITICAL: Added for the WA³S Cart
  image_url: string;
  category: MakoCategory;
  gender: MakoGender; // CRITICAL: Added for AI Assistant
  age_range: string; // CRITICAL: Added for AI Assistant (e.g., "0-2", "3-5")
  in_stock: boolean;
  created_at?: string;
}

// 2. SUPABASE SEED DATA
// Use this data to populate your 'makoproducts' table in the Supabase Dashboard
export const seedProducts: MakoProduct[] = [
  {
    id: "girls-fashion-set",
    name: "Premium Girls Fashion Set",
    description: "A stylish outfit perfect for birthdays, outings, and family events. Secure it before it sells out.",
    price: 18500,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782229980676-0hpnzzh44y4u.jpeg",
    category: "Girls",
    gender: "Girl",
    age_range: "3-5",
    in_stock: true,
  },
  {
    id: "kids-premium-outfit",
    name: "Kids Premium Outfit (Top Seller)",
    description: "Comfortable, durable and stylish. One of the most requested outfits in the T3MC collection.",
    price: 22000,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230045933-xfg2eb2vfuo.jpeg",
    category: "Featured",
    gender: "Unisex",
    age_range: "6-9",
    in_stock: true,
  },
  {
    id: "boys-casual-wear",
    name: "Active Boys Casual Wear",
    description: "Designed for comfort, movement and style. Great for weekends and special outings.",
    price: 15000,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230095840-gh5nctj3v1.jpeg",
    category: "Boys",
    gender: "Boy",
    age_range: "3-5",
    in_stock: true,
  },
  {
    id: "kids-stylish-collection",
    name: "Kids Stylish Collection",
    description: "A premium fashion-forward collection curated for parents looking for standout outfits.",
    price: 25000,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230126664-36qw38m4tvi.jpeg",
    category: "Featured",
    gender: "Unisex",
    age_range: "6-9",
    in_stock: true,
  },
  {
    id: "girls-party-dress",
    name: "Elegant Girls Party Dress",
    description: "A beautiful party dress designed to make every little girl shine on her special day.",
    price: 28000,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230157910-80tn5pvgrvx.jpeg",
    category: "Girls",
    gender: "Girl",
    age_range: "6-9",
    in_stock: true, // Switched to true so it shows up in your grid
  },
  {
    id: "back-to-school-special",
    name: "Back To School Special Bundle",
    description: "Affordable and durable outfits suitable for back-to-school preparation.",
    price: 12500,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230429514-ru1guyv9jvp.jpeg",
    category: "School",
    gender: "Unisex",
    age_range: "10-12",
    in_stock: true,
  },
  {
    id: "kids-weekend-style",
    name: "Boys Weekend Style Set",
    description: "Weekend-ready style for active children. Designed for comfort and confidence.",
    price: 16500,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230588707-6yis0f17s9i.jpeg",
    category: "Boys",
    gender: "Boy",
    age_range: "0-2",
    in_stock: true,
  },
  {
    id: "mum-approved-choice",
    name: "T3MC Mum Approved Choice",
    description: "Selected by our 88+ community mums who prioritize quality, comfort and value.",
    price: 19500,
    image_url: "https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782230698838-6i39wun144p.jpeg",
    category: "Featured",
    gender: "Unisex",
    age_range: "3-5",
    in_stock: true,
  }
];
