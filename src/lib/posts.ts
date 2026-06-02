import { getCategories } from "@/lib/categories";
import { buildCategoryMap, mapPostRow, sortFeaturedFirst } from "@/lib/mappers";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Category, DbPost, Post } from "@/types/database";

const TABLE = "posts";
const PUBLISHED = "published";

const POST_SELECT = `
  *,
  categories (
    id,
    slug,
    name,
    description,
    emoji,
    sort_order
  )
`;

function mapPosts(
  data: unknown,
  categoryMap: Map<string, Category>,
): Post[] {
  if (!Array.isArray(data)) return [];
  const out: Post[] = [];
  for (const row of data) {
    const p = mapPostRow(row as DbPost, categoryMap);
    if (p && p.status === PUBLISHED) {
      out.push(p);
    }
  }
  return sortFeaturedFirst(out);
}

async function loadCategoryMap(): Promise<Map<string, Category>> {
  const categories = await getCategories();
  return buildCategoryMap(categories);
}

function logPostError(tag: string, e: unknown) {
  if (isSupabaseConfigured()) {
    console.error(tag, e);
  }
}

/** published_at 기준 YYYY.MM.DD */
export function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/** 발행 글 전체 */
export async function getAllPosts(): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const categoryMap = await loadCategoryMap();
    const { data, error } = await supabase
      .from(TABLE)
      .select(POST_SELECT)
      .eq("status", PUBLISHED)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) throw error;
    return mapPosts(data, categoryMap);
  } catch (e) {
    logPostError("[getAllPosts]", e);
    return [];
  }
}

/** 피처드 글 (메인 상단) */
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const categoryMap = await loadCategoryMap();
    const { data, error } = await supabase
      .from(TABLE)
      .select(POST_SELECT)
      .eq("status", PUBLISHED)
      .eq("is_featured", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) throw error;
    return mapPosts(data, categoryMap);
  } catch (e) {
    logPostError("[getFeaturedPosts]", e);
    return [];
  }
}

/** 최신 글 — 피처드 우선 정렬 */
export async function getLatestPosts(limit = 6): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const categoryMap = await loadCategoryMap();
    const { data, error } = await supabase
      .from(TABLE)
      .select(POST_SELECT)
      .eq("status", PUBLISHED)
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit);

    if (error) throw error;
    return mapPosts(data, categoryMap);
  } catch (e) {
    logPostError("[getLatestPosts]", e);
    return [];
  }
}

/** 카테고리 slug별 글 */
export async function getPostsByCategorySlug(
  categorySlug: string,
  limit?: number,
): Promise<Post[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const categories = await getCategories();
    const category = categories.find((c) => c.slug === categorySlug);
    if (!category) return [];

    const categoryMap = buildCategoryMap(categories);
    let query = supabase
      .from(TABLE)
      .select(POST_SELECT)
      .eq("status", PUBLISHED)
      .eq("category_id", category.id)
      .order("is_featured", { ascending: false })
      .order("published_at", { ascending: false, nullsFirst: false });

    if (limit != null) query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw error;

    let posts = mapPosts(data, categoryMap);

    if (posts.length === 0) {
      let legacyQuery = supabase
        .from(TABLE)
        .select(POST_SELECT)
        .eq("status", PUBLISHED)
        .eq("category", categorySlug)
        .order("is_featured", { ascending: false })
        .order("published_at", { ascending: false, nullsFirst: false });

      if (limit != null) legacyQuery = legacyQuery.limit(limit);

      const { data: legacy, error: legacyErr } = await legacyQuery;
      if (legacyErr) throw legacyErr;
      posts = mapPosts(legacy, categoryMap);
    }

    return posts;
  } catch (e) {
    logPostError("[getPostsByCategorySlug]", e);
    return [];
  }
}

/** slug로 단일 글 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const categoryMap = await loadCategoryMap();
    const { data, error } = await supabase
      .from(TABLE)
      .select(POST_SELECT)
      .eq("status", PUBLISHED)
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    const post = mapPostRow(data as DbPost, categoryMap);
    return post?.status === PUBLISHED ? post : null;
  } catch (e) {
    logPostError("[getPostBySlug]", e);
    return null;
  }
}

/** SSG·sitemap용 slug 목록 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug).filter(Boolean);
}

/** 같은 카테고리 관련 글 (현재 글 제외) */
export async function getRelatedPosts(
  post: Post,
  limit = 3,
): Promise<Post[]> {
  const posts = await getPostsByCategorySlug(post.category.slug, limit + 1);
  return posts.filter((p) => p.id !== post.id).slice(0, limit);
}
