import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return String(v).trim();
}

/** REST 경로가 붙어 있어도 프로젝트 URL만 사용하도록 정규화 */
function normalizeSupabaseUrl(url: string): string {
  let u = url.trim();
  u = u.replace(/\/rest\/v1\/?$/i, "");
  u = u.replace(/\/$/, "");
  return u;
}

const supabaseUrl = normalizeSupabaseUrl(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
);
const supabaseAnonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
