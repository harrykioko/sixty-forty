
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Default values for development
const DEFAULT_SUPABASE_URL = "https://vqjncrijsuynmwvlstox.supabase.co";
const DEFAULT_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxam5jcmlqc3V5bm13dmxzdG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMjY4MTgsImV4cCI6MjA2MDYwMjgxOH0.KejbtTCmTaE8hf2tAfI7allTbzCqG8x4KNGPCrngH1A";

// Use environment variables if available, otherwise fall back to defaults
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY;

// Log warning if using default values
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Warning: Using default Supabase credentials. For production, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
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
