import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Doesn't crash the app — the UI shows a friendly setup message instead
  // (see the "missing config" banner in App.tsx).
  console.warn(
    "Supabase is not configured yet. Copy .env.example to .env and fill in your project URL and anon key."
  );
}

export const supabase = createClient(url ?? "https://placeholder.supabase.co", anonKey ?? "placeholder");

export const isSupabaseConfigured = Boolean(url && anonKey);
