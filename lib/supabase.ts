import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uicosmcxqztkxlldsiwq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpY29zbWN4cXp0a3hsbGRzaXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDg0NjIsImV4cCI6MjA5MTM4NDQ2Mn0.cN-PyzG9BiIZigvErK-qb1wmJyuVfKlYqWglFiyh_7Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
