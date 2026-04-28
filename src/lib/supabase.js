import { createClient } from '@supabase/supabase-js';

// NOT: Bu değerleri Supabase panelinden almanız gerekecek.
// Şimdilik boş bırakıyorum, siz eklediğinizde gerçek zamanlı yarış başlayacak!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
