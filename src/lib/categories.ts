import type { Category } from "@/types/post";

/** 동적 라우트 등에서 slug가 카테고리인지 검사 */
export function isCategorySlug(slug: string): slug is Category {
  return slug === "daily" || slug === "it" || slug === "support";
}

/** 카테고리 라벨·이모지(slug는 DB category 값과 동일) */
export const CATEGORY_LABELS: Record<
  Category,
  { ko: string; emoji: string; slug: Category }
> = {
  daily: { ko: "일상노하우", emoji: "🌱", slug: "daily" },
  it: { ko: "IT", emoji: "💡", slug: "it" },
  support: { ko: "국가지원사업", emoji: "🎁", slug: "support" },
};

/** 이모지 + 한글 (예: "🌱 일상노하우") */
export function getCategoryLabel(category: Category): string {
  const row = CATEGORY_LABELS[category];
  return `${row.emoji} ${row.ko}`;
}

/** 한글만 (예: "일상노하우") */
export function getCategoryKo(category: Category): string {
  return CATEGORY_LABELS[category].ko;
}
