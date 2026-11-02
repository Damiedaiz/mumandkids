import { createClient } from "@supabase/supabase-js";

// Public anon credentials only. Never place service-role keys in browser code.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://uicosmcxqztkxlldsiwq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpY29zbWN4cXp0a3hsbGRzaXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDg0NjIsImV4cCI6MjA5MTM4NDQ2Mn0.cN-PyzG9BiIZigvErK-qb1wmJyuVfKlYqWglFiyh_7Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
