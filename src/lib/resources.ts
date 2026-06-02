import { getCategories } from "@/lib/categories";
import { buildCategoryMap, mapResourceRow } from "@/lib/mappers";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Category, DbResource, Resource } from "@/types/database";

const TABLE = "resources";
const PUBLISHED = "published";

const RESOURCE_SELECT = `
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

function mapResources(
  data: unknown,
  categoryMap: Map<string, Category>,
): Resource[] {
  if (!Array.isArray(data)) return [];
  const out: Resource[] = [];
  for (const row of data) {
    const r = mapResourceRow(row as DbResource, categoryMap);
    if (r) out.push(r);
  }
  return out.sort((a, b) => a.sortOrder - b.sortOrder);
}

function logResourceError(tag: string, e: unknown) {
  if (isSupabaseConfigured()) {
    console.error(tag, e);
  }
}

/** 발행된 리소스 전체 */
export async function getPublishedResources(
  resourceType?: string,
  limit?: number,
): Promise<Resource[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const categories = await getCategories();
    const categoryMap = buildCategoryMap(categories);

    let query = supabase
      .from(TABLE)
      .select(RESOURCE_SELECT)
      .eq("status", PUBLISHED)
      .order("sort_order", { ascending: true, nullsFirst: false });

    if (resourceType) {
      query = query.eq("resource_type", resourceType);
    }
    if (limit != null) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return mapResources(data, categoryMap);
  } catch (e) {
    logResourceError("[getPublishedResources]", e);
    return [];
  }
}

/** 홈 무료 템플릿 */
export async function getTemplateResources(limit = 4): Promise<Resource[]> {
  return getPublishedResources("template", limit);
}

/** slug로 단일 리소스 */
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const categories = await getCategories();
    const categoryMap = buildCategoryMap(categories);

    const { data, error } = await supabase
      .from(TABLE)
      .select(RESOURCE_SELECT)
      .eq("status", PUBLISHED)
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return mapResourceRow(data as DbResource, categoryMap);
  } catch (e) {
    logResourceError("[getResourceBySlug]", e);
    return null;
  }
}
