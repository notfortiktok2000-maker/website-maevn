import { createClient } from '@supabase/supabase-js';

// Initialisation de Supabase avec vos identifiants
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://axkcwfdivoyfhvyafron.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_RfWm9k6sWCf37N1q5osmzA_SsxGchmD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
