import type {
  Category,
  DbCategory,
  DbPost,
  DbResource,
  Post,
  Resource,
} from "@/types/database";

const FALLBACK_EMOJI = "📄";

function pickJoinedCategory(
  joined: DbCategory | DbCategory[] | null | undefined,
): DbCategory | null {
  if (!joined) return null;
  if (Array.isArray(joined)) return joined[0] ?? null;
  return joined;
}

/** 조인·레거시 slug로 Category 정규화 */
export function mapCategory(
  row: DbCategory | null,
  legacySlug?: string | null,
): Category | null {
  if (row?.slug) {
    return {
      id: String(row.id ?? row.slug),
      slug: row.slug,
      name: row.name,
      description: row.description ?? "",
      emoji: row.emoji ?? FALLBACK_EMOJI,
      sortOrder: row.sort_order ?? 0,
    };
  }
  if (legacySlug && typeof legacySlug === "string" && legacySlug.trim()) {
    const slug = legacySlug.trim();
    return {
      id: slug,
      slug,
      name: slug,
      description: "",
      emoji: FALLBACK_EMOJI,
      sortOrder: 999,
    };
  }
  return null;
}

function resolvePostStatus(row: DbPost): string {
  if (typeof row.status === "string" && row.status.trim()) {
    return row.status.trim();
  }
  const legacy = (row as { is_published?: boolean }).is_published;
  return legacy ? "published" : "draft";
}

export function mapPostRow(row: DbPost, categoryMap?: Map<string, Category>): Post | null {
  const joined = pickJoinedCategory(row.categories);
  let category = mapCategory(joined, row.category);

  if (!category && row.category_id && categoryMap) {
    category = categoryMap.get(String(row.category_id)) ?? null;
  }

  if (!category) return null;

  const id = Number(row.id);
  if (!Number.isFinite(id)) return null;

  const status = resolvePostStatus(row);

  return {
    id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? "",
    category,
    tags: parseTags(row.tags),
    thumbnail_url: row.thumbnail_url || null,
    reading_time: Number(row.reading_time) || 0,
    view_count: Number(row.view_count) || 0,
    status,
    is_featured: Boolean(row.is_featured),
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export function mapResourceRow(
  row: DbResource,
  categoryMap?: Map<string, Category>,
): Resource | null {
  const joined = pickJoinedCategory(row.categories);
  const category =
    mapCategory(joined) ??
    (row.category_id && categoryMap
      ? categoryMap.get(String(row.category_id)) ?? null
      : null);

  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    content: row.content,
    resource_type: row.resource_type,
    external_url: row.external_url,
    tag: row.tag ?? "리소스",
    sortOrder: row.sort_order ?? 0,
    category,
  };
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

export function buildCategoryMap(categories: Category[]): Map<string, Category> {
  return new Map(categories.map((c) => [c.id, c]));
}

export function sortFeaturedFirst<T extends { is_featured: boolean; published_at: string | null }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => {
    if (a.is_featured !== b.is_featured) {
      return a.is_featured ? -1 : 1;
    }
    const ta = a.published_at ? new Date(a.published_at).getTime() : 0;
    const tb = b.published_at ? new Date(b.published_at).getTime() : 0;
    return tb - ta;
  });
}
