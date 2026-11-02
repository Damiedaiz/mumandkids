import { createClient } from "@supabase/supabase-js";

// Public anon credentials only. Never place service-role keys in browser code.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uicosmcxqztkxlldsiwq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWIiLCJyZWYiOiJ1aWNvc21jeHF6dGt4bGxkc2l3cSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc1ODA4NDYyLCJleHAiOjIwOTEzODQ0NjJ9.cN-PyzG9BiIZigvErK-qb1wmJyuVfKlYqWglFiyh_7Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
