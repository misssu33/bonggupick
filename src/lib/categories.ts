import { mapCategory } from "@/lib/mappers";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Category, DbCategory } from "@/types/database";

const TABLE = "categories";

function mapRows(data: unknown): Category[] {
  if (!Array.isArray(data)) return [];
  const out: Category[] = [];
  for (const row of data) {
    const c = mapCategory(row as DbCategory);
    if (c) out.push(c);
  }
  return out.sort((a, b) => a.sortOrder - b.sortOrder);
}

/** 전체 카테고리 (sort_order 오름차순) */
export async function getCategories(): Promise<Category[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("sort_order", { ascending: true, nullsFirst: false });

    if (error) throw error;
    return mapRows(data);
  } catch (e) {
    if (isSupabaseConfigured()) {
      console.error("[getCategories]", e);
    }
    return [];
  }
}

/** slug로 단일 카테고리 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return mapCategory(data as DbCategory);
  } catch (e) {
    if (isSupabaseConfigured()) {
      console.error("[getCategoryBySlug]", e);
    }
    return null;
  }
}
