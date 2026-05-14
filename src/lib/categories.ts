import type { Category } from "@/types/post";

/** 동적 라우트 등에서 slug가 카테고리인지 검사 */
export function isCategorySlug(slug: string): slug is Category {
  return slug === "daily" || slug === "it" || slug === "support";
}

/** 카테고리 라벨·이모지·한 줄 설명(slug는 DB category 값과 동일) */
export const CATEGORY_LABELS: Record<
  Category,
  { ko: string; emoji: string; slug: Category; description: string }
> = {
  daily: {
    ko: "일상노하우",
    emoji: "🌱",
    slug: "daily",
    description: "20~30대의 생활 노하우와 팁",
  },
  it: {
    ko: "IT",
    emoji: "💡",
    slug: "it",
    description: "최신 IT 트렌드와 AI 활용법",
  },
  support: {
    ko: "국가지원사업",
    emoji: "🎁",
    slug: "support",
    description: "놓치면 손해 보는 정부지원 정보",
  },
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

/** SEO·페이지 부제용 한 줄 설명 */
export function getCategoryDescription(category: Category): string {
  return CATEGORY_LABELS[category].description;
}
