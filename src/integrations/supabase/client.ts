import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Default values for development
const DEFAULT_SUPABASE_URL = "https://vqjncrijsuynmwvlstox.supabase.co";
const DEFAULT_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

// Use environment variables if available, otherwise fall back to defaults
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

// Log what is being used
console.info("[Supabase] URL:", SUPABASE_URL.startsWith("https://") ? SUPABASE_URL : "(fallback)");
console.info("[Supabase] Using env key?", Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY));

// Warn if falling back to hardcoded credentials
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    '[Supabase] ⚠️ Using fallback hardcoded credentials – ensure environment variables are set in production.'
  );
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    },
  }
);
