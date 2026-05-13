import supabase from "@/lib/supabase";
import type { Category, Post } from "@/types/post";

const TABLE = "posts";

function isCategory(v: unknown): v is Category {
  return v === "daily" || v === "it" || v === "support";
}

function parseTags(raw: unknown): string[] | null {
  if (raw == null) return null;
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const p = JSON.parse(raw) as unknown;
      return Array.isArray(p) ? p.map(String) : null;
    } catch {
      return null;
    }
  }
  return null;
}

/** DB 한 행을 Post로 변환 (유효하지 않으면 null) */
function mapRow(row: Record<string, unknown>): Post | null {
  const category = row.category;
  if (!isCategory(category)) return null;

  const id = Number(row.id);
  if (!Number.isFinite(id)) return null;

  const slug = typeof row.slug === "string" ? row.slug : "";
  const title = typeof row.title === "string" ? row.title : "";
  const content = typeof row.content === "string" ? row.content : "";

  return {
    id,
    slug,
    title,
    excerpt: row.excerpt == null ? null : String(row.excerpt),
    content,
    category,
    tags: parseTags(row.tags),
    thumbnail_url:
      row.thumbnail_url == null || row.thumbnail_url === ""
        ? null
        : String(row.thumbnail_url),
    reading_time: Number(row.reading_time) || 0,
    view_count: Number(row.view_count) || 0,
    is_published: Boolean(row.is_published),
    is_featured: Boolean(row.is_featured),
    published_at:
      row.published_at == null ? null : String(row.published_at),
    created_at: String(row.created_at ?? ""),
    updated_at: String(row.updated_at ?? ""),
  };
}

function mapRows(data: unknown): Post[] {
  if (!Array.isArray(data)) return [];
  const out: Post[] = [];
  for (const row of data) {
    if (row && typeof row === "object") {
      const p = mapRow(row as Record<string, unknown>);
      if (p) out.push(p);
    }
  }
  return out;
}

/** published_at 기준 YYYY.MM.DD (없으면 빈 문자열) */
export function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/** 발행된 글만, published_at 내림차순 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) throw error;
    return mapRows(data);
  } catch (e) {
    console.error("[getAllPosts]", e);
    return [];
  }
}

/** 픽(피처드) 1개 — 발행·피처드, published_at 최신 */
export async function getFeaturedPost(): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .not("published_at", "is", null)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (!data || typeof data !== "object") return null;
    return mapRow(data as Record<string, unknown>);
  } catch (e) {
    console.error("[getFeaturedPost]", e);
    return null;
  }
}

/** 최신 글 limit개 */
export async function getLatestPosts(limit: number = 6): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) throw error;
    return mapRows(data);
  } catch (e) {
    console.error("[getLatestPosts]", e);
    return [];
  }
}

/** 카테고리별 발행 글 전체 */
export async function getPostsByCategory(
  category: Category,
): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_published", true)
      .eq("category", category)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) throw error;
    return mapRows(data);
  } catch (e) {
    console.error("[getPostsByCategory]", e);
    return [];
  }
}

/** slug로 단일 글 (발행된 것만) */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("is_published", true)
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data || typeof data !== "object") return null;
    return mapRow(data as Record<string, unknown>);
  } catch (e) {
    console.error("[getPostBySlug]", e);
    return null;
  }
}
