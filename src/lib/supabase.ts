import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(url: string): string {
  let u = url.trim();
  u = u.replace(/\/rest\/v1\/?$/i, "");
  u = u.replace(/\/$/, "");
  return u;
}

/** Vercel·로컬 환경 변수 존재 여부 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return Boolean(url && key);
}

let client: SupabaseClient | null = null;

/**
 * Supabase 클라이언트 (미설정 시 null — 빌드·프리뷰에서 throw 하지 않음)
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (client) return client;

  const supabaseUrl = normalizeSupabaseUrl(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
  );
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim();
  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

export default getSupabase;
